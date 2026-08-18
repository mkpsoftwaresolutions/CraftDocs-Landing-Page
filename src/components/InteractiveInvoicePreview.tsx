import { useState, type ChangeEvent } from "react";
import { Plus, Trash2, Palette, ExternalLink } from "lucide-react";
import { CRAFTDOCS_APP_URL } from "@/lib/craftdocs";
import { CtaLink } from "@/components/landing/shared";
import { CRAFTDOCS_FAVICON } from "@/lib/brand-assets";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

const PRESETS = [
  {
    id: "executive",
    name: "Modern Executive",
    primaryColor: "#1E3A8A",
    bgHeader: "bg-[#1E3A8A]",
    textHeader: "text-white",
    badge: "Corporate",
  },
  {
    id: "gst",
    name: "GST Professional",
    primaryColor: "#0F766E",
    bgHeader: "bg-teal-700",
    textHeader: "text-white",
    badge: "GST",
  },
  {
    id: "minimal",
    name: "Swiss Minimal",
    primaryColor: "#111827",
    bgHeader: "bg-slate-100 dark:bg-slate-800",
    textHeader: "text-slate-900 dark:text-white",
    badge: "Clean",
  },
  {
    id: "luxury",
    name: "Black & Gold",
    primaryColor: "#D4AF37",
    bgHeader: "bg-gradient-to-r from-stone-900 to-amber-900",
    textHeader: "text-amber-300",
    badge: "Premium",
  },
] as const;

