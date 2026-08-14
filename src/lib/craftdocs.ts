/** Shared CraftDocs marketing constants — aligned with invoice-generator */

export const CRAFTDOCS_URL = "https://craftdocs.in/";
/** App entry — temporarily routes to the Coming Soon page until launch. */
export const CRAFTDOCS_APP_URL = "/coming-soon";


export const NAV_LINKS = [
  { label: "Live Preview", href: "#preview" },
  { label: "Inky AI", href: "#inky" },
  { label: "Features", href: "#features" },
  { label: "Modules", href: "#demo" },
  { label: "How it works", href: "#workflow" },
  { label: "Templates", href: "#templates" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

/** Inky — CraftDocs AI invoice assistant (from invoice-generator) */
export const INKY = {
  name: "Inky",
  tagline: "Your AI invoice assistant",
  headline: "Meet Inky — create invoices by chatting",
  description:
    "Tell Inky what you need. It picks a template, fills the client and line items, applies GST, then helps you send the invoice on WhatsApp or email — without clicking through every form.",
  steps: [
    { title: "Pick a document", desc: "Invoice, GST tax invoice, quotation, and more" },
    { title: "Fill the details", desc: "Client, products, HSN, and tax — guided step by step" },
    { title: "Create & share", desc: "Generate the PDF and send via WhatsApp or email" },
  ],
  capabilities: [
    "Guided chat for template → client → items → create",
    "GST-aware prompts with HSN and tax splits",
    "Pulls from your clients & product catalog",
    "Share ready invoices on WhatsApp or email",
  ],
  accessNote: "Free includes 1 Inky trial. Unlimited Inky on Business.",
} as const;

export const DOC_TYPES = [
  { id: "gst-invoice", title: "GST Invoices", blurb: "HSN + CGST/SGST or IGST", color: "#1E3A8A" },
  { id: "invoice", title: "Invoices", blurb: "Standard payment requests", color: "#3B82F6" },
  { id: "quotation", title: "Quotations", blurb: "Convert to invoice later", color: "#059669" },
  { id: "tax-invoice", title: "Tax Invoices", blurb: "Formal tax breakdown", color: "#0D9488" },
  { id: "proforma-invoice", title: "Proforma", blurb: "Pre-shipment billing", color: "#7C3AED" },
  { id: "purchase-order", title: "Purchase Orders", blurb: "Vendor authorizations", color: "#F97316" },
  { id: "delivery-challan", title: "Delivery Challans", blurb: "Dispatch proof", color: "#6B7280" },
  { id: "receipt", title: "Receipts", blurb: "Payment acknowledgements", color: "#10B981" },
  { id: "credit-note", title: "Credit Notes", blurb: "Returns & adjustments", color: "#EC4899" },
  { id: "commercial-invoice", title: "Commercial", blurb: "Export & customs", color: "#D4AF37" },
] as const;

export const FEATURES = [
  {
    title: "Inky AI invoice assistant",
    desc: "Chat with Inky to build invoices — template, client, line items, GST, then WhatsApp or email — without fighting forms.",
  },
  {
    title: "GST-ready document studio",
    desc: "Create GST invoices with HSN codes and automatic CGST/SGST or IGST — plus 19 other document types from quotations to challans.",
  },
  {
    title: "Dozens of professional templates",
    desc: "Start from Modern Executive, Swiss Minimalist, Indian GST Professional, Luxury Black & Gold, and more — then tune colors and layout.",
  },
  {
    title: "Brand kit that sticks",
    desc: "Logo, colors, stamp, signature, and company profile apply across every new document so clients always recognize you.",
  },
  {
    title: "Clients & products catalog",
    desc: "Save contacts and line items with HSN once, then drop them into the next invoice instead of retyping from scratch.",
  },
  {
    title: "Share links, WhatsApp & UPI",
    desc: "Send a public share page, open WhatsApp or email with the amount, and attach UPI so clients can pay in one tap.",
  },
] as const;

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Pick a document type",
    desc: "Invoice, GST tax invoice, quotation, PO, challan, receipt — twenty formats ready for Indian and global billing.",
  },
  {
    step: "02",
    title: "Choose a template & brand",
    desc: "Apply your logo, colors, stamp, and signature. Switch paper size, orientation, and layout in the design panel.",
  },
  {
    step: "03",
    title: "Add clients, items & tax",
    desc: "Pull from your catalogs. CraftDocs calculates totals, discounts, and GST splits automatically.",
  },
  {
    step: "04",
    title: "Export, share & get paid",
    desc: "Download PDF, share a public link, remind over WhatsApp, and collect via UPI QR on the share page.",
  },
] as const;

