import { expect, test } from "vitest";
import { formatCvRange } from "./format";

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
