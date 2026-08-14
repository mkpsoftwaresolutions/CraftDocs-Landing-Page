import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { InteractiveInvoicePreview } from "@/components/InteractiveInvoicePreview";
import { InteractiveDemoTabs } from "@/components/InteractiveDemoTabs";
import { LandingNav } from "@/components/landing/Nav";
import { LandingHero } from "@/components/landing/Hero";
import { DocTypesSection, FeaturesSection, WorkflowSection } from "@/components/landing/Features";
import { InkySection } from "@/components/landing/Inky";
import {
  ComparisonSection,
  FAQSection,
  FinalCTASection,
  LandingFooter,
  PricingSection,
  TemplatesSection,
} from "@/components/landing/Sections";
import { SectionHeading } from "@/components/landing/shared";
import { CursorSpotlight, Reveal } from "@/components/landing/Motion";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background bg-hero text-foreground transition-colors duration-300 selection:bg-primary selection:text-white">
      <CursorSpotlight />
      <div className="relative z-10">
        <LandingNav isDark={isDark} onToggleDark={() => setIsDark((v) => !v)} />
        <LandingHero />
        <Reveal>
          <DocTypesSection />
        </Reveal>

        <section id="preview" className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <SectionHeading
                eyebrow="Live sandbox"
                title={
                  <>
                    Feel the <span className="gradient-text">CraftDocs</span> invoice flow
                  </>
                }
                description="Switch presets, edit client details, and watch GST totals update — then open the full product at craftdocs.in."
              />
            </Reveal>
            <Reveal delay={120}>
              <InteractiveInvoicePreview />
            </Reveal>
          </div>
        </section>

        <Reveal>
          <InkySection />
        </Reveal>

        <Reveal>
          <FeaturesSection />
        </Reveal>

        <section id="demo" className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <SectionHeading
                eyebrow="Product walkthrough"
                title={
                  <>
                    Manage <span className="gradient-text">clients, products & status</span>
                  </>
                }
                description="Click through the same workflows you get inside CraftDocs — client directory, product catalog with HSN, invoice lifecycle, and UPI share links."
              />
            </Reveal>
            <Reveal delay={100}>
              <InteractiveDemoTabs />
            </Reveal>
          </div>
        </section>

        <Reveal>
          <WorkflowSection />
        </Reveal>
        <Reveal>
          <TemplatesSection />
        </Reveal>
        <Reveal>
          <ComparisonSection />
        </Reveal>
        <Reveal>
          <PricingSection />
        </Reveal>
        <Reveal>
          <FAQSection />
        </Reveal>
        <FinalCTASection />
        <LandingFooter />
      </div>
    </div>
  );
}
