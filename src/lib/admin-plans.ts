import { getSupabase } from "@/lib/supabase";
import { REGION_PRICE_META, type PlanConfig, type PricingPlansConfig } from "@/lib/pricing-plans";

export type AdminPlanRow = {
  id: string;
  name: string;
  blurb: string | null;
  popular: boolean | null;
  features: unknown;
  price_inr_monthly: number | string | null;
  price_inr_yearly: number | string | null;
  price_usd_monthly: number | string | null;
  price_usd_yearly: number | string | null;
  yearly_discount_note: string | null;
  is_active: boolean | null;
  sort_order: number | null;
};

function num(value: number | string | null | undefined): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function featuresOf(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((f): f is string => typeof f === "string") : [];
}

function rowToPlan(row: AdminPlanRow): PlanConfig {
  return {
    id: row.id,
    name: row.name || row.id,
    blurb: row.blurb || "",
    popular: row.popular ?? false,
    features: featuresOf(row.features),
    prices: {
      IN: {
        ...REGION_PRICE_META.IN,
        monthly: num(row.price_inr_monthly),
        yearly: num(row.price_inr_yearly),
      },
      US: {
        ...REGION_PRICE_META.US,
        monthly: num(row.price_usd_monthly),
        yearly: num(row.price_usd_yearly),
      },
    },
  };
}

/** Map admin `plans` rows into landing cards — prices come only from Supabase. */
export function mapAdminPlansToConfig(rows: AdminPlanRow[]): PricingPlansConfig | null {
  if (!rows?.length) return null;
  const plans = rows.map(rowToPlan);
  const yearlyNote = rows.map((r) => r.yearly_discount_note?.trim()).find(Boolean);
  return yearlyNote ? { plans, yearlyNote } : { plans };
}

/** Fetch active plans from invoice-generator admin panel (Supabase). */
export async function loadAdminPricingPlans(): Promise<PricingPlansConfig | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("plans")
      .select(
        "id,name,blurb,popular,features,price_inr_monthly,price_inr_yearly,price_usd_monthly,price_usd_yearly,yearly_discount_note,is_active,sort_order",
      )
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return mapAdminPlansToConfig((data || []) as AdminPlanRow[]);
  } catch (error) {
    console.warn("[admin-plans] Failed to fetch plans from CraftDocs admin.", error);
    return null;
  }
}
