import { expect, test } from "vitest";
import { prefixHeadingIds } from "./headings";

test("prefixes every heading id with the section", () => {
  const html = '<h3 id="results">Results</h3><p>x</p><h4 id="notes">Notes</h4>';
  expect(prefixHeadingIds(html, "energy-agents")).toBe(
    '<h3 id="energy-agents-results">Results</h3><p>x</p><h4 id="energy-agents-notes">Notes</h4>',
  );
});

test("leaves ids on other elements alone", () => {
  const html = '<p id="keep">x</p><h3 id="results">R</h3>';
  expect(prefixHeadingIds(html, "s")).toBe(
    '<p id="keep">x</p><h3 id="s-results">R</h3>',
  );
});
