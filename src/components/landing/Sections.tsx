import { ArrowUpRight, Check, CheckCircle2, X } from "lucide-react";
import {
  CRAFTDOCS_APP_URL,
  FAQS,
  TEMPLATES,
  formatPlanPrice,
  type BillingRegion,
} from "@/lib/craftdocs";
import { FaqList } from "./FaqList";
import { KEYWORD_PAGES } from "@/lib/seo-pages";
import { useState } from "react";
import { CtaLink, SectionHeading } from "./shared";
import { useAdminPricing } from "@/hooks/use-admin-pricing";
import type { PlanConfig, PricingPlansConfig } from "@/lib/pricing-plans";
import { CRAFTDOCS_LOGO, CRAFTDOCS_LOGO_PAD } from "@/lib/brand-assets";

export function TemplatesSection() {
  return (
    <section id="templates" className="border-t border-border/60 bg-muted/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Template gallery"
          title={
            <>
              Real templates from the <span className="gradient-text">CraftDocs studio</span>
            </>
          }
          description="37 design templates spanning corporate, GST, minimal, luxury, and agency looks — not mock gradient cards."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <a
              key={t.id}
              href={CRAFTDOCS_APP_URL}
              className="group overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-md transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div
                className="flex h-40 flex-col justify-between rounded-2xl p-4 text-white shadow-inner"
                style={{
                  background: `linear-gradient(135deg, ${t.primary} 0%, ${t.secondary} 100%)`,
                }}
              >
                <span className="w-fit rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur">
                  {t.tag}
                </span>
                <div>
                  <div className="text-xs opacity-80">{t.category}</div>
                  <div className="text-lg font-bold">{t.name}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-muted-foreground">
                <span>Open in CraftDocs</span>
                <ArrowUpRight className="h-4 w-4 text-primary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ComparisonSection() {
  return (
    <section className="border-t border-border/60 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why upgrade your workflow"
          title="Stop rebuilding invoices in Excel and Word"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-2 text-lg font-bold text-red-600">
              <X className="h-5 w-5" /> Spreadsheets & Word docs
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Manual GST math and broken formulas",
                "Inconsistent branding and blurry exports",
                "Retyping clients, HSN codes, and UPI every time",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-red-500">✕</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6 shadow-lg sm:p-8">
            <div className="mb-4 flex items-center gap-2 text-lg font-bold text-emerald-600">
              <Check className="h-5 w-5" /> CraftDocs
            </div>
            <ul className="space-y-3 text-sm font-medium text-foreground">
              {[
                "Inky AI builds invoices from a chat — then you share",
                "Automatic GST splits with HSN-ready line items",
                "Brand kit, WhatsApp, and UPI collection in one flow",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PricingSection({ initialPlans }: { initialPlans?: PricingPlansConfig | null }) {
  const [annual, setAnnual] = useState(true);
  const [region, setRegion] = useState<BillingRegion>("IN");
  const { plans: catalog, loading } = useAdminPricing(initialPlans);
  const cycle = annual ? "yearly" : "monthly";
  const plans = catalog?.plans ?? [];
  const yearlyNote = catalog?.yearlyNote;

  const priceLabel = (plan: PlanConfig) => {
    const p = plan.prices[region];
    if (p.monthly === 0 && p.yearly === 0) {
      return {
        amount: formatPlanPrice(0, p.locale, p.currency),
        period: "/ forever",
        note: null as string | null,
      };
    }
    const amount = cycle === "yearly" ? p.yearly : p.monthly;
    const formatted = formatPlanPrice(amount, p.locale, p.currency);
    if (cycle === "yearly") {
      const monthly = formatPlanPrice(p.monthly, p.locale, p.currency);
      const noteSuffix = yearlyNote ? ` · ${yearlyNote}` : "";
      return { amount: formatted, period: "/ year", note: `${monthly}/mo billed yearly${noteSuffix}` };
    }
    return { amount: formatted, period: "/ month", note: null as string | null };
  };

  return (
    <section id="pricing" className="border-t border-border/60 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Simple pricing"
          title={<span className="gradient-text">Plans that match real CraftDocs limits</span>}
          description="Regional pricing from the CraftDocs studio. Free forever to try the product."
        />

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-1 rounded-full bg-muted p-1.5 text-xs font-bold">
            {(["IN", "US"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegion(r)}
                className={`cursor-pointer rounded-full px-3 py-1.5 transition ${
                  region === r ? "bg-primary text-white shadow-sm" : "text-muted-foreground"
                }`}
              >
                {r === "IN" ? "India ₹" : "USA $"}
              </button>
            ))}
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-muted p-1.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`cursor-pointer rounded-full px-4 py-2 transition ${
                !annual ? "bg-primary text-white shadow-sm" : "text-muted-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`cursor-pointer rounded-full px-4 py-2 transition ${
                annual ? "bg-primary text-white shadow-sm" : "text-muted-foreground"
              }`}
            >
              Yearly{yearlyNote ? ` · ${yearlyNote}` : ""}
            </button>
          </div>
        </div>

        {loading && !plans.length ? (
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            {["a", "b", "c"].map((key) => (
              <div key={key} className="h-80 animate-pulse rounded-3xl border border-border bg-muted/40" />
            ))}
          </div>
        ) : !plans.length ? (
          <p className="text-center text-sm text-muted-foreground">
            Pricing is loading from CraftDocs. Please refresh in a moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            {plans.map((plan) => {
              const price = priceLabel(plan);
              return (
                <PlanCard
                  key={plan.id}
                  name={plan.name}
                  blurb={plan.blurb}
                  price={price.amount}
                  period={price.period}
                  note={price.note}
                  features={plan.features}
                  popular={plan.popular}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function PlanCard({
  name,
  blurb,
  price,
  period,
  note,
  features,
  popular,
}: {
  name: string;
  blurb: string;
  price: string;
  period: string;
  note?: string | null;
  features: readonly string[];
  popular?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col justify-between rounded-3xl border bg-card p-6 shadow-card sm:p-8 ${
        popular ? "border-2 border-primary shadow-2xl md:scale-[1.02]" : "border-border"
      }`}
    >
      {popular ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-4 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-md">
          Most popular
        </span>
      ) : null}
      <div>
        <div className={`text-sm font-bold uppercase tracking-wider ${popular ? "text-primary" : "text-muted-foreground"}`}>
          {name}
        </div>
        <div className="mt-4 text-4xl font-black text-foreground">
          {price}
          <span className="text-sm font-normal text-muted-foreground">{period}</span>
        </div>
        {note ? <p className="mt-1 text-[11px] text-muted-foreground">{note}</p> : null}
        <p className="mt-2 text-xs text-muted-foreground">{blurb}</p>
        <div className="mt-6 space-y-3 text-xs">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {f}
            </div>
          ))}
        </div>
      </div>
      <CtaLink href={CRAFTDOCS_APP_URL} variant={popular ? "primary" : "secondary"} className="mt-8 w-full">
        {name === "Free" ? "Start free" : `Choose ${name}`}
      </CtaLink>
    </div>
  );
}

