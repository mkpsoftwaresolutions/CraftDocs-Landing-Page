import { INDEXABLE_PATHS, SITE_ORIGIN, pageUrl } from "./seo";

export const GOOGLE_VERIFICATION_FILE = "googleb3d5a888c2038010.html";
export const GOOGLE_VERIFICATION_BODY = `google-site-verification: ${GOOGLE_VERIFICATION_FILE}\n`;

function sitemapXml() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = INDEXABLE_PATHS.map((path, index) => {
    const loc = pageUrl(path);
    const priority = index === 0 ? "1.0" : "0.9";
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const ROBOTS_TXT = `User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;

export function wellKnownResponse(pathname: string): Response | null {
  if (pathname === `/${GOOGLE_VERIFICATION_FILE}` || pathname === `/${GOOGLE_VERIFICATION_FILE.replace(/\.html$/, "")}`) {
    return new Response(GOOGLE_VERIFICATION_BODY, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=300",
      },
    });
  }

  if (pathname === "/robots.txt") {
    return new Response(ROBOTS_TXT, {
      status: 200,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    });
  }

  if (pathname === "/sitemap.xml") {
    return new Response(sitemapXml(), {
      status: 200,
      headers: {
        "content-type": "application/xml; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    });
  }

  return null;
}
