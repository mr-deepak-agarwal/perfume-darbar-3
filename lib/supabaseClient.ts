import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public (anon) client. Safe in the browser and on the server: Row Level Security only lets it read
// active products. The service-role key must never be used here; it lives only in backend/.env.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null = url && anon ? createClient(url, anon, { auth: { persistSession: false } }) : null;
export const isSupabaseConfigured = () => supabase !== null;
