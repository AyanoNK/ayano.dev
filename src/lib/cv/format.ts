/** A month in a year. `month` runs from 1 (January) to 12. */
export type YearMonth = { year: number; month: number };

const BARS = 5;

function formatMonth({ year, month }: YearMonth): string {
  return `${String(month).padStart(2, "0")}/${year}`;
}

/** "08/2023 - Present" or "01/2017 - 12/2021". */
export function formatCvRange(start: YearMonth, end: YearMonth | null): string {
  return `${formatMonth(start)} - ${end ? formatMonth(end) : "Present"}`;
}

/** Five bars for a language level, `true` where a bar is filled. */
export function meterBars(level: number): boolean[] {
  const filled = Math.min(Math.max(level, 0), BARS);
  return Array.from({ length: BARS }, (_, i) => i < filled);
}
