import { expect, test } from "vitest";
import { findBadPaths, parseHeader, parseText, pickLocaleFile } from "./parse";

const sample = `---
technologies: [Kotlin, Jetpack Compose]
links:
  - title: Play Store (soon)
    url: "#"
---

# Bank SMS Manager

Reads bank SMS messages to track spending.

## How it works

Details here.`;

test("parses header", () => {
  expect(parseHeader(sample)).toEqual({
    technologies: ["Kotlin", "Jetpack Compose"],
    links: [{ title: "Play Store (soon)", url: "#" }],
  });
});

test("links default to empty", () => {
  expect(parseHeader("---\ntechnologies: [A]\n---\n# T\n\nD").links).toEqual(
    [],
  );
});

test("missing technologies throws", () => {
  expect(() => parseHeader("# T\n\nD")).toThrow(/technologies/);
});

test("splits title, description and body", () => {
  expect(parseText(sample)).toEqual({
    title: "Bank SMS Manager",
    description: "Reads bank SMS messages to track spending.",
    body: "## How it works\n\nDetails here.",
  });
});

test("missing title throws", () => {
  expect(() => parseText("no title here")).toThrow(/title/);
});

test("rejects relative paths outside showcase", () => {
  expect(
    findBadPaths(
      '![a](../../src/x.png) [b](../src/main.ts) <img src="/etc/y.png">',
    ),
  ).toEqual(["../../src/x.png", "../src/main.ts", "/etc/y.png"]);
});

test("allows paths inside showcase and absolute urls", () => {
  expect(
    findBadPaths(
      "![a](01-login.png) ![b](./shots/2.png) [c](https://x.dev) [d](#top) [e](mailto:a@b.c)",
    ),
  ).toEqual([]);
});

test("falls back to english", () => {
  expect(pickLocaleFile({ en: "EN", es: undefined, jp: undefined }, "ja")).toBe(
    "EN",
  );
  expect(pickLocaleFile({ en: "EN", es: "ES", jp: "JP" }, "ja")).toBe("JP");
  expect(pickLocaleFile({ en: "EN", es: "ES", jp: undefined }, "es")).toBe(
    "ES",
  );
});
