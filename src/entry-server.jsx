// Renders the page to HTML at build time (see scripts/prerender.mjs), so visitors and search engines
// get the full content before any JavaScript runs.
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

export const render = () => renderToString(<App />);