/** Representative templates from invoice-generator templateConfigs.js */
export const TEMPLATES = [
  {
    id: "modern-executive",
    name: "Modern Executive",
    category: "Corporate",
    tag: "Popular",
    primary: "#1E3A8A",
    secondary: "#3B82F6",
  },
  {
    id: "gst-professional",
    name: "Indian GST Professional",
    category: "Tax compliance",
    tag: "GST",
    primary: "#0F766E",
    secondary: "#0EA5E9",
  },
  {
    id: "swiss-minimal",
    name: "Swiss Minimalist",
    category: "Creative",
    tag: "Clean",
    primary: "#111827",
    secondary: "#6B7280",
  },
  {
    id: "luxury-black-gold",
    name: "Luxury Black & Gold",
    category: "Consultants",
    tag: "Premium",
    primary: "#1E1E1E",
    secondary: "#D4AF37",
  },
  {
    id: "corporate-navy",
    name: "Corporate Navy",
    category: "Agencies",
    tag: "Classic",
    primary: "#0F172A",
    secondary: "#334155",
  },
  {
    id: "emerald-business",
    name: "Emerald Premium",
    category: "Professional",
    tag: "Fresh",
    primary: "#047857",
    secondary: "#10B981",
  },
  {
    id: "creative-agency",
    name: "Creative Agency Violet",
    category: "Studios",
    tag: "Bold",
    primary: "#5B21B6",
    secondary: "#8B5CF6",
  },
  {
    id: "gst-premium-landscape",
    name: "GST Premium Landscape",
    category: "High density",
    tag: "Landscape",
    primary: "#1E3A8A",
    secondary: "#14B8A6",
  },
  {
    id: "minimal-whitespace",
    name: "Minimal White Space",
    category: "Freelancers",
    tag: "Editorial",
    primary: "#27272A",
    secondary: "#A1A1AA",
  },
] as const;

export type BillingRegion = "IN" | "US";

export function formatPlanPrice(amount: number, locale: string, currency: string) {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return String(amount);
  }
}

export const FAQS = [
  {
    q: "What is Inky AI?",
    a: "Inky is CraftDocs' AI assistant. Chat to create invoices — it guides template choice, client details, products, GST, then helps you send via WhatsApp or email. Free includes 1 trial; Business unlocks unlimited Inky.",
  },
  {
    q: "Does CraftDocs support Indian GST invoices?",
    a: "Yes. Create GST tax invoices with HSN codes and automatic CGST/SGST or IGST splits, plus dedicated GST-ready templates like Indian GST Professional.",
  },
  {
    q: "What document types can I create?",
    a: "Twenty types including invoices, tax/GST invoices, quotations, estimates, purchase orders, delivery challans, credit/debit notes, receipts, packing slips, and export documents.",
  },
  {
    q: "Can I brand invoices with my logo and colors?",
    a: "The Brand Kit and Company Profile let you set logo, colors, stamp, signature, bank details, and UPI so every document stays on-brand.",
  },
  {
    q: "How do clients pay?",
    a: "Share a public link, send WhatsApp or email deep links, and attach your UPI ID with a QR on the share page so clients can pay in one tap.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. Free includes 10 documents per month, 1 Inky AI trial, core templates, 1 workspace, and 3 shares per month (with a CraftDocs watermark on PDFs). Upgrade anytime for unlimited docs — Business adds unlimited Inky.",
  },
] as const;

export const DEMO_MODULES = [
  {
    id: "studio",
    label: "Document studio",
    title: "Design GST invoices that look finished",
    body: "Pick from 20 document types with HSN, auto CGST/SGST or IGST, brand colors, and PDF export.",
    points: ["Tax & GST templates", "Brand kit colors & logo", "A4 / Letter · portrait & landscape", "Save draft or export PDF"],
  },
  {
    id: "workspace",
    label: "Workspace data",
    title: "Clients & products, ready to reuse",
    body: "Build your catalog once. Pull clients, line items, bank details, and UPI into every new document.",
    points: ["Client directory", "Product catalog with HSN", "Company profile & UPI", "Multi-workspace switcher"],
  },
  {
    id: "lifecycle",
    label: "Payment status",
    title: "Track Draft → Sent → Paid",
    body: "Filter by status, mark paid, catch Overdue from due dates, and convert quotes into invoices.",
    points: ["Draft / Sent / Paid / Overdue", "Due dates & partial payments", "Quote → Invoice convert", "Reminders via email or WhatsApp"],
  },
  {
    id: "share",
    label: "Share & collect",
    title: "Send a link. Get paid on UPI.",
    body: "Share a public page, open WhatsApp or email with the amount, and attach your UPI ID.",
    points: ["Public /share links", "WhatsApp deep link", "Email compose", "UPI pay URI + QR"],
  },
] as const;
