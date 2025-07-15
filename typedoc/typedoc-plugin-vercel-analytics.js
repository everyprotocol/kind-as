import { JSX } from "typedoc";

// @param {import("typedoc").Application} app
export function load(app) {
  app.renderer.hooks.on("body.end", () => [
    JSX.createElement(
      "script",
      null,
      JSX.createElement(JSX.Raw, {
        html: `window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`,
      })
    ),
    JSX.createElement("script", { defer: true, src: "/_vercel/insights/script.js" }),
  ]);
}
