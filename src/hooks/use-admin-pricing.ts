import { useEffect, useState } from "react";
import { loadAdminPricingPlans } from "@/lib/admin-plans";
import type { PricingPlansConfig } from "@/lib/pricing-plans";

export type AdminPricingContent = {
  plans: PricingPlansConfig | null;
  loading: boolean;
};

/**
 * Live pricing from the invoice-generator `plans` table (Supabase).
 * No hardcoded amounts and no Firebase Remote Config.
 */
export function useAdminPricing(initialPlans?: PricingPlansConfig | null): AdminPricingContent {
  const [plans, setPlans] = useState<PricingPlansConfig | null>(initialPlans ?? null);
  const [loading, setLoading] = useState(!initialPlans);

  useEffect(() => {
    let active = true;

    async function load() {
      const next = await loadAdminPricingPlans();
      if (!active) return;
      setPlans(next);
      setLoading(false);
    }

    void load();
    return () => {
      active = false;
    };
  }, []);

  return { plans, loading };
}
