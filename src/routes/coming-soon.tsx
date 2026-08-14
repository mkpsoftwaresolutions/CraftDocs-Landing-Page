import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/landing/ComingSoon";

export const Route = createFileRoute("/coming-soon")({
  component: ComingSoonPage,
  head: () => ({
    meta: [
      { title: "CraftDocs — Coming Soon" },
      {
        name: "description",
        content:
          "CraftDocs is almost here. Join the waitlist for GST invoices, quotations, share links, and UPI collection.",
      },
    ],
  }),
});
