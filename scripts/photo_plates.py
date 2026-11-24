"""Builds clean single-bottle 4:5 'plates' from the client's three bottle photos (design-source/b30|b50|b100.jpg).
The second bottle in the 30 / 50 ml photos is covered with background and table taken from the same photo."""
import cv2, numpy as np, os
SRC = os.path.join(os.path.dirname(__file__), "..", "design-source")
OUT = os.path.join(SRC, "plates"); os.makedirs(OUT, exist_ok=True)

def feather_paste(dst, patch, x0, y0, feather_left=0, feather_right=0, feather_top=0):
    h, w = patch.shape[:2]
    a = np.ones((h, w), np.float32)
    for i in range(feather_left): a[:, i] = np.minimum(a[:, i], (i + 1) / (feather_left + 1))
    for i in range(feather_right): a[:, w - 1 - i] = np.minimum(a[:, w - 1 - i], (i + 1) / (feather_right + 1))
    for i in range(feather_top): a[i, :] = np.minimum(a[i, :], (i + 1) / (feather_top + 1))
    roi = dst[y0:y0 + h, x0:x0 + w].astype(np.float32)
    dst[y0:y0 + h, x0:x0 + w] = (roi * (1 - a[..., None]) + patch.astype(np.float32) * a[..., None]).astype(np.uint8)

def plate30():
    im = cv2.imread(f"{SRC}/b30.jpg")
    # cover the right-hand bottle (x 505-745) with the clean left-hand background strip, mirrored, with a soft seam
    strip = cv2.flip(im[:, 0:200], 1)           # 200 px wide, no bottle in it
    feather_paste(im, strip, 466, 0, feather_left=18)          # starts in the clean gap, fully covers the glass edge by x~484
    crop = im[30:830, 6:646]                    # 640 x 800 = 4:5
    cv2.imwrite(f"{OUT}/p30.png", crop)

def plate50():
    im = cv2.imread(f"{SRC}/b50.jpg")
    # cover the left-hand bottle (black cap): its right edge is ~x=590, the gold bottle's left edge ~x=630
    patch = im[:, 12:186].copy()                # background strip, left of the black bottle, no bottle in it
    feather_paste(im, patch, 448, 0, feather_left=16, feather_right=10)   # covers x 448-622, gold bottle starts ~630
    crop = im[0:950, 460:1220]                  # 760 x 950 = 4:5
    cv2.imwrite(f"{OUT}/p50.png", crop)

def plate100():
    im = cv2.imread(f"{SRC}/b100.jpg")
    crop = im[0:1024, 143:962]                  # 819 x 1024 = 4:5
    cv2.imwrite(f"{OUT}/p100.png", crop)

if __name__ == "__main__":
    plate30(); plate50(); plate100(); print("plates ok")
