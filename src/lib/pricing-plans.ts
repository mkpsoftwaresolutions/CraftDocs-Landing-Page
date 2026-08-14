import type { BillingRegion } from "@/lib/craftdocs";

export type PlanPrice = {
  monthly: number;
  yearly: number;
  symbol: string;
  locale: string;
  currency: string;
};

export type PlanConfig = {
  id: string;
  name: string;
  blurb: string;
  popular?: boolean;
  features: string[];
  prices: Record<BillingRegion, PlanPrice>;
};

export type PricingPlansConfig = {
  plans: PlanConfig[];
  yearlyNote?: string;
};

export const REGION_PRICE_META: Record<BillingRegion, Omit<PlanPrice, "monthly" | "yearly">> = {
  IN: { symbol: "₹", locale: "en-IN", currency: "INR" },
  US: { symbol: "$", locale: "en-US", currency: "USD" },
};
