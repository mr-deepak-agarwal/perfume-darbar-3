import os
from functools import lru_cache


@lru_cache
def get_supabase():
    """Server-side client using the service-role key. Returns None when not configured."""
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not url or not key:
        return None
    from supabase import create_client  # imported lazily so the API still boots without the package configured

    return create_client(url, key)
