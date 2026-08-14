import { DOC_TYPES, FEATURES, WORKFLOW_STEPS } from "@/lib/craftdocs";
import { SectionHeading } from "./shared";

export function DocTypesSection() {
  return (
    <section className="border-y border-border/60 bg-muted/25 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
          20 document types for real billing workflows
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {DOC_TYPES.map((d) => (
            <div
              key={d.id}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
              {d.title}
            </div>
          ))}
          <div className="rounded-full border border-dashed border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground">
            + packing slips, export & more
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-border/60 bg-muted/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why CraftDocs"
          title={
            <>
              Everything you need to <span className="gradient-text">bill professionally</span>
            </>
          }
          description="Built around Inky AI, GST, brand consistency, reusable catalogs, and the payment loop after you hit send."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="glass-card rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-xl">
              <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorkflowSection() {
  return (
    <section id="workflow" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From blank page to <span className="gradient-text">paid invoice</span>
            </>
          }
          description="A clear path freelancers and agencies already follow inside CraftDocs."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW_STEPS.map((s) => (
            <div key={s.step} className="rounded-3xl border border-border bg-card p-6 shadow-card">
              <div className="text-xs font-black tracking-[0.2em] text-primary">{s.step}</div>
              <h3 className="mt-3 text-base font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