const CURRENCIES: Record<string, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export function InteractiveInvoicePreview() {
  const [selectedPreset, setSelectedPreset] = useState<(typeof PRESETS)[number]>(PRESETS[1]);
  const [clientName, setClientName] = useState("Curewell Clinics");
  const [invoiceNumber, setInvoiceNumber] = useState("GST-2026-184");
  const [currency, setCurrency] = useState("INR");
  const [taxRate, setTaxRate] = useState(18);
  const [docType, setDocType] = useState<"GST Invoice" | "Quotation" | "Tax Invoice">("GST Invoice");
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "Brand design sprint", quantity: 1, rate: 12000 },
    { id: "2", description: "CraftDocs Pro (monthly)", quantity: 1, rate: 599 },
  ]);

  const currSymbol = CURRENCIES[currency] ?? "₹";
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const grandTotal = subtotal + taxAmount;

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        description: "New line item",
        quantity: 1,
        rate: 1000,
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => (prev.length <= 1 ? prev : prev.filter((it) => it.id !== id)));
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, raw: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (field === "description") return { ...item, description: raw };
        const num = Number.parseFloat(raw);
        return { ...item, [field]: Number.isFinite(num) ? num : 0 };
      }),
    );
  };

  return (
    <div className="relative mx-auto w-full max-w-5xl rounded-3xl border border-border bg-card/80 p-4 shadow-2xl backdrop-blur-xl sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col items-stretch justify-between gap-4 border-b border-border/80 pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">Interactive live preview</h3>
          </div>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Tweak presets, GST rate, and line items — then open the full studio on CraftDocs.
          </p>
        </div>
        <CtaLink href={CRAFTDOCS_APP_URL} className="w-full gap-1.5 text-xs sm:w-auto">
          Open full editor <ExternalLink className="h-3.5 w-3.5" />
        </CtaLink>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 flex items-center gap-1 text-xs font-semibold text-muted-foreground">
          <Palette className="h-3.5 w-3.5" /> Presets:
        </span>
        {PRESETS.map((p) => (
          <button
            type="button"
            key={p.id}
            onClick={() => setSelectedPreset(p)}
            className={`flex cursor-pointer items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              selectedPreset.id === p.id
                ? "scale-105 bg-primary text-primary-foreground shadow-md ring-2 ring-primary/40"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <span className="h-3 w-3 rounded-full border border-white/20" style={{ backgroundColor: p.primaryColor }} />
            {p.name}
            <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[9px] uppercase tracking-wider">{p.badge}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4 rounded-2xl border border-border/60 bg-muted/40 p-4 lg:col-span-5"
        >
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Quick controls</span>
            <div className="flex gap-1">
              {(["GST Invoice", "Quotation", "Tax Invoice"] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setDocType(t)}
                  className={`cursor-pointer rounded-lg px-2 py-1 text-[11px] font-semibold transition ${
                    docType === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-muted-foreground" htmlFor="client-name">
              Client name
            </label>
            <input
              id="client-name"
              type="text"
              value={clientName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setClientName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground" htmlFor="invoice-number">
                Invoice #
              </label>
              <input
                id="invoice-number"
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground" htmlFor="currency">
                Currency
              </label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {Object.keys(CURRENCIES).map((c) => (
                  <option key={c} value={c}>
                    {c} ({CURRENCIES[c]})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
              <span>GST / Tax rate</span>
              <span className="font-bold text-primary">{taxRate}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={28}
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
              className="mt-2 w-full cursor-pointer accent-primary"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-muted-foreground">Items ({items.length})</span>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex cursor-pointer items-center gap-1 text-[11px] font-bold text-primary hover:underline"
              >
                <Plus className="h-3 w-3" /> Add item
              </button>
            </div>
            <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-2 rounded-xl border border-border bg-background p-2 text-xs">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                    className="flex-1 bg-transparent font-medium focus:outline-none"
                  />
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => handleItemChange(item.id, "rate", e.target.value)}
                    className="w-16 rounded bg-muted/60 px-1.5 py-0.5 text-right font-mono focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    className="cursor-pointer text-muted-foreground hover:text-red-500"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>

        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-white text-slate-900 shadow-xl">
            <div className={`p-6 ${selectedPreset.bgHeader} ${selectedPreset.textHeader}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <img src={CRAFTDOCS_FAVICON} alt="CraftDocs" className="h-7 w-7 rounded-lg bg-white/20 object-contain p-0.5" />
                    <span className="text-lg font-bold tracking-tight">CraftDocs Studio</span>
                  </div>
                  <p className="mt-1 text-xs opacity-80">GSTIN 24AALCK6034E1ZP · Ahmedabad, Gujarat</p>
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    {docType}
                  </span>
                  <div className="mt-2 font-mono text-xs font-semibold opacity-90">{invoiceNumber}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-slate-100 bg-slate-50/50 p-6">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Billed to</div>
                <div className="mt-1 text-sm font-bold text-slate-900">{clientName || "Client name"}</div>
                <div className="text-xs text-slate-500">UPI ready on share page</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Payment due</div>
                <div className="mt-1 text-sm font-bold text-slate-900">Net 15 days</div>
                <div className="text-xs text-slate-500">
                  Status: <span className="font-semibold text-emerald-600">Draft</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="pb-3">Description</th>
                    <th className="pb-3 text-center">Qty</th>
                    <th className="pb-3 text-right">Rate</th>
                    <th className="pb-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((it) => (
                    <tr key={it.id}>
                      <td className="py-3 font-medium text-slate-800">{it.description}</td>
                      <td className="py-3 text-center text-slate-500">{it.quantity}</td>
                      <td className="py-3 text-right font-mono text-slate-600">
                        {currSymbol}
                        {it.rate.toLocaleString()}
                      </td>
                      <td className="py-3 text-right font-mono font-semibold text-slate-900">
                        {currSymbol}
                        {(it.quantity * it.rate).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 border-t border-slate-200 pt-4">
                <div className="ml-auto w-64 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-mono font-medium">
                      {currSymbol}
                      {subtotal.toLocaleString()}
                    </span>
                  </div>
                  {taxRate > 0 ? (
                    <div className="flex justify-between text-slate-600">
                      <span>GST ({taxRate}%)</span>
                      <span className="font-mono font-medium">
                        {currSymbol}
                        {taxAmount.toLocaleString()}
                      </span>
                    </div>
                  ) : null}
                  <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-bold text-slate-900">
                    <span>Total due</span>
                    <span className="font-mono text-base" style={{ color: selectedPreset.primaryColor }}>
                      {currSymbol}
                      {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
