import { CRAFTDOCS_APP_URL, CRAFTDOCS_URL } from "@/lib/craftdocs";

export const SITE_ORIGIN = "https://craftdocs.in";
export const SITE_URL = CRAFTDOCS_URL;
export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE_URL = `${SITE_ORIGIN}${OG_IMAGE_PATH}`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const SEO_TITLE = "GST Invoice Software for India | CraftDocs + Inky AI";
export const SEO_DESCRIPTION =
  "CraftDocs is a GST-ready document studio with Inky AI — chat to create invoices, quotations, and challans. Brand kits, PDF export, WhatsApp share, and UPI collection for freelancers and businesses.";
export const SEO_OG_DESCRIPTION =
  "Meet Inky AI: chat to build GST invoices. 20 document types, templates, brand kits, WhatsApp, and UPI — start free at craftdocs.in.";

export const INDEXABLE_PATHS = [
  "/",
  "/gst-invoice-generator",
  "/quotation-software",
  "/invoice-software-for-freelancers",
] as const;

export type SeoFaq = { q: string; a: string };

export type SeoPage = {
  path: string;
  name: string;
  title: string;
  description: string;
  ogDescription: string;
  ogImageAlt: string;
  faqs: readonly SeoFaq[];
};

export function pageUrl(path: string) {
  if (path === "/") return SITE_URL;
  return `${SITE_ORIGIN}${path}`;
}

export function getSiteHead() {
  const googleVerification = (import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined)?.trim();

  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CraftDocs" },
      { name: "author", content: "CraftDocs" },
      { name: "application-name", content: "CraftDocs" },
      { name: "apple-mobile-web-app-title", content: "CraftDocs" },
      { name: "theme-color", content: "#0b1224" },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "googlebot", content: "index, follow" },
      ...(googleVerification ? [{ name: "google-site-verification", content: googleVerification }] : []),
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "icon", href: "/favicon-64.png", type: "image/png", sizes: "64x64" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  };
}

export function getPageHead(page: SeoPage) {
  const url = pageUrl(page.path);

  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.ogDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: "CraftDocs" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: OG_IMAGE_URL },
      { property: "og:image:secure_url", content: OG_IMAGE_URL },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: String(OG_IMAGE_WIDTH) },
      { property: "og:image:height", content: String(OG_IMAGE_HEIGHT) },
      { property: "og:image:alt", content: page.ogImageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: page.title },
      { name: "twitter:description", content: page.ogDescription },
      { name: "twitter:image", content: OG_IMAGE_URL },
      { name: "twitter:image:alt", content: page.ogImageAlt },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "image_src", href: OG_IMAGE_URL },
    ],
  };
}

export function getPageJsonLd(page: SeoPage) {
  const url = pageUrl(page.path);
  const orgId = `${SITE_ORIGIN}/#organization`;
  const websiteId = `${SITE_ORIGIN}/#website`;
  const appId = `${SITE_ORIGIN}/#software`;
  const faqId = `${url}#faq`;
  const webPageId = `${url}#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "CraftDocs",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_ORIGIN}/CraftDocs_Logo.svg`,
        },
        image: OG_IMAGE_URL,
        description: SEO_DESCRIPTION,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: "CraftDocs",
        description: SEO_DESCRIPTION,
        inLanguage: "en-IN",
        publisher: { "@id": orgId },
      },
      {
        "@type": "SoftwareApplication",
        "@id": appId,
        name: "CraftDocs",
        url: SITE_URL,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Invoice software",
        operatingSystem: "Web",
        inLanguage: "en-IN",
        description: SEO_DESCRIPTION,
        image: OG_IMAGE_URL,
        screenshot: OG_IMAGE_URL,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: CRAFTDOCS_APP_URL,
          description: "Free plan with paid upgrades",
        },
        featureList: [
          "GST invoices with HSN and CGST/SGST/IGST",
          "Inky AI invoice assistant",
          "Quotations, challans, and 17 more document types",
          "Brand kits and PDF export",
          "WhatsApp share and UPI collection",
        ],
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": webPageId,
        url,
        name: page.title,
        description: page.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": websiteId },
        about: { "@id": appId },
        primaryImageOfPage: OG_IMAGE_URL,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          ...(page.path === "/"
            ? []
            : [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: page.name,
                  item: url,
                },
              ]),
        ],
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        url: `${url}#faq`,
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };
}
