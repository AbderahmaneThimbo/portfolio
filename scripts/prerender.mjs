// Runs after `vite build` and the SSR build: renders <App /> to HTML and writes it into dist/index.html.
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { render } = await import(pathToFileURL(join(root, "dist-ssr", "entry-server.js")).href);

const file = join(root, "dist", "index.html");
const html = readFileSync(file, "utf8");
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error("dist/index.html has no empty #root to fill");

writeFileSync(file, html.replace(marker, `<div id="root">${render()}</div>`));
rmSync(join(root, "dist-ssr"), { recursive: true, force: true });
console.log("prerendered dist/index.html");
