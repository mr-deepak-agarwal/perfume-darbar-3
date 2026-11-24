"""Makes every product photo: public/products/<slug>-<p30|p50|p100>.webp
Takes the clean plates (scripts/photo_plates.py) built from the client's three real bottle photos, tints the glass
with the scent's liquid colour, and applies the Perfume Darbar label (name, size, type) with perspective.
Run:  python3 scripts/photo_plates.py && python3 scripts/make_photos.py [slug ...]
Replace design-source/b30|b50|b100.jpg with new photos (and adjust the coordinates below) to refresh everything."""
import cv2, json, math, os, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE = os.path.dirname(__file__)
SRC = os.path.join(HERE, "..", "design-source")
OUT = os.path.join(HERE, "..", "public", "products")
os.makedirs(OUT, exist_ok=True)
DISPLAY = "/usr/share/fonts/truetype/google-fonts/Lora-Variable.ttf"   # swap for the brand serif when the font file is available
SANS = "/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
SANS_REG = "/usr/share/fonts/opentype/inter/Inter-Regular.otf"
CREAM, GOLD, INK, MUTED = (250, 246, 238), (201, 151, 58), (30, 20, 16), (107, 90, 72)

# ---- geometry, in plate pixels (plate = original photo minus crop offset) ---------------------------------------
def off(pts, dx, dy): return [(x - dx, y - dy) for x, y in pts]
SIZES = {
  "p30": dict(  # ball-cap jar. original crop offset (6, 30)
    plate="p30", size="30 ML", aspect=46 / 42,
    liquid=off([(226, 345), (426, 345), (428, 540), (420, 575), (380, 596), (272, 596), (232, 575), (224, 540)], 6, 30),
    label=off([(243, 352), (409, 352), (409, 534), (243, 534)], 6, 30), curve=0.7),
  "p50": dict(  # flat rounded-rectangle. offset (460, 0)
    plate="p50", size="50 ML", aspect=58 / 55.2,
    liquid=off([(672, 402), (988, 402), (1000, 432), (1000, 738), (986, 768), (672, 768), (660, 738), (660, 432)], 460, 0),
    label=off([(712, 470), (950, 470), (950, 700), (712, 700)], 460, 0), curve=0.0),
  "p100": dict(  # square flacon in hand. offset (143, 0). cavity corners TL TR BR BL
    plate="p100", size="100 ML", aspect=76 / 66.0,
    cavity=off([(424, 252), (826, 346), (668, 796), (335, 706)], 143, 0), v0=0.16,
    labelUV=(0.17, 0.83, 0.34, 0.80), curve=0.0),
}
def bilerp(q, u, v):
    tl, tr, br, bl = [np.array(p, np.float32) for p in q]
    top = tl + (tr - tl) * u; bot = bl + (br - bl) * u
    return top + (bot - top) * v
for k, c in SIZES.items():
    if "cavity" in c:
        q = c["cavity"]; v0 = c["v0"]
        c["liquid"] = [tuple(bilerp(q, 0, v0)), tuple(bilerp(q, 1, v0)), tuple(bilerp(q, 1, 1)), tuple(bilerp(q, 0, 1))]
        u0, u1, w0, w1 = c["labelUV"]
        c["label"] = [tuple(bilerp(q, u0, w0)), tuple(bilerp(q, u1, w0)), tuple(bilerp(q, u1, w1)), tuple(bilerp(q, u0, w1))]

# ---- label art --------------------------------------------------------------------------------------------------
def spaced(d, xy, text, font, fill, track):
    """centered text with letter-spacing"""
    cx, y = xy
    widths = [d.textlength(ch, font=font) for ch in text]
    total = sum(widths) + track * (len(text) - 1)
    x = cx - total / 2
    for ch, w in zip(text, widths):
        d.text((x, y), ch, font=font, fill=fill); x += w + track

def split_name(name):
    if len(name) <= 11 or " " not in name: return [name]
    w = name.split(" "); best, bd = 1, 1e9
    for i in range(1, len(w)):
        dd = abs(len(" ".join(w[:i])) - len(" ".join(w[i:])))
        if dd < bd: bd, best = dd, i
    return [" ".join(w[:best]), " ".join(w[best:])]

