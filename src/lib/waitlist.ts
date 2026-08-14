import { getSupabase } from "@/lib/supabase";

export type WaitlistResult = { ok: true; already?: boolean };

function errorMessage(data: unknown, fallback: string) {
  if (data && typeof data === "object" && "error" in data) {
    const value = (data as { error?: unknown }).error;
    if (typeof value === "string" && value.trim()) return value;
  }
  return fallback;
}

/** Join the CraftDocs waitlist. Sends from info@craftdocs.in via the shared Resend setup. */
export async function subscribeWaitlist(email: string): Promise<WaitlistResult> {
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error("Waitlist is temporarily unavailable.");
  }

  const { data, error } = await supabase.functions.invoke("waitlist-signup", {
    body: { email },
  });

  if (error) {
    throw new Error(errorMessage(data, "Something went wrong. Please try again later."));
  }

  if (data && typeof data === "object" && "error" in data) {
    throw new Error(errorMessage(data, "Something went wrong. Please try again later."));
  }

  return { ok: true, already: Boolean((data as { already?: boolean } | null)?.already) };
}
