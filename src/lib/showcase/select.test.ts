import { expect, test } from "vitest";
import { selectHome } from "./select";

const r = (
  id: string,
  day: number,
  highlight = false,
  bigHighlight = false,
) => ({
  id,
  createdAt: new Date(2026, 0, day),
  highlight,
  bigHighlight,
});

test("newest big highlight wins", () => {
  const items = [
    r("old", 1, true, true),
    r("new", 5, false, true),
    r("h", 3, true),
  ];
  expect(selectHome(items).featured?.id).toBe("new");
});

test("older big highlight drops out", () => {
  const items = [
    r("oldBigOnly", 1, false, true),
    r("new", 5, false, true),
    r("h", 3, true),
  ];
  expect(selectHome(items).small.map((x) => x.id)).toEqual(["h"]);
});

test("falls back to newest highlight for featured", () => {
  const { featured, small } = selectHome([r("a", 1, true), r("b", 2, true)]);
  expect(featured?.id).toBe("b");
  expect(small.map((x) => x.id)).toEqual(["a"]);
});

test("at most three small cards, newest first", () => {
  const items = [1, 2, 3, 4, 5]
    .map((d) => r(`h${d}`, d, true))
    .concat(r("big", 9, false, true));
  expect(selectHome(items).small.map((x) => x.id)).toEqual(["h5", "h4", "h3"]);
});

test("no highlights gives nothing", () => {
  expect(selectHome([r("a", 1)])).toEqual({ featured: undefined, small: [] });
});
