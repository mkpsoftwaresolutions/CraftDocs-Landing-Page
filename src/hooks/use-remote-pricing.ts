import { useEffect, useState } from "react";
import { loadAdminPricingPlans } from "@/lib/admin-plans";
import {
  loadRemotePricing,
  subscribeRemotePricing,
  type RemotePricingContent,
} from "@/lib/remote-config";
import { DEFAULT_PRICING_PLANS } from "@/lib/pricing-plans";

export type PricingContent = Omit<RemotePricingContent, "source"> & {
  source: "admin" | "remote" | "default";
};

const INITIAL: PricingContent = {
  plans: DEFAULT_PRICING_PLANS,
  title: "Plans that match real CraftDocs limits",
  description: "Regional pricing with ~2 months free on yearly. Free forever to try the studio.",
  source: "default",
};

/**
 * Landing pricing: prefer CraftDocs admin `plans` (invoice-generator),
 * then Firebase Remote Config title/description / fallback plans.
 */
export function useRemotePricing() {
  const [content, setContent] = useState<PricingContent>(INITIAL);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      const [adminPlans, remote] = await Promise.all([
        loadAdminPricingPlans(),
        loadRemotePricing().catch(() => null),
      ]);

      if (!active) return;

      if (adminPlans) {
        setContent({
          plans: adminPlans,
          title: remote?.title || INITIAL.title,
          description: remote?.description || INITIAL.description,
          source: "admin",
        });
      } else if (remote) {
        setContent({
          ...remote,
          source: remote.source === "remote" ? "remote" : "default",
        });
      } else {
        setContent(INITIAL);
      }
      setLoading(false);
    }

    void load();

    const unsubscribe = subscribeRemotePricing((next) => {
      if (!active) return;
      // Keep admin prices if already loaded; only refresh copy from Remote Config.
      setContent((prev) => {
        if (prev.source === "admin") {
          return {
            ...prev,
            title: next.title,
            description: next.description,
          };
        }
        return {
          ...next,
          source: next.source === "remote" ? "remote" : "default",
        };
      });
      setLoading(false);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return { ...content, loading };
}
