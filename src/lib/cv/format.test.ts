import { expect, test } from "vitest";
import { formatCvRange, meterBars } from "./format";

test("an ongoing range ends in Present", () => {
  expect(formatCvRange({ year: 2023, month: 8 }, null)).toBe(
    "08/2023 - Present",
  );
});

test("a closed range pads both months", () => {
  expect(
    formatCvRange({ year: 2017, month: 1 }, { year: 2021, month: 12 }),
  ).toBe("01/2017 - 12/2021");
});

test("the meter fills one bar per level", () => {
  expect(meterBars(4)).toEqual([true, true, true, true, false]);
});

test("the meter keeps levels between 0 and 5", () => {
  expect(meterBars(7)).toEqual([true, true, true, true, true]);
  expect(meterBars(-1)).toEqual([false, false, false, false, false]);
});
