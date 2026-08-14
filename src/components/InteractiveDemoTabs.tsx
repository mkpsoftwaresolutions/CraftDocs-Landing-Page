import { useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  ExternalLink,
  FileText,
  Filter,
  IndianRupee,
  Package,
  Plus,
  Search,
  Share2,
  Users,
} from "lucide-react";
import { CRAFTDOCS_APP_URL } from "@/lib/craftdocs";
import { CtaLink } from "@/components/landing/shared";
import { DemoCursorTour } from "@/components/landing/DemoCursorTour";
import { cn } from "@/lib/utils";

type ModuleId = "clients" | "products" | "status" | "share";

const MODULES: {
  id: ModuleId;
  label: string;
  icon: typeof Users;
  title: string;
  body: string;
  points: string[];
}[] = [
  {
    id: "clients",
    label: "Clients",
    icon: Users,
    title: "Manage every client in one directory",
    body: "Save GSTIN, billing address, email, and phone once — then pull the same client into invoices, quotations, and challans.",
    points: ["Search & filter contacts", "GSTIN + billing address", "Reuse on every document", "Multi-workspace ready"],
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
    title: "Product catalog with HSN & rates",
    body: "Store reusable line items with HSN/SAC, unit rates, and tax preferences so new invoices fill in seconds.",
    points: ["HSN / SAC codes", "Default rates & units", "Quick-add to invoices", "Service & goods items"],
  },
  {
    id: "status",
    label: "Invoice status",
    icon: FileText,
    title: "Track Draft → Sent → Paid → Overdue",
    body: "See document lifecycle at a glance, mark partial payments, convert quotes to invoices, and chase overdue bills.",
    points: ["Status filters", "Due-date overdue detection", "Quote → Invoice convert", "WhatsApp / email reminders"],
  },
  {
    id: "share",
    label: "Share & UPI",
    icon: Share2,
    title: "Share a link and collect on UPI",
    body: "Send a public page, open WhatsApp or email with the amount, and attach your UPI QR so clients can pay in one tap.",
    points: ["Public /share links", "WhatsApp deep link", "Email compose", "UPI pay URI + QR"],
  },
];

const CLIENTS = [
  { name: "Curewell Clinics", gstin: "24AALCK6034E1ZP", city: "Ahmedabad", docs: 12 },
  { name: "Horizon Agency", gstin: "27AABCU9603R1ZM", city: "Mumbai", docs: 8 },
  { name: "Pixel Studio", gstin: "29AAGFF2194N1Z8", city: "Bengaluru", docs: 5 },
];

const PRODUCTS = [
  { name: "Brand design sprint", hsn: "998311", rate: 12000, unit: "project" },
  { name: "CraftDocs Pro", hsn: "998313", rate: 599, unit: "month" },
  { name: "UI/UX retainer", hsn: "998314", rate: 45000, unit: "month" },
  { name: "Website landing page", hsn: "998314", rate: 28000, unit: "project" },
];

const DOCUMENTS = [
  { id: "INV-184", client: "Curewell Clinics", amount: 14867, status: "Paid" as const, due: "02 Aug" },
  { id: "QT-091", client: "Horizon Agency", amount: 42000, status: "Sent" as const, due: "28 Jul" },
  { id: "GST-203", client: "Pixel Studio", amount: 9600, status: "Overdue" as const, due: "10 Jul" },
  { id: "INV-179", client: "Curewell Clinics", amount: 599, status: "Draft" as const, due: "—" },
];

const STATUS_TONES: Record<(typeof DOCUMENTS)[number]["status"], string> = {
  Draft: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  Sent: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
  Paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  Overdue: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
};

