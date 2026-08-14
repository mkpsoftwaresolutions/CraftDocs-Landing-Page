import type { BillingRegion } from "@/lib/craftdocs";
import { BILLING } from "@/lib/craftdocs";

export type PlanPrice = {
  monthly: number;
  yearly: number;
  symbol: string;
  locale: string;
  currency: string;
};

export type PlanConfig = {
  name: string;
  blurb: string;
  popular?: boolean;
  features: string[];
  prices: Record<BillingRegion, PlanPrice>;
};

export type PricingPlansConfig = {
  free: PlanConfig;
  pro: PlanConfig;
  business: PlanConfig;
  yearlyNote?: string;
};

export const DEFAULT_PRICING_PLANS: PricingPlansConfig = {
  free: {
    name: BILLING.free.name,
    blurb: BILLING.free.blurb,
    features: [...BILLING.free.features],
    prices: {
      IN: { monthly: 0, yearly: 0, symbol: "₹", locale: "en-IN", currency: "INR" },
      US: { monthly: 0, yearly: 0, symbol: "$", locale: "en-US", currency: "USD" },
    },
  },
  pro: {
    name: BILLING.pro.name,
    blurb: BILLING.pro.blurb,
    popular: true,
    features: [...BILLING.pro.features],
    prices: {
      IN: { monthly: 200, yearly: 2000, symbol: "₹", locale: "en-IN", currency: "INR" },
      US: { ...BILLING.pro.prices.US },
    },
  },
  business: {
    name: BILLING.business.name,
    blurb: BILLING.business.blurb,
    features: [...BILLING.business.features],
    prices: {
      IN: { ...BILLING.business.prices.IN },
      US: { ...BILLING.business.prices.US },
    },
  },
  yearlyNote: "2 months free",
};

function isPlanPrice(value: unknown): value is PlanPrice {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.monthly === "number" &&
    typeof v.yearly === "number" &&
    typeof v.symbol === "string" &&
    typeof v.locale === "string" &&
    typeof v.currency === "string"
  );
}

function isPlanConfig(value: unknown): value is PlanConfig {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.name === "string" &&
    typeof v.blurb === "string" &&
    Array.isArray(v.features) &&
    v.features.every((f) => typeof f === "string") &&
    !!v.prices &&
    typeof v.prices === "object" &&
    isPlanPrice((v.prices as Record<string, unknown>).IN) &&
    isPlanPrice((v.prices as Record<string, unknown>).US)
  );
}

export function parsePricingPlans(raw: string | undefined | null): PricingPlansConfig | null {
  if (!raw?.trim()) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const p = parsed as Record<string, unknown>;
    if (!isPlanConfig(p.free) || !isPlanConfig(p.pro) || !isPlanConfig(p.business)) return null;
    return {
      free: p.free,
      pro: { ...p.pro, popular: p.pro.popular ?? true },
      business: p.business,
      yearlyNote: typeof p.yearlyNote === "string" ? p.yearlyNote : DEFAULT_PRICING_PLANS.yearlyNote,
    };
  } catch {
    return null;
  }
}
