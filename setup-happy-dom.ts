import { Window } from "happy-dom";

const win = new Window({ url: "http://localhost/" });

// Set all globals before anything else
const globalRecord = globalThis as Record<string, unknown>;
const winRecord = win as unknown as Record<string, unknown>;

const GLOBALS = [
  "document", "navigator", "location", "history", "localStorage", "sessionStorage",
  "HTMLElement", "Element", "Node", "DocumentFragment", "ShadowRoot", "MutationObserver",
  "Event", "CustomEvent", "EventTarget", "Text", "Comment", "Attr", "NamedNodeMap",
  "CSSStyleDeclaration", "DOMParser", "XMLSerializer", "Range", "TreeWalker", "NodeFilter",
  "HTMLDocument", "SVGElement",
  "HTMLInputElement", "HTMLButtonElement", "HTMLFormElement", "HTMLAnchorElement",
  "HTMLImageElement", "HTMLSelectElement", "HTMLTextAreaElement", "HTMLLabelElement",
  "HTMLSpanElement", "HTMLDivElement", "HTMLParagraphElement",
  "HTMLHeadingElement", "HTMLUListElement", "HTMLOListElement", "HTMLLIElement",
  "HTMLTableElement", "HTMLStyleElement", "HTMLScriptElement", "HTMLLinkElement",
  "HTMLMetaElement", "HTMLTitleElement", "HTMLBodyElement", "HTMLHeadElement",
  "HTMLHtmlElement", "HTMLBRElement", "HTMLHRElement",
  "getComputedStyle", "requestAnimationFrame", "cancelAnimationFrame",
  "ResizeObserver", "IntersectionObserver",
  "URL", "URLSearchParams", "Blob", "File", "FileReader", "FormData",
  "Headers", "Request", "Response", "AbortController", "AbortSignal",
  "queueMicrotask", "structuredClone", "performance",
];

GLOBALS.forEach((key) => {
  if (key in winRecord) {
    globalRecord[key] = winRecord[key];
  }
});

globalRecord["window"] = win;
// Make win.window point to itself so internal references resolve
(win as Record<string, unknown>)["window"] = win;

// Critical: copy Error types so happy-dom's internal this.window.SyntaxError resolves
// happy-dom accesses these via this.window which IS the win object
// We need SyntaxError on win
if (!winRecord["SyntaxError"]) {
  (win as Record<string, unknown>)["SyntaxError"] = SyntaxError;
}
if (!winRecord["TypeError"]) {
  (win as Record<string, unknown>)["TypeError"] = TypeError;
}
if (!winRecord["RangeError"]) {
  (win as Record<string, unknown>)["RangeError"] = RangeError;
}
if (!winRecord["Error"]) {
  (win as Record<string, unknown>)["Error"] = Error;
}
