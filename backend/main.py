"""
Perfume Darbar API (FastAPI).

The storefront does not need this to run: it reads the fake catalog in lib/products.ts.
This service is for work that needs the Supabase service-role key or server-side logic:
order creation (prices are recomputed here, never trusted from the browser), and later
payment webhooks and the admin panel.

Run locally:
    cd backend
    python -m venv venv && source venv/bin/activate
    pip install -r requirements.txt
    cp .env.example .env      # fill in the Supabase URL and service-role key
    uvicorn main:app --reload --port 8000
Then run the storefront with API_URL=http://localhost:8000 so /api/* is proxied here.
"""
import os

from dotenv import load_dotenv

load_dotenv()  # must run before anything reads os.environ (the original never loaded backend/.env)

from fastapi import FastAPI  # noqa: E402
from fastapi.middleware.cors import CORSMiddleware  # noqa: E402

from routers import orders, products  # noqa: E402

app = FastAPI(title="Perfume Darbar API", version="0.2.0")

origins = [o.strip() for o in os.environ.get("CORS_ORIGINS", "http://localhost:3000,https://perfumedarbar.com,https://www.perfumedarbar.com").split(",") if o.strip()]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["GET", "POST"], allow_headers=["Content-Type"])

app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])


@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "perfumedarbar-api"}
