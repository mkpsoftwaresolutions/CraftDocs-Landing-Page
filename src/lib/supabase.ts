import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Public CraftDocs project — anon key is safe in the browser (RLS: active plans only). */
const FALLBACK_SUPABASE_URL = "https://itjmwmwbuhhaiiplfdmu.supabase.co";
const FALLBACK_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0am13bXdidWhoYWlpcGxmZG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NTc0MDIsImV4cCI6MjA5ODEzMzQwMn0.F5lIshmmL9KaRjxjsPGL_P9XPdbqxhHFa2oaCjvF214";

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim() || FALLBACK_SUPABASE_URL;
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() ||
  FALLBACK_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

/** Shared CraftDocs Supabase client (invoice-generator admin plans). */
export function getSupabase(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
