import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Bell, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { CursorSpotlight } from "./Motion";
import { toast } from "sonner";
import { CRAFTDOCS_LOGO, CRAFTDOCS_FAVICON, CRAFTDOCS_LOGO_PAD } from "@/lib/brand-assets";
import { subscribeWaitlist } from "@/lib/waitlist";

const HIGHLIGHTS = [
  "GST invoices with HSN",
  "20 document types",
  "Share links & UPI pay",
] as const;

export function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTick((t) => (t + 1) % 3), 2200);
    return () => window.clearInterval(id);
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next) || next.length > 254) {
      setFormError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      await subscribeWaitlist(next);
      setEmail(next);
      setStatus("done");
      toast.success("Thank you! You have been added to our waitlist.");
    } catch (error) {
      console.error("Failed to join waitlist:", error);
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again later.";
      setFormError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background bg-hero text-foreground">
      <CursorSpotlight />

      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-24 top-16 h-[22rem] w-[22rem] rounded-full bg-primary/25 blur-3xl motion-safe:animate-pulse-glow sm:h-[28rem] sm:w-[28rem]" />
        <div className="absolute -right-16 bottom-10 h-[18rem] w-[18rem] rounded-full bg-teal-500/20 blur-3xl motion-safe:animate-float-reverse sm:h-[24rem] sm:w-[24rem]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in oklab, var(--foreground) 40%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--foreground) 40%, transparent) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6 sm:px-6 sm:py-8">
        <header className="flex items-center justify-between gap-3">
          <Link to="/" className="flex min-w-0 items-center gap-2 transition hover:opacity-90">
            <img
              src={CRAFTDOCS_LOGO}
              alt="CraftDocs"
              className={`h-8 w-auto max-w-[150px] shrink-0 px-2.5 py-1.5 sm:h-9 sm:max-w-[170px] ${CRAFTDOCS_LOGO_PAD}`}
            />
          </Link>
          <Link
            to="/"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-border/70 bg-card/40 px-2.5 py-2 text-xs font-bold text-muted-foreground backdrop-blur transition hover:bg-card hover:text-foreground sm:px-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="sm:hidden">Back</span>
            <span className="hidden sm:inline">Back to landing</span>
          </Link>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center py-10 text-center sm:py-16">
          <div
            className="hero-animate-item inline-flex max-w-full items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-primary sm:text-[11px] sm:tracking-[0.14em]"
            style={{ animationDelay: "40ms" }}
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            Soft launch in progress
          </div>

          <h1
            className="hero-animate-item mt-6 max-w-3xl text-4xl font-black tracking-tight sm:mt-7 sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "120ms" }}
          >
            <span className="block text-primary">CraftDocs</span>
            <span className="mt-1 block text-[0.92em] gradient-text sm:mt-2">is almost here</span>
          </h1>

          <p
            className="hero-animate-item mt-4 max-w-xl px-1 text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg"
            style={{ animationDelay: "220ms" }}
          >
            We&apos;re polishing the GST document studio — invoices, quotations, share links, and UPI —
            so your first workspace feels finished on day one.
          </p>

          <div
            className="hero-animate-item mt-6 h-8 overflow-hidden text-sm font-semibold text-foreground/90 sm:mt-8 sm:text-base"
            style={{ animationDelay: "300ms" }}
            aria-live="polite"
          >
            <div
              className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateY(-${tick * 2}rem)` }}
            >
              {HIGHLIGHTS.map((item) => (
                <div key={item} className="flex h-8 items-center justify-center gap-2 px-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="hero-animate-item mt-8 w-full max-w-md sm:mt-10"
            style={{ animationDelay: "380ms" }}
          >
            {status === "idle" ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <label className="sr-only" htmlFor="coming-soon-email">
                  Email
                </label>
                <input
                  id="coming-soon-email"
                  type="email"
                  required
                  disabled={isSubmitting}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formError) setFormError("");
                  }}
                  placeholder="you@studio.com"
                  className="min-h-12 w-full flex-1 rounded-xl border border-border bg-card/70 px-4 text-sm text-foreground outline-none ring-offset-background backdrop-blur placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-5 text-sm font-bold text-white shadow-elegant transition hover:opacity-95 sm:w-auto disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Bell className="h-4 w-4" />
                  )}
                  {isSubmitting ? "Sending..." : "Notify me"}
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm font-semibold text-emerald-300">
                You&apos;re on the list. We&apos;ll ping you the moment CraftDocs opens.
              </div>
            )}
            {formError ? (
              <p className="mt-3 text-sm font-medium text-red-400" role="alert">
                {formError}
              </p>
            ) : (
              <p className="mt-3 text-[11px] text-muted-foreground">
                No spam — just one launch note when the app is ready.
              </p>
            )}
          </form>

          <div
            className="hero-animate-item pointer-events-none relative mt-12 w-full max-w-sm motion-safe:animate-float sm:mt-16"
            style={{ animationDelay: "480ms" }}
            aria-hidden
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/20 blur-2xl sm:-inset-6" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 p-5 text-left shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <img src={CRAFTDOCS_FAVICON} alt="" className="h-6 w-6 shrink-0 rounded-md object-contain" />
                  <span className="truncate text-xs font-bold text-slate-200">INV-2026/001</span>
                </div>
                <span className="shrink-0 rounded-full bg-teal-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-300">
                  Soon
                </span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-2 w-[66%] rounded-full bg-slate-700/80" />
                <div className="h-2 w-1/2 rounded-full bg-slate-700/50" />
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="h-8 rounded-lg bg-slate-800/90" />
                  <div className="h-8 rounded-lg bg-slate-800/70" />
                  <div className="h-8 rounded-lg bg-primary/30" />
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="pb-2 text-center text-[11px] text-muted-foreground sm:pb-4">
          © {new Date().getFullYear()} CraftDocs · Built for freelancers & growing teams
        </footer>
      </div>
    </div>
  );
}