export function FAQSection() {
  return <FaqList items={FAQS} />;
}

export function FinalCTASection({
  title = "Ready to create your next invoice?",
  description = "Open CraftDocs, chat with Inky AI, or pick a GST-ready template — then send a document your clients can pay against.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-primary py-16 text-white sm:py-24">
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
        <img src={CRAFTDOCS_LOGO} alt="CraftDocs" className={`mx-auto h-14 w-auto max-w-[220px] px-4 py-2 rounded-2xl ${CRAFTDOCS_LOGO_PAD}`} />
        <h2 className="mt-5 text-2xl font-black tracking-tight sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base opacity-90">{description}</p>
        <div className="mt-8 flex justify-center">
          <a
            href={CRAFTDOCS_APP_URL}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-base font-bold text-slate-900 shadow-2xl transition hover:bg-slate-100"
          >
            Start free on CraftDocs
          </a>
        </div>
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card py-12 text-xs text-muted-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <img src={CRAFTDOCS_LOGO} alt="CraftDocs" className={`h-7 w-auto max-w-[140px] px-2 py-1 ${CRAFTDOCS_LOGO_PAD}`} />
        </div>
        <div className="flex max-w-full flex-wrap justify-center gap-x-5 gap-y-2 font-medium">
          <a href="/#preview" className="hover:text-foreground">
            Live Preview
          </a>
          {KEYWORD_PAGES.map((page) => (
            <a key={page.path} href={page.path} className="hover:text-foreground">
              {page.navLabel}
            </a>
          ))}
          <a href="/#pricing" className="hover:text-foreground">
            Pricing
          </a>
          <a href={CRAFTDOCS_APP_URL} className="hover:text-foreground">
            Open CraftDocs
          </a>
        </div>
        <div className="text-center text-[11px] sm:text-left">
          © {new Date().getFullYear()} CraftDocs. Smart invoices. Seamless growth.
        </div>
      </div>
    </footer>
  );
}
