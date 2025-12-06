import { translations, defaultLang, type Lang } from "./ui";

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang === "en" || lang === "es" || lang === "ja") return lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    const parts = key.split(".");
    let node: unknown = translations;

    for (const part of parts) {
      if (node && typeof node === "object" && part in node) {
        node = (node as Record<string, unknown>)[part];
      } else {
        return key;
      }
    }

    if (node && typeof node === "object" && lang in node) {
      return (node as Record<string, string>)[lang] ?? (node as Record<string, string>)[defaultLang] ?? key;
    }

    return key;
  };
}
