/** A month in a year. `month` runs from 1 (January) to 12. */
export type YearMonth = { year: number; month: number };

function formatMonth({ year, month }: YearMonth): string {
  return `${String(month).padStart(2, "0")}/${year}`;
}

/** "08/2023 - Present" or "01/2017 - 12/2021". */
export function formatCvRange(start: YearMonth, end: YearMonth | null): string {
  return `${formatMonth(start)} - ${end ? formatMonth(end) : "Present"}`;
}
