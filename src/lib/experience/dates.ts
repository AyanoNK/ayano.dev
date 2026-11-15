import type { Lang } from "@/i18n/ui";

export function formatMonth(month: string, lang: Lang): string {
  const [year, monthNumber] = month.split("-").map(Number);
  const text = new Intl.DateTimeFormat(lang, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, monthNumber - 1, 1)));
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatRange(
  start: string,
  end: string | undefined,
  lang: Lang,
  present: string,
): string {
  const endText = end ? formatMonth(end, lang) : present;
  return `${formatMonth(start, lang)} - ${endText}`;
}
