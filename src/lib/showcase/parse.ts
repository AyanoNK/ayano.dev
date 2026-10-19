import { parse as parseYaml } from "yaml";

export type ProjectLink = { title: string; url: string };
export type ProjectHeader = { technologies: string[]; links: ProjectLink[] };
export type ProjectText = { title: string; description: string; body: string };

const HEADER = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;

function splitHeader(markdown: string): { header?: string; rest: string } {
  const match = markdown.match(HEADER);
  if (!match) return { rest: markdown };
  return { header: match[1], rest: markdown.slice(match[0].length) };
}

function isStringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

function isLinkList(value: unknown): value is ProjectLink[] {
  return (
    Array.isArray(value) &&
    value.every(
      (v) => v && typeof v.title === "string" && typeof v.url === "string",
    )
  );
}

export function parseHeader(markdown: string): ProjectHeader {
  const { header } = splitHeader(markdown);
  const data = header ? parseYaml(header) : undefined;
  if (!isStringList(data?.technologies)) {
    throw new Error("header needs a 'technologies' list of strings");
  }
  const links = data.links ?? [];
  if (!isLinkList(links)) {
    throw new Error("header 'links' must be a list of { title, url }");
  }
  return { technologies: data.technologies, links };
}

export function parseText(markdown: string): ProjectText {
  const lines = splitHeader(markdown).rest.split(/\r?\n/);
  const titleIndex = lines.findIndex((line) => line.startsWith("# "));
  if (titleIndex === -1) throw new Error("no '# ' title found");

  const blocks = lines
    .slice(titleIndex + 1)
    .join("\n")
    .trim()
    .split(/\n\s*\n/);
  return {
    title: lines[titleIndex].slice(2).trim(),
    description: (blocks[0] ?? "").trim(),
    body: blocks.slice(1).join("\n\n").trim(),
  };
}

const TARGETS =
  /!?\[[^\]]*\]\(\s*<?([^)\s>]+)|\b(?:src|href)\s*=\s*["']([^"']+)/g;

export function findBadPaths(body: string): string[] {
  const bad: string[] = [];
  for (const match of body.matchAll(TARGETS)) {
    const target = match[1] ?? match[2];
    if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith("#")) {
      continue;
    }
    if (
      target.startsWith("/") ||
      target.startsWith("..") ||
      target.includes("/../")
    ) {
      bad.push(target);
    }
  }
  return bad;
}

export function pickLocaleFile(
  files: Record<"en" | "es" | "jp", string | undefined>,
  lang: "en" | "es" | "ja",
): string {
  const file = files[lang === "ja" ? "jp" : lang] ?? files.en;
  if (file === undefined) throw new Error("project-en.md is missing");
  return file;
}
