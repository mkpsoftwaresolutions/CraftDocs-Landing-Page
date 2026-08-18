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
  // Cloudflare Pages supplies its own preset; keep Workers-only wrangler fields
  // out of this config so Pages deploy validation succeeds.
  nitro: hostingBuild
    ? {
        preset: "node-server",
      }
    : {
        cloudflare: {
          pages: {
            routes: {
              exclude: [
                "/assets/*",
                "/inky/*",
                "/CraftDocs_Logo.svg",
                "/favicon.svg",
                "/favicon.png",
                "/favicon-64.png",
                "/apple-touch-icon.png",
                "/logo-mark.png",
                "/logo.png",
                "/og-image.png",
                "/og-image.svg",
              ],
            },
          },
        },
      },
});
