import { ArrowRight, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { CRAFTDOCS_APP_URL, INKY } from "@/lib/craftdocs";
import { CtaLink, SectionHeading } from "./shared";

const CHAT = [
  {
    role: "inky" as const,
    text: "Hi! I'm Inky. What should we create today?",
  },
  {
    role: "user" as const,
    text: "GST invoice for Curewell Clinics — brand design sprint, ₹12,000",
  },
  {
    role: "inky" as const,
    text: "Got it. I'll use Indian GST Professional, add HSN 998311, and split CGST/SGST. Ready to create & share on WhatsApp?",
  },
] as const;

export function InkySection() {
  return (
    <section id="inky" className="relative overflow-hidden border-t border-border/60 py-16 sm:py-24">
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-teal-500/15 blur-3xl motion-safe:animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Meet Inky AI"
          title={
            <>
              Chat with <span className="gradient-text">Inky</span> — invoices without the form grind
            </>
          }
          description={INKY.description}
        />

        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="relative mx-auto flex w-full max-w-[11rem] flex-col items-center sm:max-w-[14rem] lg:mx-0 lg:max-w-[17rem]">
            {/* Soft stage / spotlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[70%] w-[120%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--primary)_28%,transparent)_0%,transparent_68%)] blur-xl motion-safe:animate-pulse-glow"
            />
            <div className="relative flex w-full flex-col items-center">
              <img
                src="/inky/inky-turntable.gif"
                alt="Inky, CraftDocs AI companion"
                className="motion-safe:animate-float relative z-10 h-auto w-[7.5rem] select-none object-contain sm:w-[10.5rem] lg:w-[13.5rem]"
                // style={{
                //   filter:
                //     "drop-shadow(0 18px 28px color-mix(in oklab, var(--primary) 35%, transparent)) drop-shadow(0 4px 10px rgba(0,0,0,0.35))",
                // }}
                draggable={false}
              />
              {/* Grounded pedestal ellipse */}
              <div
                aria-hidden
                className="pointer-events-none -mt-2 h-3 w-[72%] rounded-[100%] bg-gradient-to-b from-primary/25 to-transparent blur-[6px] sm:-mt-3 sm:h-4 lg:-mt-4"
              />
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-card/90 px-2.5 py-1 text-[10px] font-bold tracking-wide text-foreground shadow-sm backdrop-blur sm:mt-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs">
              <Sparkles className="h-3 w-3 text-primary sm:h-3.5 sm:w-3.5" />
              {INKY.tagline}
            </div>
            <p className="mt-2 max-w-[16rem] text-center text-[11px] leading-relaxed text-muted-foreground sm:mt-3 sm:text-xs">
              {INKY.accessNote}
            </p>
          </div>

          <div className="space-y-6">
            <div className="premium-card overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
              <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-4 py-3">
                <img
                  src="/inky/inky-avatar.png"
                  alt=""
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-primary/30"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">Inky</span>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      AI
                    </span>
                  </div>
                  <div className="text-[11px] text-muted-foreground">CraftDocs invoice assistant</div>
                </div>
                <MessageCircle className="h-4 w-4 text-primary" />
              </div>

              <div className="space-y-3 bg-background/40 p-4 sm:p-5">
                {CHAT.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    style={{ animationDelay: `${120 + i * 140}ms` }}
                  >
                    <div
                      className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed sm:max-w-[85%] ${
                        m.role === "user"
                          ? "rounded-br-md bg-gradient-primary text-white shadow-md"
                          : "rounded-bl-md border border-border bg-card text-foreground shadow-sm"
                      }`}
                    >
                      {m.role === "inky" ? (
                        <span className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                          <img src="/inky/inky-avatar.png" alt="" className="h-3.5 w-3.5 rounded-full" />
                          Inky
                        </span>
                      ) : null}
                      {m.text}
                    </div>
                  </div>
                ))}

                <div className="flex flex-wrap gap-2 pt-1">
                  {["Create invoice", "Add GST", "Share on WhatsApp"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-border bg-muted/50 px-3 py-1 text-[11px] font-semibold text-muted-foreground"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {INKY.steps.map((step, i) => (
                <div key={step.title} className="rounded-2xl border border-border/80 bg-muted/20 p-4">
                  <div className="text-[10px] font-black tracking-[0.18em] text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>

            <ul className="grid gap-2 sm:grid-cols-2">
              {INKY.capabilities.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <CtaLink href={CRAFTDOCS_APP_URL} className="premium-card shimmer-edge px-7 py-3 text-base">
              Try Inky on CraftDocs <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
