import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public (anon) client. Safe in the browser and on the server: Row Level Security only lets it read
// active products. The service-role key must never be used here; it lives only in backend/.env.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

function make(): SupabaseClient | null {
  if (!url || !anon) return null;
  try {
    return createClient(url, anon, { auth: { persistSession: false } });
  } catch (e) {
    // A malformed URL must not take the whole site down: the built-in catalog is used instead.
    console.error("[supabase] invalid NEXT_PUBLIC_SUPABASE_URL or key, ignoring:", e instanceof Error ? e.message : e);
    return null;
  }
}
export const supabase: SupabaseClient | null = make();
export const isSupabaseConfigured = () => supabase !== null;
