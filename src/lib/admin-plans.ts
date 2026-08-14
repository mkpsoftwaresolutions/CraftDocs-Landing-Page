import { getSupabase } from "@/lib/supabase";
import {
  DEFAULT_PRICING_PLANS,
  type PlanConfig,
  type PricingPlansConfig,
} from "@/lib/pricing-plans";

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

function rowToPlan(row: AdminPlanRow, fallback?: PlanConfig): PlanConfig {
  return {
    name: row.name || fallback?.name || row.id,
    blurb: row.blurb || fallback?.blurb || "",
    popular: row.popular ?? fallback?.popular,
    features: featuresOf(row.features).length ? featuresOf(row.features) : [...(fallback?.features || [])],
    prices: {
      IN: {
        monthly: num(row.price_inr_monthly),
        yearly: num(row.price_inr_yearly),
        symbol: "₹",
        locale: "en-IN",
        currency: "INR",
      },
      US: {
        monthly: num(row.price_usd_monthly),
        yearly: num(row.price_usd_yearly),
        symbol: "$",
        locale: "en-US",
        currency: "USD",
      },
    },
  };
}

/** Map admin `plans` rows into landing PricingPlansConfig. */
export function mapAdminPlansToConfig(rows: AdminPlanRow[]): PricingPlansConfig | null {
  if (!rows?.length) return null;
  const byId = Object.fromEntries(rows.map((r) => [r.id, r]));
  const free = byId.free ? rowToPlan(byId.free, DEFAULT_PRICING_PLANS.free) : DEFAULT_PRICING_PLANS.free;
  const pro = byId.pro
    ? { ...rowToPlan(byId.pro, DEFAULT_PRICING_PLANS.pro), popular: byId.pro.popular ?? true }
    : DEFAULT_PRICING_PLANS.pro;
  const business = byId.business
    ? rowToPlan(byId.business, DEFAULT_PRICING_PLANS.business)
    : DEFAULT_PRICING_PLANS.business;

  const yearlyNote =
    rows.find((r) => r.yearly_discount_note)?.yearly_discount_note ||
    DEFAULT_PRICING_PLANS.yearlyNote ||
    "2 months free";

  return { free, pro, business, yearlyNote };
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
