// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const hostingBuild = process.env.FIREBASE_HOSTING === "1";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Outside Lovable, override Nitro preset so we can prerender HTML for Firebase Hosting.
  // On Cloudflare, pin the Workers Builds name and route the existing zone
  // (craftdocs.in already has DNS records, so Custom Domains cannot be used).
  nitro: hostingBuild
    ? {
        preset: "node-server",
      }
    : {
        cloudflare: {
          wrangler: {
            name: "craftdocs-landing-page",
            workers_dev: true,
            preview_urls: true,
            routes: [
              { pattern: "craftdocs.in/*", zone_name: "craftdocs.in" },
              { pattern: "www.craftdocs.in/*", zone_name: "craftdocs.in" },
            ],
          },
        },
      },
});
