import { createFileRoute } from "@tanstack/react-router";
import { KeywordPage } from "@/components/landing/KeywordPage";
import { getPageHead, getPageJsonLd } from "@/lib/seo";
import { GST_INVOICE_PAGE } from "@/lib/seo-pages";

export const Route = createFileRoute("/gst-invoice-generator")({
  head: () => getPageHead(GST_INVOICE_PAGE),
  component: GstInvoiceGeneratorPage,
});

function GstInvoiceGeneratorPage() {
  return <KeywordPage page={GST_INVOICE_PAGE} jsonLd={getPageJsonLd(GST_INVOICE_PAGE)} />;
}