const CURSOR_TOURS: Record<ModuleId, { x: number; y: number; label?: string; click?: boolean; hold?: number }[]> = {
  clients: [
    { x: 18, y: 14, hold: 700 },
    { x: 82, y: 12, label: "Add client", click: true, hold: 1200 },
    { x: 42, y: 30, label: "Search", click: true, hold: 1300 },
    { x: 36, y: 54, label: "Open contact", click: true, hold: 1500 },
    { x: 36, y: 74, hold: 1100 },
  ],
  products: [
    { x: 16, y: 14, hold: 700 },
    { x: 84, y: 12, label: "Add product", click: true, hold: 1200 },
    { x: 34, y: 40, label: "Pick HSN item", click: true, hold: 1400 },
    { x: 34, y: 62, hold: 1100 },
    { x: 86, y: 50, label: "Use rate", click: true, hold: 1300 },
  ],
  status: [
    { x: 14, y: 18, hold: 700 },
    { x: 28, y: 18, label: "Filter Sent", click: true, hold: 1200 },
    { x: 48, y: 18, label: "Paid", click: true, hold: 1100 },
    { x: 72, y: 18, label: "Overdue", click: true, hold: 1200 },
    { x: 38, y: 58, label: "Open invoice", click: true, hold: 1500 },
  ],
  share: [
    { x: 20, y: 20, hold: 700 },
    { x: 55, y: 24, label: "Copy link", click: true, hold: 1300 },
    { x: 28, y: 50, label: "WhatsApp", click: true, hold: 1200 },
    { x: 72, y: 50, label: "Email", click: true, hold: 1200 },
    { x: 42, y: 78, label: "UPI pay", click: true, hold: 1500 },
  ],
};

