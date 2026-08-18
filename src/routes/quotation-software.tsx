import { createFileRoute } from "@tanstack/react-router";
import { KeywordPage } from "@/components/landing/KeywordPage";
import { getPageHead, getPageJsonLd } from "@/lib/seo";
import { QUOTATION_PAGE } from "@/lib/seo-pages";

export const Route = createFileRoute("/quotation-software")({
  head: () => getPageHead(QUOTATION_PAGE),
  component: QuotationSoftwarePage,
});

function QuotationSoftwarePage() {
  return <KeywordPage page={QUOTATION_PAGE} jsonLd={getPageJsonLd(QUOTATION_PAGE)} />;
}
