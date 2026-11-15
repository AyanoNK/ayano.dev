import { expect, test } from "vitest";
import { formatMonth, formatRange } from "./dates";

test("formats a month per language", () => {
  expect(formatMonth("2023-08", "en")).toBe("Aug 2023");
  expect(formatMonth("2023-08", "es")).toBe("Ago 2023");
  expect(formatMonth("2023-08", "ja")).toBe("2023年8月");
});

test("does not shift the month in any time zone", () => {
  expect(formatMonth("2025-01", "en")).toBe("Jan 2025");
});

test("open range shows the present label", () => {
  expect(formatRange("2025-06", undefined, "en", "Present")).toBe(
    "Jun 2025 - Present",
  );
});

test("closed range", () => {
  expect(formatRange("2023-08", "2025-05", "es", "Actual")).toBe(
    "Ago 2023 - May 2025",
  );
});
