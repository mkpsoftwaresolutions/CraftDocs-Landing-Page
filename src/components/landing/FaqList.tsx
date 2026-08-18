import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/landing/shared";
import type { SeoFaq } from "@/lib/seo";

export function FaqList({
  items,
  eyebrow = "FAQ",
  title = "Questions teams ask before switching",
}: {
  items: readonly SeoFaq[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section id="faq" className="border-t border-border/60 bg-muted/20 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <Accordion type="single" collapsible className="space-y-4">
          {items.map((faq, i) => (
            <AccordionItem key={faq.q} value={`faq-${i}`} className="glass-card rounded-2xl border border-border px-6 py-2">
              <AccordionTrigger className="text-left text-sm font-bold text-foreground hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
