import { createFileRoute } from "@tanstack/react-router";
import { KeywordPage } from "@/components/landing/KeywordPage";
import { getPageHead, getPageJsonLd } from "@/lib/seo";
import { FREELANCER_PAGE } from "@/lib/seo-pages";

export const Route = createFileRoute("/invoice-software-for-freelancers")({
  head: () => getPageHead(FREELANCER_PAGE),
  component: FreelancerInvoicePage,
});

function FreelancerInvoicePage() {
  return <KeywordPage page={FREELANCER_PAGE} jsonLd={getPageJsonLd(FREELANCER_PAGE)} />;
}
