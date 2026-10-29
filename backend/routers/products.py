from fastapi import APIRouter, HTTPException, Query

from supabase_client import get_supabase

router = APIRouter()
CATEGORIES = {"Women", "Men", "Unisex", "Gift Set"}


@router.get("")
def list_products(category: str | None = None, include_samples: bool = False, limit: int = Query(100, ge=1, le=200)):
    """List active products. Returns an empty list (not an error) when Supabase isn't configured yet."""
    sb = get_supabase()
    if not sb:
        return {"products": [], "note": "Supabase not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."}
    if category and category not in CATEGORIES:
        raise HTTPException(status_code=422, detail=f"category must be one of {sorted(CATEGORIES)}")
    q = sb.table("products").select("*").eq("is_active", True)
    if not include_samples:
        q = q.eq("is_sample", False)
    if category:
        q = q.eq("category", category)
    return {"products": q.order("sold", desc=True).limit(limit).execute().data}


@router.get("/{slug}")
def get_product(slug: str):
    sb = get_supabase()
    if not sb:
        raise HTTPException(status_code=503, detail="Supabase not configured")
    # .single() raises on zero rows (a 500 for a missing slug), so use a plain select and check the result
    rows = sb.table("products").select("*").eq("slug", slug).eq("is_active", True).limit(1).execute().data
    if not rows:
        raise HTTPException(status_code=404, detail="Product not found")
    return rows[0]
