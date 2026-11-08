// Runs after `vite build` and the SSR build:
// - renders <App /> to HTML and writes it into dist/index.html;
// - puts the stylesheet inside the page, so the first paint does not wait for a separate CSS request.
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { render } = await import(pathToFileURL(join(root, "dist-ssr", "entry-server.js")).href);

const file = join(root, "dist", "index.html");
let html = readFileSync(file, "utf8");

const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error("dist/index.html has no empty #root to fill");
html = html.replace(marker, `<div id="root">${render()}</div>`);

const cssLink = html.match(/<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/);
if (!cssLink) throw new Error("dist/index.html has no built stylesheet to inline");
const css = readFileSync(join(root, "dist", cssLink[1]), "utf8");
html = html.replace(cssLink[0], () => `<style>${css}</style>`);

writeFileSync(file, html);
rmSync(join(root, "dist-ssr"), { recursive: true, force: true });
console.log("prerendered dist/index.html (stylesheet inlined)");
