from typing import Literal

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field

from supabase_client import get_supabase

router = APIRouter()

# Keep in sync with lib/offers.ts
FREE_SHIP = 3999
SHIP_FEE = 149
PREPAID_OFF = 50
COD_MAX = 10000


class OrderItem(BaseModel):
    slug: str = Field(min_length=1, max_length=120)
    variant: Literal["o6", "o12", "p30", "p50", "p100"]  # size/format; the price comes from the database, never the browser
    quantity: int = Field(ge=1, le=20)


class Address(BaseModel):
    first_name: str = Field(min_length=1, max_length=80)
    last_name: str = Field(min_length=1, max_length=80)
    line1: str = Field(min_length=3, max_length=200)
    city: str = Field(min_length=1, max_length=80)
    state: str = Field(min_length=1, max_length=80)
    pin: str = Field(pattern=r"^\d{6}$")
    country: str = "India"


class OrderCreate(BaseModel):
    customer_email: EmailStr
    customer_name: str = Field(min_length=1, max_length=120)
    phone: str = Field(pattern=r"^[+0-9 ()-]{10,15}$")
    shipping_address: Address
    payment_method: Literal["upi", "card", "cod"]
    items: list[OrderItem] = Field(min_length=1, max_length=50)


def price_order(order: OrderCreate, catalog: dict[str, dict]) -> dict:
    """Recompute every amount from catalog prices using the same rules as the storefront."""
    subtotal = 0
    lines = []
    for it in order.items:
        p = catalog.get(it.slug)
        if not p:
            raise HTTPException(status_code=422, detail=f"Unknown or unavailable product: {it.slug}")
        v = next((x for x in (p.get("variants") or []) if x.get("id") == it.variant), None)
        if not v:
            raise HTTPException(status_code=422, detail=f"{p['name']} is not sold in size {it.variant}")
        subtotal += v["price"] * it.quantity
        lines.append({"product": p, "variant": v, "quantity": it.quantity})
    shipping = 0 if subtotal >= FREE_SHIP else SHIP_FEE
    if order.payment_method == "cod" and subtotal + shipping > COD_MAX:
        raise HTTPException(status_code=422, detail=f"Cash on delivery is available up to Rs {COD_MAX} only")
    prepaid = 0 if order.payment_method == "cod" else PREPAID_OFF
    total = subtotal - prepaid + shipping
    return {"lines": lines, "subtotal": subtotal, "prepaid_discount": prepaid, "shipping_fee": shipping, "total": max(total, 0)}


@router.post("", status_code=201)
def create_order(order: OrderCreate):
    sb = get_supabase()
    if not sb:
        raise HTTPException(status_code=503, detail="Supabase not configured. Orders cannot be saved yet.")

    slugs = sorted({i.slug for i in order.items})
    rows = sb.table("products").select("id,slug,name,variants").in_("slug", slugs).eq("is_active", True).execute().data
    amounts = price_order(order, {r["slug"]: r for r in rows})

    customer = sb.table("customers").upsert({"email": order.customer_email, "full_name": order.customer_name, "phone": order.phone}, on_conflict="email").execute().data[0]
    created = sb.table("orders").insert({
        "customer_id": customer["id"],
        "payment_method": order.payment_method,
        "shipping_address": order.shipping_address.model_dump(),
        "subtotal": amounts["subtotal"],
        "prepaid_discount": amounts["prepaid_discount"],
        "shipping_fee": amounts["shipping_fee"],
        "total": amounts["total"],
    }).execute().data[0]
    try:
        sb.table("order_items").insert([
            {"order_id": created["id"], "product_id": l["product"]["id"], "product_name": l["product"]["name"],
             "variant_id": l["variant"]["id"], "variant_label": f'{l["variant"]["kind"]}, {l["variant"]["size"]}',
             "quantity": l["quantity"], "unit_price": l["variant"]["price"]}
            for l in amounts["lines"]
        ]).execute()
    except Exception:
        sb.table("orders").delete().eq("id", created["id"]).execute()  # don't leave an order with no items
        raise HTTPException(status_code=500, detail="Could not save order items")

    # Payment gateway (Razorpay etc.) goes here; for online methods return its session URL.
    return {"order_number": created["order_number"], "status": created["status"], **{k: amounts[k] for k in ("subtotal", "prepaid_discount", "shipping_fee", "total")}}
