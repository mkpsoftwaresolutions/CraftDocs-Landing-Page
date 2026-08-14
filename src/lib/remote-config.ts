import {
  activate,
  fetchAndActivate,
  getRemoteConfig,
  getValue,
  onConfigUpdate,
  type RemoteConfig,
} from "firebase/remote-config";
import { getFirebaseApp } from "@/lib/firebase";
import {
  DEFAULT_PRICING_PLANS,
  parsePricingPlans,
  type PricingPlansConfig,
} from "@/lib/pricing-plans";

const PRICING_PLANS_KEY = "pricing_plans";
const PRICING_TITLE_KEY = "pricing_section_title";
const PRICING_DESCRIPTION_KEY = "pricing_section_description";

export type RemotePricingContent = {
  plans: PricingPlansConfig;
  title: string;
  description: string;
  source: "remote" | "default";
};

const DEFAULT_CONTENT: RemotePricingContent = {
  plans: DEFAULT_PRICING_PLANS,
  title: "Plans that match real CraftDocs limits",
  description: "Regional pricing with ~2 months free on yearly. Free forever to try the studio.",
  source: "default",
};

let remoteConfig: RemoteConfig | undefined;

function getRC() {
  const app = getFirebaseApp();
  if (!app) return undefined;
  if (!remoteConfig) {
    remoteConfig = getRemoteConfig(app);
    // Production: cache longer to reduce abuse / quota burn. Dev: fetch immediately.
    remoteConfig.settings.minimumFetchIntervalMillis = import.meta.env.DEV ? 0 : 3_600_000;
    remoteConfig.defaultConfig = {
      [PRICING_PLANS_KEY]: JSON.stringify(DEFAULT_PRICING_PLANS),
      [PRICING_TITLE_KEY]: DEFAULT_CONTENT.title,
      [PRICING_DESCRIPTION_KEY]: DEFAULT_CONTENT.description,
    };
  }
  return remoteConfig;
}

function sanitizeRemoteText(value: string, maxLen: number) {
  return value.replace(/[<>]/g, "").trim().slice(0, maxLen);
}

function readContent(rc: RemoteConfig): RemotePricingContent {
  const plans =
    parsePricingPlans(getValue(rc, PRICING_PLANS_KEY).asString()) ?? DEFAULT_PRICING_PLANS;
  const title =
    sanitizeRemoteText(getValue(rc, PRICING_TITLE_KEY).asString(), 120) || DEFAULT_CONTENT.title;
  const description =
    sanitizeRemoteText(getValue(rc, PRICING_DESCRIPTION_KEY).asString(), 280) ||
    DEFAULT_CONTENT.description;
  return {
    plans,
    title,
    description,
    source: getValue(rc, PRICING_PLANS_KEY).getSource() === "remote" ? "remote" : "default",
  };
}

/** Fetch + activate Remote Config and return pricing content (falls back to defaults). */
export async function loadRemotePricing(): Promise<RemotePricingContent> {
  const rc = getRC();
  if (!rc) return DEFAULT_CONTENT;
  try {
    await fetchAndActivate(rc);
    return readContent(rc);
  } catch (error) {
    console.warn("[remote-config] Failed to fetch pricing; using defaults.", error);
    return DEFAULT_CONTENT;
  }
}

/** Subscribe to realtime Remote Config updates (web). Returns unsubscribe. */
export function subscribeRemotePricing(onUpdate: (content: RemotePricingContent) => void) {
  const rc = getRC();
  if (!rc) return () => undefined;

  const unsubscribe = onConfigUpdate(rc, {
    next: async () => {
      try {
        // Realtime listener already fetched; activate to apply.
        await activate(rc);
        onUpdate(readContent(rc));
      } catch (error) {
        console.warn("[remote-config] Realtime update failed.", error);
      }
    },
    error: (error) => {
      console.warn("[remote-config] Realtime listener error.", error);
    },
    complete: () => undefined,
  });

  return () => {
    unsubscribe();
  };
}
