import { copyFile, mkdir, readFile, rm } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { Loader, LoaderContext } from "astro/loaders";
import { getSecret } from "astro:env/server";
import {
  downloadShowcase,
  listShowcaseRepos,
  type ShowcaseRepo,
} from "./github";
import { mediaKind, sortMedia, type ShowcaseMedia } from "./media";
import {
  findBadPaths,
  parseHeader,
  parseText,
  pickLocaleFile,
  type ProjectHeader,
} from "./parse";

const CACHE_DIR = ".showcase-cache";
const PUBLIC_DIR = "public/showcase";
const LANGS = ["en", "es", "ja"] as const;

type LocaleFiles = Record<"en" | "es" | "jp", string | undefined>;

type LoadedRepo = {
  repo: ShowcaseRepo;
  dir: string;
  files: LocaleFiles;
  header: ProjectHeader;
  media: ShowcaseMedia;
};

let loading: Promise<LoadedRepo[]> | undefined;

async function readOptional(path: string): Promise<string | undefined> {
  try {
    return await readFile(path, "utf-8");
  } catch {
    return undefined;
  }
}

async function loadRepo(
  token: string,
  repo: ShowcaseRepo,
  logger: LoaderContext["logger"],
): Promise<LoadedRepo | undefined> {
  const dir = join(CACHE_DIR, repo.name);
  const fileNames = await downloadShowcase(token, repo, dir);
  if (!fileNames) {
    logger.debug(`${repo.name}: no docs/showcase folder, skipped`);
    return undefined;
  }

  const files: LocaleFiles = {
    en: await readOptional(join(dir, "project-en.md")),
    es: await readOptional(join(dir, "project-es.md")),
    jp: await readOptional(join(dir, "project-jp.md")),
  };
  if (files.en === undefined) {
    throw new Error(`${repo.name}: docs/showcase/project-en.md not found`);
  }
  for (const markdown of Object.values(files)) {
    for (const path of findBadPaths(markdown ?? "")) {
      throw new Error(`${repo.name}: ${path} points outside docs/showcase`);
    }
  }

  const media = sortMedia(fileNames);
  if (repo.highlight && !media.highlight) {
    logger.warn(`${repo.name}: has portfolio-highlight but no media file`);
  }
  if (repo.bigHighlight && !media.bigHighlight) {
    logger.warn(`${repo.name}: has portfolio-big-highlight but no media file`);
  }

  const videos = fileNames.filter((name) => mediaKind(name) === "video");
  for (const name of videos) {
    const target = join(PUBLIC_DIR, repo.name, name);
    await mkdir(join(target, ".."), { recursive: true });
    await copyFile(join(dir, name), target);
  }

  return {
    repo,
    dir,
    files,
    header: parseHeader(files.en),
    media,
  };
}

function loadAll(logger: LoaderContext["logger"]): Promise<LoadedRepo[]> {
  loading ??= (async () => {
    const token = getSecret("GITHUB_FINE_GRAINED_TOKEN");
    if (!token) throw new Error("GITHUB_FINE_GRAINED_TOKEN is not set");
    await rm(CACHE_DIR, { recursive: true, force: true });
    await rm(PUBLIC_DIR, { recursive: true, force: true });
    const repos = await listShowcaseRepos(token);
    const loaded = await Promise.all(
      repos.map((repo) => loadRepo(token, repo, logger)),
    );
    const found = loaded.filter((repo) => repo !== undefined);
    logger.info(`loaded ${found.length} of ${repos.length} repos`);
    return found;
  })();
  return loading;
}

function toMedia(repo: string, fileName: string | undefined) {
  if (!fileName) return undefined;
  return mediaKind(fileName) === "video"
    ? { kind: "video", src: `/showcase/${repo}/${fileName}` }
    : { kind: "image", src: `./${fileName}` };
}

export function projectsLoader(): Loader {
  return {
    name: "showcase-projects",
    load: async ({ store, parseData, logger }) => {
      const loaded = await loadAll(logger);
      store.clear();
      for (const { repo, dir, files, header, media } of loaded) {
        const text = Object.fromEntries(
          LANGS.map((lang) => {
            const { title, description } = parseText(
              pickLocaleFile(files, lang),
            );
            return [lang, { title, description }];
          }),
        );
        const filePath = join(dir, "project-en.md");
        const data = await parseData({
          id: repo.name,
          filePath,
          data: {
            createdAt: repo.createdAt,
            isPrivate: repo.isPrivate,
            url: repo.url,
            highlight: repo.highlight,
            bigHighlight: repo.bigHighlight,
            technologies: header.technologies,
            links: header.links,
            text,
            cover: toMedia(repo.name, media.cover),
            highlightMedia: toMedia(repo.name, media.highlight),
            bigHighlightMedia: toMedia(repo.name, media.bigHighlight),
            carousel: media.carousel.map((name) => toMedia(repo.name, name)),
          },
        });
        store.set({ id: repo.name, data, filePath });
      }
    },
  };
}

export function projectDetailsLoader(): Loader {
  return {
    name: "showcase-project-details",
    load: async ({ store, logger, renderMarkdown }) => {
      const loaded = await loadAll(logger);
      store.clear();
      for (const { repo, dir, files } of loaded) {
        for (const lang of LANGS) {
          const fileName = files[lang === "ja" ? "jp" : lang]
            ? `project-${lang === "ja" ? "jp" : lang}.md`
            : "project-en.md";
          const filePath = join(dir, fileName);
          const { body } = parseText(pickLocaleFile(files, lang));
          const rendered = await renderMarkdown(body, {
            fileURL: pathToFileURL(resolve(filePath)),
          });
          store.set({
            id: `${lang}/${repo.name}`,
            data: {},
            body,
            filePath,
            rendered,
            // Without this, Astro does not process the write-up's pictures.
            assetImports: rendered.metadata?.imagePaths,
          });
        }
      }
    },
  };
}