def label_img(name, size_txt, aspect, W=1000):
    H = int(W / aspect)
    im = Image.new("RGB", (W, H), CREAM); d = ImageDraw.Draw(im)
    m = int(W * 0.045); d.rectangle([m, m, W - m, H - m], outline=GOLD, width=max(3, W // 280))
    u = H / 100.0
    lines = split_name(name); two = len(lines) == 2
    d.text((W / 2, 17 * u), "PD", font=ImageFont.truetype(DISPLAY, int(13 * u)), fill=GOLD, anchor="mm")
    spaced(d, (W / 2, 27 * u), "PERFUME DARBAR", ImageFont.truetype(SANS, int(5.6 * u)), INK, 5.0 * u / 4)
    d.line([(W / 2 - 9 * u, 33 * u), (W / 2 + 9 * u, 33 * u)], fill=GOLD, width=max(2, W // 450))
    fs = int((12.5 if not two else 10.5) * u)
    f = ImageFont.truetype(DISPLAY, fs)
    while max(d.textlength(l, font=f) for l in lines) > W * 0.78 and fs > 20: fs -= 2; f = ImageFont.truetype(DISPLAY, fs)
    y0 = 50 * u if not two else 44 * u
    for i, l in enumerate(lines): d.text((W / 2, y0 + i * fs * 1.12), l, font=f, fill=INK, anchor="mm")
    spaced(d, (W / 2, 76 * u), size_txt, ImageFont.truetype(SANS, int(6.2 * u)), INK, 4.5 * u / 4)
    spaced(d, (W / 2, 84.5 * u), "EXTRAIT DE PARFUM", ImageFont.truetype(SANS_REG, int(4.4 * u)), MUTED, 3.2 * u / 4)
    return im

# ---- compositing ------------------------------------------------------------------------------------------------
def hex2rgb(h): h = h.lstrip("#"); return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], np.float32)

def tint_liquid(plate, poly, c1, c2):
    h, w = plate.shape[:2]
    m = np.zeros((h, w), np.uint8); cv2.fillPoly(m, [np.array(poly, np.int32)], 255)
    m = cv2.GaussianBlur(m, (0, 0), 2.2).astype(np.float32) / 255
    rgb = plate[..., ::-1].astype(np.float32) / 255
    g = rgb @ np.array([0.299, 0.587, 0.114], np.float32)
    inside = m > 0.9
    lo, hi = np.percentile(g[inside], [4, 96])
    L = np.clip((g - lo) / max(hi - lo, 1e-3), 0, 1)
    ys = np.arange(h, dtype=np.float32)[:, None]
    ytop, ybot = min(p[1] for p in poly), max(p[1] for p in poly)
    t = np.clip((ys - ytop) / max(ybot - ytop, 1), 0, 1)
    col = (hex2rgb(c1)[None, None, :] * (1 - t[..., None]) + hex2rgb(c2)[None, None, :] * t[..., None]) / 255
    col = np.clip(col * 1.25 + 0.04, 0, 1)                      # the palette is dark: lift it so the juice glows
    liq = col * (0.30 + 0.92 * L[..., None] ** 1.05)
    spec = np.clip((g - 0.90) / 0.10, 0, 1)[..., None]          # keep the bright reflections of the glass
    liq = liq * (1 - 0.8 * spec) + 0.8 * spec
    # thin bright meniscus at the liquid surface
    top = np.clip(1 - np.abs(ys - ytop - 3) / 3.0, 0, 1)[..., None] * (m[..., None] > 0.5) * 0.35
    liq = np.clip(liq + top, 0, 1)
    a = (m * 0.92)[..., None]
    out = rgb * (1 - a) + np.clip(liq, 0, 1) * a
    return (out[..., ::-1] * 255).astype(np.uint8)

def put_label(plate, quad, lab, curve):
    h, w = plate.shape[:2]
    LW, LH = lab.size
    arr = np.array(lab.convert("RGB"))[..., ::-1]
    if curve > 0:   # wrap round a cylinder: squeeze the label towards its sides
        xs = (np.arange(LW, dtype=np.float32) / (LW - 1) - 0.5) * 2
        src_u = np.arcsin(np.clip(xs * math.sin(curve), -1, 1)) / curve
        mapx = ((src_u / 2 + 0.5) * (LW - 1)).astype(np.float32)
        arr = cv2.remap(arr, np.tile(mapx, (LH, 1)), np.tile(np.arange(LH, dtype=np.float32)[:, None], (1, LW)), cv2.INTER_LINEAR)
        shade = (0.80 + 0.20 * np.cos(xs * curve * 0.9))[None, :, None]
        arr = (arr.astype(np.float32) * shade).clip(0, 255).astype(np.uint8)
    src = np.float32([[0, 0], [LW, 0], [LW, LH], [0, LH]]); dst = np.float32(quad)
    M = cv2.getPerspectiveTransform(src, dst)
    warped = cv2.warpPerspective(arr, M, (w, h), flags=cv2.INTER_AREA if False else cv2.INTER_LINEAR)
    mask = cv2.warpPerspective(np.full((LH, LW), 255, np.uint8), M, (w, h))
    mask_f = cv2.GaussianBlur(mask, (0, 0), 0.8).astype(np.float32)[..., None] / 255
    # soft contact shadow under the sticker + gentle gloss
    sh = cv2.GaussianBlur(mask, (0, 0), 5).astype(np.float32)[..., None] / 255
    sh = np.roll(sh, (3, 3), axis=(0, 1)) * 0.28
    base = plate.astype(np.float32) * (1 - sh)
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    gloss = np.clip(0.07 * np.sin((xx * 0.8 + yy * 0.6) / 70.0) + 0.05, 0, 0.14)[..., None]
    lab_f = warped.astype(np.float32) * 0.97 + 255 * gloss * 0.6
    out = base * (1 - mask_f) + lab_f * mask_f
    return out.clip(0, 255).astype(np.uint8)

PLATES = {}
def plate_of(key):
    if key not in PLATES: PLATES[key] = cv2.imread(f"{SRC}/plates/{SIZES[key]['plate']}.png")
    return PLATES[key]

def make(p, key, final=(900, 1125)):
    c = SIZES[key]; plate = plate_of(key).copy()
    plate = tint_liquid(plate, c["liquid"], p["c1"], p["c2"])
    lab = label_img(p["name"], c["size"], c["aspect"])
    out = put_label(plate, c["label"], lab, c["curve"])
    im = Image.fromarray(out[..., ::-1]).resize(final, Image.LANCZOS)
    return im

if __name__ == "__main__":
    prods = json.load(open(f"{SRC}/products.json"))
    only = set(sys.argv[1:])
    n = 0
    for p in prods:
        if only and p["slug"] not in only: continue
        for key in SIZES:
            make(p, key).save(f"{OUT}/{p['slug']}-{key}.webp", quality=82, method=6); n += 1
    print("wrote", n)
