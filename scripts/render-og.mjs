#!/usr/bin/env node
/**
 * Renders public/og-image.svg to public/og-image.png at 1200×630.
 * Usage: node scripts/render-og.mjs
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = join(root, "public", "og-image.svg");
const pngPath = join(root, "public", "og-image.png");
const tmpDir = join(root, ".tmp-og-render");

function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed`);
  }
}

async function main() {
  if (!existsSync(svgPath)) {
    throw new Error(`Missing ${svgPath}`);
  }

  mkdirSync(tmpDir, { recursive: true });
  writeFileSync(join(tmpDir, "package.json"), JSON.stringify({ private: true, type: "module" }));
  run("npm", ["install", "--omit=dev", "@resvg/resvg-js@2"], tmpDir);

  const require = createRequire(join(tmpDir, "package.json"));
  const { Resvg } = require("@resvg/resvg-js");
  const svg = readFileSync(svgPath, "utf8");
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
    font: {
      fontFiles: [
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
      ],
      defaultFontFamily: "Arial",
      loadSystemFonts: true,
    },
  });
  const png = resvg.render().asPng();
  writeFileSync(pngPath, png);
  rmSync(tmpDir, { recursive: true, force: true });
  console.log(`Wrote ${pngPath} (${png.length} bytes)`);
}

main().catch((error) => {
  rmSync(tmpDir, { recursive: true, force: true });
  console.error(error);
  process.exit(1);
});
