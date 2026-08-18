import { FAQS } from "@/lib/craftdocs";
import { SEO_DESCRIPTION, SEO_OG_DESCRIPTION, SEO_TITLE, type SeoFaq, type SeoPage } from "@/lib/seo";

export type KeywordSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type KeywordPageContent = SeoPage & {
  navLabel: string;
  eyebrow: string;
  h1: string;
  lead: string;
  ctaLabel: string;
  chips: string[];
  sections: KeywordSection[];
  steps: { title: string; desc: string }[];
};

export const HOME_SEO: SeoPage = {
  path: "/",
  name: "Home",
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  ogDescription: SEO_OG_DESCRIPTION,
  ogImageAlt: "CraftDocs — GST invoice software for India with Inky AI",
  faqs: FAQS,
};

export const GST_INVOICE_PAGE: KeywordPageContent = {
  path: "/gst-invoice-generator",
  name: "GST invoice generator",
  navLabel: "GST invoices",
  title: "GST Invoice Generator for India | HSN, CGST/SGST & IGST",
  description:
    "Create GST tax invoices online with HSN/SAC codes and automatic CGST/SGST or IGST splits. Export PDF, share on WhatsApp, and collect UPI — free to start on CraftDocs.",
  ogDescription:
    "GST-ready invoices with HSN, CGST/SGST or IGST, PDF export, WhatsApp, and UPI. Chat with Inky AI or use the CraftDocs studio.",
  ogImageAlt: "CraftDocs GST invoice generator for India",
  eyebrow: "GST billing",
  h1: "GST invoice generator for Indian businesses",
  lead: "Build a tax invoice that looks finished: GSTIN-ready fields, HSN on line items, and CGST/SGST or IGST calculated for you. Then export a PDF or send a share link your client can pay against.",
  ctaLabel: "Create a GST invoice free",
  chips: ["HSN / SAC on line items", "CGST/SGST or IGST", "Indian GST templates", "PDF + WhatsApp + UPI"],
  sections: [
    {
      heading: "What a GST tax invoice needs to carry",
      paragraphs: [
        "A GST invoice is not just a payment request with a logo. Registered businesses in India typically need a tax invoice that identifies the supplier and recipient, shows a unique invoice number and date, lists HSN or SAC against goods or services, and splits tax correctly for the place of supply.",
        "CraftDocs is built around that document — not a generic invoice with GST pasted on later. Choose Tax Invoice or GST Invoice as the document type, pick a GST-ready template such as Indian GST Professional, and fill client, items, and tax in one studio.",
      ],
      bullets: [
        "Supplier and client details with GSTIN-ready fields",
        "HSN/SAC on each line item so tax is not a guess",
        "Automatic CGST + SGST for intra-state bills, or IGST for inter-state",
        "Taxable value, tax rate, and totals that stay in sync when you edit",
      ],
    },
    {
      heading: "Intra-state vs inter-state: the split that Excel gets wrong",
      paragraphs: [
        "If you and your client are in the same state, a GST invoice usually shows CGST and SGST. If they are in another state, the same taxable value is typically billed as IGST. Spreadsheets break here: someone copies last month’s formula, forgets to switch the split, or hard-codes 18% without HSN.",
        "In CraftDocs the line items carry HSN and tax. Change the client or the place of supply, and the studio recalculates the split instead of leaving a stale CGST column on an interstate bill. That is the job of a GST invoice generator — not a prettier Word template.",
      ],
    },
    {
      heading: "Create it yourself, or ask Inky AI",
      paragraphs: [
        "If you already know the client and items, open the document studio, choose GST Tax Invoice, apply your brand kit, and export. If you would rather talk it through, Inky AI walks template → client → products → GST, then helps you send the invoice on WhatsApp or email.",
        "Free includes one Inky trial; Business unlocks unlimited Inky. Either path lands on the same GST-ready document you can PDF, share, and collect against with UPI.",
      ],
    },
    {
      heading: "Who this generator is for",
      paragraphs: [
        "Agencies, clinics, traders, and service firms that already issue GST invoices — and people who still rebuild them in Excel every week. It is also the right starting point if you send quotations today and convert them to tax invoices after the work is approved.",
        "Need a quote first, or you bill as a solo freelancer with UPI? Those are different jobs, and we keep them on their own pages so this one stays about GST invoices.",
      ],
    },
  ],
  steps: [
    { title: "Pick GST / tax invoice", desc: "Start from a GST-ready template instead of a blank Word page." },
    { title: "Add client, HSN & tax", desc: "Pull saved products or type line items. Totals and GST splits update live." },
    { title: "Brand, export, collect", desc: "Apply logo and colours, download PDF, share on WhatsApp, attach UPI." },
  ],
  faqs: [
    {
      q: "What is a GST invoice generator?",
      a: "It is software that creates GST tax invoices with the fields Indian businesses actually use — GSTIN-ready details, HSN/SAC, and CGST/SGST or IGST — then lets you export PDF or share a payment link. CraftDocs does that in the browser, with optional help from Inky AI.",
    },
    {
      q: "Does CraftDocs calculate CGST, SGST, and IGST automatically?",
      a: "Yes. Line items support HSN and tax rates. Intra-state bills split CGST/SGST; inter-state bills use IGST, so you are not maintaining two spreadsheet templates.",
    },
    {
      q: "Can I add HSN or SAC codes on each item?",
      a: "Yes. Save products with HSN in your catalog and reuse them, or enter HSN on the invoice line. Templates such as Indian GST Professional are designed around that layout.",
    },
    {
      q: "Can I export a GST invoice as PDF and send it on WhatsApp?",
      a: "Yes. Export PDF, open a public share page, send WhatsApp or email deep links, and attach your UPI ID with a QR so the client can pay from the same flow.",
    },
    {
      q: "Is the GST invoice generator free?",
      a: "CraftDocs has a free plan with 10 documents per month, core templates, and one Inky AI trial. Upgrade when you need unlimited documents; Business adds unlimited Inky.",
    },
  ] satisfies SeoFaq[],
};

