#!/usr/bin/env node
/**
 * Builds the TanStack Start app with a Node server preset, prerenders
 * indexable routes into dist/*.html, and copies static assets for Firebase Hosting.
 */
import { spawn } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const publicDir = path.join(root, ".output", "public");
const serverEntry = path.join(root, ".output", "server", "index.mjs");
const PRERENDER_ROUTES = [
  "/",
  "/gst-invoice-generator",
  "/quotation-software",
  "/invoice-software-for-freelancers",
];

function run(command, args, env = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      stdio: "inherit",
      env: { ...process.env, ...env },
      shell: process.platform === "win32",
    });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
    });
  });
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        reject(new Error("Could not allocate port"));
        return;
      }
      const { port } = address;
      server.close(() => resolve(port));
    });
    server.on("error", reject);
  });
}

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 404) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Server did not become ready at ${url}`);
}

async function main() {
  console.log("→ Building app for Firebase Hosting (Nitro node-server)…");
  await run("npm", ["run", "build"], {
    FIREBASE_HOSTING: "1",
    NITRO_PRESET: "node-server",
  });

  if (!existsSync(serverEntry)) {
    throw new Error(`Missing server build at ${serverEntry}`);
  }
  if (!existsSync(publicDir)) {
    throw new Error(`Missing public build at ${publicDir}`);
  }

  rmSync(distDir, { recursive: true, force: true });
  mkdirSync(distDir, { recursive: true });
  cpSync(publicDir, distDir, { recursive: true });

  const port = await getFreePort();
  const base = `http://127.0.0.1:${port}`;
  console.log(`→ Starting prerender server on ${base}…`);

  const server = spawn(process.execPath, [serverEntry], {
    cwd: root,
    env: { ...process.env, PORT: String(port), HOST: "127.0.0.1", NITRO_PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let stderr = "";
  server.stderr?.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  try {
    await waitForServer(base);
    for (const route of PRERENDER_ROUTES) {
      const res = await fetch(base + route);
      if (!res.ok) {
        throw new Error(`Prerender ${route} failed: ${res.status} ${res.statusText}`);
      }
      const html = await res.text();
      const file = route === "/" ? "index.html" : `${route.replace(/^\//, "")}.html`;
      writeFileSync(path.join(distDir, file), html, "utf8");
      console.log(`→ Wrote dist/${file}`);
    }
  } finally {
    server.kill("SIGTERM");
    await new Promise((r) => setTimeout(r, 300));
    if (!server.killed) server.kill("SIGKILL");
  }

  if (!existsSync(path.join(distDir, "index.html"))) {
    throw new Error(`Prerender failed. Server stderr:\n${stderr}`);
  }

  console.log("✓ Hosting bundle ready in dist/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
