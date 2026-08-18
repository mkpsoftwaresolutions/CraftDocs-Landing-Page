import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import { CRAFTDOCS_APP_URL } from "@/lib/craftdocs";
import { CtaLink } from "./shared";
import { CRAFTDOCS_FAVICON } from "@/lib/brand-assets";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-8 lg:pb-24 lg:pt-14">
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl motion-safe:animate-pulse-glow" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <div
            className="hero-animate-item inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 px-3 py-1.5 text-xs font-bold text-foreground shadow-sm backdrop-blur"
            style={{ animationDelay: "60ms" }}
          >
            <img src="/inky/inky-avatar.png" alt="Inky AI" className="h-4 w-4 rounded-full" />
            Now with Inky AI · GST-ready studio
          </div>

          <h1
            className="hero-animate-item mt-6 text-3xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "140ms" }}
          >
            <span className="block text-primary">CraftDocs</span>
            <span className="mt-1 block">GST invoices that look finished — and get paid</span>
          </h1>

          <p
            className="hero-animate-item mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            Create GST invoices, quotations, challans, and 17 more document types — or just ask Inky AI to
            build and share them for you. HSN, brand kits, PDF export, WhatsApp, and UPI collection for
            Indian freelancers and growing businesses.
          </p>

          <div
            className="hero-animate-item mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap"
            style={{ animationDelay: "340ms" }}
          >
            <CtaLink href={CRAFTDOCS_APP_URL} className="premium-card shimmer-edge w-full px-7 py-3 text-base sm:w-auto">
              Start free on CraftDocs <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
            </CtaLink>
            <CtaLink href="#preview" variant="secondary" className="premium-card w-full px-7 py-3 text-base sm:w-auto">
              <Play className="h-4 w-4 text-primary" /> Try live preview
            </CtaLink>
          </div>

          <div
            className="hero-animate-item mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-muted-foreground"
            style={{ animationDelay: "440ms" }}
          >
            {[
              "Inky AI invoice assistant",
              "GST · HSN · CGST/SGST/IGST",
              "PDF export · share · UPI",
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-animate-item relative" style={{ animationDelay: "280ms" }}>
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-teal-500/10 blur-2xl" />
          <div className="premium-card shimmer-edge overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
              <div className="flex items-center gap-2">
                <img src={CRAFTDOCS_FAVICON} alt="CraftDocs" className="h-7 w-7 rounded-lg object-contain" />
                <div>
                  <div className="text-xs font-bold text-foreground">CraftDocs Studio</div>
                  <div className="text-[10px] text-muted-foreground">GSTIN ready · INV-2026/184</div>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Paid ready
              </span>
            </div>
            <div className="space-y-4 bg-white p-5 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Bill to</div>
                  <div className="mt-1 text-sm font-bold">Curewell Clinics</div>
                  <div className="text-xs text-slate-500">Ahmedabad, Gujarat</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-teal-600">Tax Invoice</div>
                  <div className="mt-1 text-xs text-slate-500">Due 02-08-2026</div>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="grid grid-cols-[1fr_auto_auto] gap-2 bg-slate-50 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:bg-slate-900">
                  <span>Item</span>
                  <span>HSN</span>
                  <span>Amount</span>
                </div>
                <div className="grid grid-cols-[1fr_auto_auto] gap-2 border-t border-slate-100 px-3 py-2.5 text-xs dark:border-slate-800">
                  <span className="font-medium">Brand design sprint</span>
                  <span className="text-slate-500">998311</span>
                  <span className="font-mono font-semibold">₹12,000</span>
                </div>
                <div className="grid grid-cols-[1fr_auto_auto] gap-2 border-t border-slate-100 px-3 py-2.5 text-xs dark:border-slate-800">
                  <span className="font-medium">CraftDocs Pro</span>
                  <span className="text-slate-500">998313</span>
                  <span className="font-mono font-semibold">₹599</span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="flex gap-2">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    Draft → Sent → Paid
                  </span>
                  <span className="rounded-full bg-teal-50 px-2 py-1 text-[10px] font-bold text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                    UPI ready
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Total due</div>
                  <div className="text-xl font-black text-primary">₹14,867</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
