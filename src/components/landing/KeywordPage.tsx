import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FaqList } from "@/components/landing/FaqList";
import { LandingNav } from "@/components/landing/Nav";
import { CursorSpotlight, Reveal } from "@/components/landing/Motion";
import { JsonLd } from "@/components/landing/JsonLd";
import { FinalCTASection, LandingFooter } from "@/components/landing/Sections";
import { CtaLink } from "@/components/landing/shared";
import { CRAFTDOCS_APP_URL } from "@/lib/craftdocs";
import { INNER_NAV_LINKS, KEYWORD_PAGES, type KeywordPageContent } from "@/lib/seo-pages";

export function KeywordPage({ page, jsonLd }: { page: KeywordPageContent; jsonLd: unknown }) {
  const [isDark, setIsDark] = useState(true);
  const related = KEYWORD_PAGES.filter((item) => item.path !== page.path);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background bg-hero text-foreground transition-colors duration-300 selection:bg-primary selection:text-white">
      <JsonLd data={jsonLd} />
      <CursorSpotlight />
      <div className="relative z-10">
        <LandingNav isDark={isDark} onToggleDark={() => setIsDark((v) => !v)} links={INNER_NAV_LINKS} logoHref="/" />

        <section className="relative overflow-hidden pb-12 pt-6 lg:pb-16 lg:pt-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="text-xs font-medium text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <a href="/" className="hover:text-foreground">
                    Home
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground">{page.name}</li>
              </ol>
            </nav>

            <p className="mt-6 inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
              {page.eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {page.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-lg">{page.lead}</p>
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <CtaLink href={CRAFTDOCS_APP_URL} className="premium-card shimmer-edge w-full px-7 py-3 text-base sm:w-auto">
                {page.ctaLabel} <ArrowRight className="h-5 w-5" />
              </CtaLink>
              <CtaLink href="/#preview" variant="secondary" className="premium-card w-full px-7 py-3 text-base sm:w-auto">
                Try live preview
              </CtaLink>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-muted-foreground">
              {page.chips.map((chip) => (
                <div key={chip} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>{chip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <article className="border-t border-border/60">
          {page.sections.map((section) => (
            <Reveal key={section.heading}>
              <section className="border-b border-border/40 py-12 sm:py-16">
                <div className="mx-auto max-w-3xl px-4 sm:px-6">
                  <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="mt-5 space-y-2 text-sm text-foreground sm:text-base">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            </Reveal>
          ))}
        </article>

        <Reveal>
          <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className="text-center text-2xl font-black tracking-tight text-foreground sm:text-4xl">How it works</h2>
              <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                {page.steps.map((step, index) => (
                  <div key={step.title} className="rounded-3xl border border-border bg-card p-6 shadow-card">
                    <div className="text-xs font-black tracking-[0.2em] text-primary">{String(index + 1).padStart(2, "0")}</div>
                    <h3 className="mt-3 text-base font-bold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        <section className="border-t border-border/60 bg-muted/20 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-black tracking-tight text-foreground sm:text-3xl">Related CraftDocs guides</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <a
                href="/"
                className="group rounded-3xl border border-border bg-card p-6 shadow-md transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-primary">Product tour</div>
                <div className="mt-2 text-lg font-bold text-foreground group-hover:text-primary">See CraftDocs in action</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Live invoice preview, Inky AI, templates, and pricing on the homepage.
                </p>
              </a>
              {related.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="group rounded-3xl border border-border bg-card p-6 shadow-md transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <div className="text-[11px] font-bold uppercase tracking-wider text-primary">{item.eyebrow}</div>
                  <div className="mt-2 text-lg font-bold text-foreground group-hover:text-primary">{item.h1}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{item.lead}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <FaqList items={page.faqs} title="Questions about this workflow" />
        <FinalCTASection
          title="Ready to create the document?"
          description="Open CraftDocs, pick the document type, and send something your client can actually pay against."
        />
        <LandingFooter />
      </div>
    </div>
  );
}