export const QUOTATION_PAGE: KeywordPageContent = {
  path: "/quotation-software",
  name: "Quotation software",
  navLabel: "Quotations",
  title: "Quotation Software for India | Convert Quotes to GST Invoices",
  description:
    "Create professional quotations and estimates, share them on WhatsApp, then convert accepted quotes into GST invoices without retyping line items. Free to start on CraftDocs.",
  ogDescription:
    "Quotation maker with brand kits, WhatsApp share, and one-click convert to GST invoice. Built for Indian agencies and service firms.",
  ogImageAlt: "CraftDocs quotation software for India",
  eyebrow: "Quotes & estimates",
  h1: "Quotation software that converts to GST invoices",
  lead: "Send a quote that looks like your brand — not a pasted Excel table. When the client says yes, convert it to a tax invoice with the same items, HSN, and totals instead of rebuilding the bill from scratch.",
  ctaLabel: "Create a quotation free",
  chips: ["Quotations & estimates", "Quote → invoice convert", "WhatsApp share", "Same brand kit as invoices"],
  sections: [
    {
      heading: "A quotation is not an invoice — treat it like a real document",
      paragraphs: [
        "A quotation (or estimate) is the offer: scope, rates, validity, and often GST as a preview. An invoice is the request to pay after work is agreed or delivered. Mixing them in one Word file is how agencies lose version control — last week’s quote gets “invoice” typed on top, the number stays Q-014, and nobody can tell what was accepted.",
        "CraftDocs keeps quotations as their own document type, next to estimates and proforma invoices. You pick the type up front, apply the same brand kit you use on GST invoices, and the status flow can move from Draft to Sent without pretending the quote is already billed.",
      ],
    },
    {
      heading: "Convert an accepted quote instead of retyping it",
      paragraphs: [
        "The expensive part of quoting in India is not the PDF. It is doing the work twice: quote in WhatsApp, then a GST invoice in Excel with the same line items, HSN, and tax. CraftDocs is built so a quotation can convert into an invoice — client, catalog items, and branding travel with it.",
        "That is the difference between a quotation maker and a full studio. You still send a polished estimate today. You do not start from a blank tax invoice tomorrow.",
      ],
      bullets: [
        "Quotation, estimate, and proforma as first-class types",
        "Reuse clients and HSN-ready products from your catalog",
        "Convert quote → invoice when the work is approved",
        "Share the quote as a link, WhatsApp, or email — then invoice the same way",
      ],
    },
    {
      heading: "How Indian teams actually send quotes",
      paragraphs: [
        "Most quotes in India do not go out as a formal portal login. They go out on WhatsApp. CraftDocs gives you a public share page and WhatsApp deep links so the PDF is not trapped in your downloads folder. The client opens the quote, you follow up in the same thread, then you convert and send the GST invoice when they confirm.",
        "Brand kit, stamp, and signature apply to quotations the same way they apply to invoices, so the quote does not look like a different company from the bill that follows.",
      ],
    },
    {
      heading: "When to use this page vs a GST invoice generator",
      paragraphs: [
        "Use quotation software when the client has not approved price or scope yet. Use a GST invoice generator when you need a tax invoice with HSN and CGST/SGST or IGST. Many CraftDocs users do both in the same workspace — quote first, invoice after — which is why these are linked pages instead of one generic “documents” article.",
      ],
    },
  ],
  steps: [
    { title: "Start a quotation", desc: "Choose quotation or estimate, then a template that matches your brand." },
    { title: "Add scope and rates", desc: "Pull products and clients, or type the job. Totals stay live as you edit." },
    { title: "Share, then convert", desc: "Send WhatsApp or a link. When they accept, convert to a GST invoice." },
  ],
  faqs: [
    {
      q: "What is the difference between a quotation and an invoice?",
      a: "A quotation is the offer — what you will do and for how much. An invoice is the bill after the offer is accepted or the work is done. CraftDocs keeps them as separate document types so quote numbers, invoice numbers, and GST tax invoices do not get mixed up.",
    },
    {
      q: "Can I convert a CraftDocs quotation into a GST invoice?",
      a: "Yes. The product workflow includes converting quotes into invoices so you reuse client details, line items, and branding instead of retyping the job into a tax invoice.",
    },
    {
      q: "Can I send quotations on WhatsApp?",
      a: "Yes. Share a public page or open a WhatsApp deep link with the document, the same way you share invoices. Email compose is available too.",
    },
    {
      q: "Does a quotation include GST?",
      a: "You can show tax on a quotation as a preview of the bill. When you convert to a GST tax invoice, HSN and CGST/SGST or IGST belong on that invoice document — which is the legally relevant bill, not the quote.",
    },
    {
      q: "Is there a free quotation maker?",
      a: "Yes. The CraftDocs free plan includes 10 documents per month, which can be quotations, invoices, or other types, plus core templates. Upgrade anytime for unlimited documents.",
    },
  ] satisfies SeoFaq[],
};