export function InteractiveDemoTabs() {
  const [activeId, setActiveId] = useState<ModuleId>("clients");
  const active = MODULES.find((m) => m.id === activeId) ?? MODULES[0];
  const tour = useMemo(() => CURSOR_TOURS[activeId], [activeId]);

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div
        className="grid grid-cols-2 gap-1.5 rounded-2xl border border-border/60 bg-muted/60 p-1.5 shadow-sm backdrop-blur-lg sm:grid-cols-4"
        role="tablist"
        aria-label="CraftDocs modules"
      >
        {MODULES.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeId === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(tab.id)}
              className={cn(
                "flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-2.5 py-2.5 text-[11px] font-bold transition-all duration-300 sm:gap-2 sm:px-4 sm:text-sm",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-background/80 hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-3xl border border-border bg-card/60 p-4 shadow-xl backdrop-blur-xl sm:mt-8 sm:p-8">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <div key={`copy-${activeId}`} className="panel-animate space-y-4">
            <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-3xl">{active.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{active.body}</p>
            <div className="space-y-3 pt-2">
              {active.points.map((feature, i) => (
                <div
                  key={feature}
                  className="flex items-center gap-2.5 text-sm font-medium text-foreground"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  {feature}
                </div>
              ))}
            </div>
            <CtaLink href={CRAFTDOCS_APP_URL} className="premium-card mt-4 text-xs">
              Open in CraftDocs <ExternalLink className="h-3.5 w-3.5" />
            </CtaLink>
          </div>

          <div key={`panel-${activeId}`} className="panel-animate relative min-h-[20rem] overflow-hidden sm:min-h-[22rem]">
            {activeId === "clients" ? <ClientsPanel /> : null}
            {activeId === "products" ? <ProductsPanel /> : null}
            {activeId === "status" ? <StatusPanel /> : null}
            {activeId === "share" ? <SharePanel /> : null}
            <DemoCursorTour steps={tour} active className="hidden md:block" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelShell({
  title,
  action,
  children,
}: {
  title: string;
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="premium-card overflow-hidden rounded-2xl border border-border bg-background shadow-card">
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</div>
        {action ? (
          <span className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-1 text-[11px] font-bold text-primary">
            <Plus className="h-3 w-3" /> {action}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function ClientsPanel() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => CLIENTS.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <PanelShell title="Client directory" action="Add client">
      <div className="border-b border-border p-3">
        <label className="flex items-center gap-2 rounded-xl border border-input bg-muted/30 px-3 py-2 text-xs transition focus-within:ring-2 focus-within:ring-primary/40">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clients…"
            className="w-full bg-transparent focus:outline-none"
          />
        </label>
      </div>
      <div className="divide-y divide-border">
        {filtered.map((c) => (
          <div
            key={c.name}
            className="flex items-center gap-3 px-4 py-3 transition hover:bg-muted/40"
          >
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-foreground">{c.name}</div>
              <div className="truncate text-[11px] text-muted-foreground">
                {c.city} · {c.gstin}
              </div>
            </div>
            <div className="text-right text-[11px] font-semibold text-muted-foreground">{c.docs} docs</div>
          </div>
        ))}
        {filtered.length === 0 ? (
          <div className="px-4 py-8 text-center text-xs text-muted-foreground">No clients match “{query}”</div>
        ) : null}
      </div>
    </PanelShell>
  );
}

function ProductsPanel() {
  return (
    <PanelShell title="Product catalog" action="Add product">
      <div className="divide-y divide-border">
        {PRODUCTS.map((p) => (
          <div
            key={p.name}
            className="flex items-center gap-3 px-4 py-3 transition hover:bg-muted/40"
          >
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Package className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-foreground">{p.name}</div>
              <div className="text-[11px] text-muted-foreground">
                HSN {p.hsn} · /{p.unit}
              </div>
            </div>
            <div className="font-mono text-sm font-bold text-foreground">₹{p.rate.toLocaleString("en-IN")}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-border bg-muted/30 px-4 py-3 text-[11px] text-muted-foreground">
        Tap any product inside CraftDocs to drop it onto an invoice line item with tax ready.
      </div>
    </PanelShell>
  );
}

function StatusPanel() {
  const [filter, setFilter] = useState<"All" | (typeof DOCUMENTS)[number]["status"]>("All");
  const rows = filter === "All" ? DOCUMENTS : DOCUMENTS.filter((d) => d.status === filter);

  return (
    <PanelShell title="Documents & status">
      <div className="flex flex-wrap gap-1.5 border-b border-border p-3">
        {(["All", "Draft", "Sent", "Paid", "Overdue"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={cn(
              "cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-bold transition",
              filter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="inline-flex items-center gap-1">
              {s === "All" ? <Filter className="h-3 w-3" /> : null}
              {s}
            </span>
          </button>
        ))}
      </div>
      <div className="divide-y divide-border">
        {rows.map((d) => (
          <div
            key={d.id}
            className="flex items-center gap-3 px-4 py-3 transition hover:bg-muted/40"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-foreground">{d.id}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", STATUS_TONES[d.status])}>
                  {d.status}
                </span>
              </div>
              <div className="mt-0.5 truncate text-[11px] text-muted-foreground">
                {d.client} · due {d.due}
              </div>
            </div>
            <div className="font-mono text-sm font-bold text-foreground">₹{d.amount.toLocaleString("en-IN")}</div>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

function SharePanel() {
  return (
    <PanelShell title="Share & collect">
      <div className="space-y-4 p-4">
        <div className="rounded-xl border border-border bg-muted/30 p-4 transition hover:border-primary/30">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Public link</div>
          <div className="mt-1 truncate font-mono text-xs text-foreground">craftdocs.in/share/inv-184-curewell</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border p-3 text-center transition hover:-translate-y-0.5 hover:border-emerald-500/40">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">WhatsApp</div>
            <div className="mt-1 text-sm font-bold text-emerald-600">Remind client</div>
          </div>
          <div className="rounded-xl border border-border p-3 text-center transition hover:-translate-y-0.5 hover:border-sky-500/40">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email</div>
            <div className="mt-1 text-sm font-bold text-sky-600">Send invoice</div>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-teal-500/30 bg-teal-500/5 p-4">
          <div className="grid h-16 w-16 place-items-center rounded-lg border border-dashed border-teal-500/50 bg-background font-mono text-[10px] text-teal-700 dark:text-teal-300">
            UPI QR
          </div>
          <div>
            <div className="flex items-center gap-1 text-sm font-bold text-foreground">
              <IndianRupee className="h-4 w-4 text-teal-600" /> Pay via UPI
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground">curewell@okaxis · ₹14,867 due</div>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}