export const FREELANCER_PAGE: KeywordPageContent = {
  path: "/invoice-software-for-freelancers",
  name: "Invoice software for freelancers",
  navLabel: "Freelancers",
  title: "Invoice Software for Freelancers in India | UPI & WhatsApp",
  description:
    "Invoice software for Indian freelancers: branded PDFs, WhatsApp share, and UPI collection. Create GST invoices when you need them — 10 free documents a month on CraftDocs.",
  ogDescription:
    "Look paid, get paid. Freelancer invoices with logo, WhatsApp, UPI QR, and GST when you need it. Start free on CraftDocs.",
  ogImageAlt: "CraftDocs invoice software for Indian freelancers",
  eyebrow: "Solo & small studios",
  h1: "Invoice software for Indian freelancers",
  lead: "Clients take you seriously when the invoice looks finished. CraftDocs gives a one-person studio a brand kit, a GST-ready invoice when you need it, WhatsApp delivery, and a UPI QR on the share page — without running a full accounting suite.",
  ctaLabel: "Start invoicing free",
  chips: ["Brand kit + logo", "WhatsApp share", "UPI QR on the share page", "10 free docs / month"],
  sections: [
    {
      heading: "Freelance billing in India is WhatsApp + UPI, not a finance department",
      paragraphs: [
        "If you design, write, code, or consult, the invoice is often the only “ops” you do. Word templates look unofficial. Excel GST math is a weekend project. Payment follows in a separate UPI chat that does not match the PDF. Clients still ask “did you send the invoice?” because the file died in email.",
        "CraftDocs is invoice software aimed at that loop: make a document that looks like a studio, send it where the client already is (WhatsApp), and put UPI on the same share page so they are not hunting for your VPA.",
      ],
    },
    {
      heading: "Look like a studio even if you are one person",
      paragraphs: [
        "The Brand Kit stores logo, colours, stamp, signature, bank details, and UPI. Every new invoice, quotation, or receipt picks them up. You are not screenshotting last month’s bill and changing the date.",
        "Templates range from Swiss Minimalist to Indian GST Professional, so you can send a clean creative invoice today and a tax invoice with HSN if a client’s accounts team asks for GST later.",
      ],
      bullets: [
        "Save clients once — no retyping names into every PDF",
        "Product catalog with HSN for retainers and repeat services",
        "Draft → Sent → Paid so you see what is still unpaid",
        "Public share links instead of “please find attached”",
      ],
    },
    {
      heading: "GST when you need it — without pretending you are a CA",
      paragraphs: [
        "Many Indian freelancers start unregistered and later need GST invoices. CraftDocs supports both a simple invoice and a GST tax invoice with HSN and CGST/SGST or IGST. This page is not tax advice: whether you must register, what to charge, or how to file returns depends on your turnover and a professional. The software’s job is to produce the document correctly once you know what you need to send.",
        "If GST is already part of your work, use the GST invoice generator flow. If you are still quoting jobs, start with a quotation and convert it when the client confirms.",
      ],
    },
    {
      heading: "Free enough to try on real clients",
      paragraphs: [
        "The free plan includes 10 documents per month, one Inky AI trial, core templates, one workspace, and three shares per month (PDFs carry a CraftDocs watermark). That is enough to invoice a handful of clients before you decide to upgrade. Business adds unlimited Inky if you want the chat-to-invoice path every time.",
      ],
    },
  ],
  steps: [
    { title: "Set your brand + UPI", desc: "Logo, colours, signature, and UPI once — they follow every document." },
    { title: "Invoice the job", desc: "Add the client and line items, or ask Inky. GST fields are there when you need them." },
    { title: "Share and get paid", desc: "WhatsApp or a link, with a UPI QR on the share page so payment is one tap." },
  ],
  faqs: [
    {
      q: "What is the best invoice software for freelancers in India?",
      a: "Look for branded PDFs, WhatsApp sharing, UPI collection, and GST invoices when you need them — not a heavy accounting suite. CraftDocs is built for that freelancer loop, with a free plan of 10 documents a month.",
    },
    {
      q: "Can I collect UPI payments from a CraftDocs invoice?",
      a: "Yes. Add your UPI ID in the company profile. The share page can show a UPI QR and pay URI so clients pay from the same link you sent on WhatsApp.",
    },
    {
      q: "Do Indian freelancers need GST invoices?",
      a: "Only if your situation requires GST registration and tax invoices — that depends on turnover and the kind of work, and you should confirm with a CA. CraftDocs supports standard invoices and GST tax invoices with HSN so you can issue the format you actually need.",
    },
    {
      q: "Can I send freelancer invoices on WhatsApp?",
      a: "Yes. Create the invoice, open a WhatsApp deep link or public share page, and follow up in the same chat. Email is available if the client’s accounts team wants it.",
    },
    {
      q: "Is there a free plan for solo freelancers?",
      a: "Yes. Free includes 10 documents per month, 1 Inky AI trial, core templates, 1 workspace, and 3 shares per month, with a CraftDocs watermark on PDFs. Upgrade when you outgrow that.",
    },
  ] satisfies SeoFaq[],
};

export const KEYWORD_PAGES = [GST_INVOICE_PAGE, QUOTATION_PAGE, FREELANCER_PAGE] as const;

export const INNER_NAV_LINKS = [
  { label: "Home", href: "/" },
  ...KEYWORD_PAGES.map((page) => ({ label: page.navLabel, href: page.path })),
  { label: "Pricing", href: "/#pricing" },
] as const;
