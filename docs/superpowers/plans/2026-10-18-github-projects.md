# Projects from GitHub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the project list, home page cards and details pages from each GitHub repo's `docs/showcase/` folder, and ship a skill that creates that folder in a repo.

**Architecture:** A custom Astro content loader lists Ayano's repos with a GitHub token at build time, keeps the ones with the `portfolio-tracker` topic, downloads each `docs/showcase/` folder into a local cache, and fills two collections: `projects` (one entry per repo) and `projectDetails` (one rendered write-up per repo and language). Pure rules (Markdown parsing, media naming, home page selection) live in small tested modules. A weekly GitHub Action calls a Vercel deploy hook.

**Tech Stack:** Astro 7 content layer, `astro:assets`, Tailwind 4, Vitest (new, for the pure modules), `yaml` (new, for the Markdown header), GitHub REST API, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-10-18-github-projects-design.md`

## Global Constraints

- Topics: `portfolio-highlight`, `portfolio-big-highlight`. Owner: `AyanoNK`. A repo is on the site when the token can see it and it has `docs/showcase/`; no `portfolio-tracker` topic (changed mid-run, see spec).
- Folder: `docs/showcase/` on the repo's default branch. Files: `project-en.md` (required), `project-es.md`, `project-jp.md` (`jp` maps to locale `ja`; missing file falls back to `en`).
- Named media: `cover.*`, `portfolio-highlight.*`, `portfolio-big-highlight.*`. Every other picture or video is a carousel item, sorted by file name.
- Picture extensions: `png`, `jpg`, `jpeg`, `webp`, `gif`, `avif`. Video extensions: `webm`, `mp4`.
- "Newest" means the repo's GitHub `created_at`, newest first, everywhere.
- Home page: one big card and at most three small cards. Empty spots are hidden, never a build error.
- Project address: `/<lang>/projects/<repo name>/`. List page: `/<lang>/projects/`.
- Nothing outside `docs/showcase/` of a repo reaches the built site. No link to a private repo.
- No changes, commits, PRs or topic edits in any repo other than this one. The skill test leaves its files uncommitted in `/Users/ayano/melodia-stereo-bogota`.
- Commits: one logical change each, lowercase imperative like the existing history, no `Co-Authored-By` or any AI mention.
- Before the PR: `pnpm check`, `pnpm build`, `pnpm exec prettier --check src` pass; run `/astro-dev:astro-review` and `/astro-dev:astro-code-review` as in `CLAUDE.md`.

## Review Focus

- A write-up with `![](../../src/screenshot.png)` or `[code](../src/main.ts)`: the build stops with an error naming the repo and path (Task 2 test `rejects relative paths outside showcase`).
- A tracked repo with `portfolio-highlight` but no `portfolio-highlight.*` file: the card shows without media and the build logs a warning naming the repo (Task 3 test `card media missing is undefined`).
- Two repos with `portfolio-big-highlight`: the newer one gets the big card, the older one is a small card only if it also has `portfolio-highlight` (Task 3 test `older big highlight drops out`).
- A user with more than 100 repos: the GitHub listing follows pagination and does not miss tracked repos (Task 4 test `follows pagination`).
- A repo with only `project-en.md`: Spanish and Japanese pages show the English text instead of failing (Task 2 test `falls back to english`).

---

### Task 1: Bootstrap skill

**Files:**
- Create: `~/.claude/skills/portfolio-showcase/SKILL.md` (and any helper files skill-creator suggests)
- Test run in: `/Users/ayano/melodia-stereo-bogota` (files stay uncommitted)

No changes in this repo. This task follows `/skill-creator`'s own process instead of the test-first steps below.

- [ ] **Step 1: Run `/skill-creator`** with this brief, taken from the spec's "Bootstrap skill" section:
  - Name `portfolio-showcase`. Triggers on "set up the portfolio showcase", "bootstrap showcase files", "add this repo to my portfolio".
  - Reads README, the package manifest and the code to learn what the project is and which tools it uses.
  - Writes `docs/showcase/project-en.md`, `project-es.md`, `project-jp.md` in the exact format in the spec ("The `project-xy.md` files"): YAML header with `technologies` and optional `links` only in the `en` file; `#` title; one short-description paragraph; then the write-up. Spanish and Japanese are translations of the English file.
  - Lists the media still missing (`cover.*`, `portfolio-highlight.*`, `portfolio-big-highlight.*`, carousel items named `01-...`, `02-...`) and copies in files the user points to. Never invents pictures.
  - Write-up pictures must be relative paths inside `docs/showcase/`.
  - Prints the `gh repo edit <owner>/<repo> --add-topic portfolio-tracker` command (plus the highlight topics if asked). Never sets topics, commits or pushes unless told to.
  - If `docs/showcase/` exists, fills only missing files and never overwrites.
  - Plain language, no emojis, no AI mention in the files it writes.

- [ ] **Step 2: Run the skill in `/Users/ayano/melodia-stereo-bogota`**

Expected: `docs/showcase/project-en.md`, `project-es.md`, `project-jp.md` exist; `git -C /Users/ayano/melodia-stereo-bogota status --short` shows only `docs/showcase/` added (plus the untracked files already there: `.claude/`, `.wrangler/`); nothing committed; topics unchanged (`gh repo view AyanoNK/melodia-stereo-bogota --json repositoryTopics` still shows only `radio`).

- [ ] **Step 3: Check the output against the format**

The `en` header parses as YAML with a `technologies` list; each file has exactly one `#` title followed by one paragraph; the missing-media list and the topic command were printed. Fix the skill and rerun on a clean copy (delete the generated `docs/showcase/` first) until it passes.

- [ ] **Step 4: Run it a second time in the same repo**

Expected: it reports the files exist and changes nothing (`git diff --stat` on those files is empty, file times unchanged).

---

### Task 2: Markdown parsing

**Files:**
- Modify: `package.json` (add `vitest`, `yaml`; script `"test": "vitest run"`)
- Modify: `CLAUDE.md` (Commands: add `pnpm test`; replace "There is no test suite" with "Vitest covers `src/lib/showcase/`.")
- Create: `src/lib/showcase/parse.ts`
- Test: `src/lib/showcase/parse.test.ts`

**Interfaces:**
- Produces:
  - `type ProjectLink = { title: string; url: string }`
  - `type ProjectHeader = { technologies: string[]; links: ProjectLink[] }`
  - `type ProjectText = { title: string; description: string; body: string }`
  - `parseHeader(markdown: string): ProjectHeader` — throws if `technologies` is missing or not a list of strings.
  - `parseText(markdown: string): ProjectText` — header stripped; `title` from the first `# ` line; `description` is the first paragraph after it; `body` is the rest, trimmed. Throws if there is no `# ` title.
  - `findBadPaths(body: string): string[]` — every relative picture or link target (Markdown `![](x)`, `[](x)`, and HTML `src="x"`/`href="x"`) that would leave the folder: starts with `/` or `..`, or contains `/../`. Absolute `http(s):`, `mailto:` and `#anchor` targets are ignored.
  - `pickLocaleFile(files: Record<"en" | "es" | "jp", string | undefined>, lang: "en" | "es" | "ja"): string` — returns the file for `lang` (`ja` reads `jp`), else `en`.

- [ ] **Step 1: Write the failing tests**

```ts
const sample = `---
technologies: [Kotlin, Jetpack Compose]
links:
  - title: Play Store (soon)
    url: "#"
---

# Bank SMS Manager

Reads bank SMS messages to track spending.

## How it works

Details here.`;

test("parses header", () => {
  expect(parseHeader(sample)).toEqual({
    technologies: ["Kotlin", "Jetpack Compose"],
    links: [{ title: "Play Store (soon)", url: "#" }],
  });
});
test("links default to empty", () => {
  expect(parseHeader("---\ntechnologies: [A]\n---\n# T\n\nD").links).toEqual([]);
});
test("missing technologies throws", () => {
  expect(() => parseHeader("# T\n\nD")).toThrow(/technologies/);
});
test("splits title, description and body", () => {
  expect(parseText(sample)).toEqual({
    title: "Bank SMS Manager",
    description: "Reads bank SMS messages to track spending.",
    body: "## How it works\n\nDetails here.",
  });
});
test("missing title throws", () => {
  expect(() => parseText("no title here")).toThrow(/title/);
});
test("rejects relative paths outside showcase", () => {
  expect(
    findBadPaths("![a](../../src/x.png) [b](../src/main.ts) <img src=\"/etc/y.png\">"),
  ).toEqual(["../../src/x.png", "../src/main.ts", "/etc/y.png"]);
});
test("allows paths inside showcase and absolute urls", () => {
  expect(
    findBadPaths("![a](01-login.png) ![b](./shots/2.png) [c](https://x.dev) [d](#top)"),
  ).toEqual([]);
});
test("falls back to english", () => {
  expect(pickLocaleFile({ en: "EN", es: undefined, jp: undefined }, "ja")).toBe("EN");
  expect(pickLocaleFile({ en: "EN", es: "ES", jp: "JP" }, "ja")).toBe("JP");
});
```

- [ ] **Step 2: Run** `pnpm test src/lib/showcase/parse.test.ts` — Expected: FAIL, module not found.
- [ ] **Step 3: Implement `src/lib/showcase/parse.ts`** with the signatures above. Header is the `---` block at the very top, parsed with `yaml`.
- [ ] **Step 4: Run** `pnpm test src/lib/showcase/parse.test.ts` — Expected: PASS. Then `pnpm check` passes.
- [ ] **Step 5: Commit** `git commit -m "add showcase markdown parsing with vitest"`

---

### Task 3: Media naming and home page selection

**Files:**
- Create: `src/lib/showcase/media.ts`, `src/lib/showcase/select.ts`
- Test: `src/lib/showcase/media.test.ts`, `src/lib/showcase/select.test.ts`

**Interfaces:**
- Produces in `media.ts`:
  - `type MediaKind = "image" | "video"`
  - `mediaKind(fileName: string): MediaKind | undefined` — by extension from Global Constraints, case-insensitive.
  - `type ShowcaseMedia = { cover?: string; highlight?: string; bigHighlight?: string; carousel: string[] }` (file names)
  - `sortMedia(fileNames: string[]): ShowcaseMedia` — named files matched by base name (`cover`, `portfolio-highlight`, `portfolio-big-highlight`); non-media files (`.md` etc.) ignored; carousel sorted by `localeCompare` with `{ numeric: true }`.
- Produces in `select.ts`:
  - `type Selectable = { id: string; createdAt: Date; highlight: boolean; bigHighlight: boolean }`
  - `newestFirst<T extends Selectable>(items: T[]): T[]`
  - `selectHome<T extends Selectable>(items: T[]): { featured?: T; small: T[] }` — `featured` = newest with `bigHighlight`, else newest with `highlight`; `small` = the three newest with `highlight`, excluding `featured`.

- [ ] **Step 1: Write the failing tests**

```ts
// media.test.ts
test("sorts named files and carousel", () => {
  expect(
    sortMedia(["project-en.md", "10-end.mp4", "cover.webp", "2-mid.png",
      "portfolio-highlight.PNG", "portfolio-big-highlight.webm", "notes.txt"]),
  ).toEqual({
    cover: "cover.webp",
    highlight: "portfolio-highlight.PNG",
    bigHighlight: "portfolio-big-highlight.webm",
    carousel: ["2-mid.png", "10-end.mp4"],
  });
});
test("card media missing is undefined", () => {
  expect(sortMedia(["project-en.md"]).highlight).toBeUndefined();
});
test("detects kind", () => {
  expect(mediaKind("a.MP4")).toBe("video");
  expect(mediaKind("a.avif")).toBe("image");
  expect(mediaKind("a.md")).toBeUndefined();
});

// select.test.ts
const r = (id: string, day: number, highlight = false, bigHighlight = false) =>
  ({ id, createdAt: new Date(2026, 0, day), highlight, bigHighlight });

test("newest big highlight wins", () => {
  const items = [r("old", 1, true, true), r("new", 5, false, true), r("h", 3, true)];
  expect(selectHome(items).featured?.id).toBe("new");
});
test("older big highlight drops out", () => {
  const items = [r("oldBigOnly", 1, false, true), r("new", 5, false, true), r("h", 3, true)];
  expect(selectHome(items).small.map((x) => x.id)).toEqual(["h"]);
});
test("falls back to newest highlight for featured", () => {
  const { featured, small } = selectHome([r("a", 1, true), r("b", 2, true)]);
  expect(featured?.id).toBe("b");
  expect(small.map((x) => x.id)).toEqual(["a"]);
});
test("at most three small cards, newest first", () => {
  const items = [1, 2, 3, 4, 5].map((d) => r(`h${d}`, d, true)).concat(r("big", 9, false, true));
  expect(selectHome(items).small.map((x) => x.id)).toEqual(["h5", "h4", "h3"]);
});
test("no highlights gives nothing", () => {
  expect(selectHome([r("a", 1)])).toEqual({ featured: undefined, small: [] });
});
```

- [ ] **Step 2: Run** `pnpm test src/lib/showcase` — Expected: FAIL for the two new files.
- [ ] **Step 3: Implement `media.ts` and `select.ts`** with the signatures above.
- [ ] **Step 4: Run** `pnpm test` — Expected: all PASS.
- [ ] **Step 5: Commit** `git commit -m "add showcase media naming and home page selection rules"`

---

### Task 4: GitHub loader and collections

**Files:**
- Create: `src/lib/showcase/github.ts`, `src/lib/showcase/loader.ts`
- Test: `src/lib/showcase/github.test.ts`
- Modify: `src/content.config.ts`, `astro.config.mjs` (env), `.gitignore` (`.showcase-cache/`, `public/showcase/`)
- Modify: `src/lib/projects.ts` (new `getProjects`, same import path for callers)

**Interfaces:**
- Consumes: Task 2 `parseHeader`, `parseText`, `findBadPaths`, `pickLocaleFile`; Task 3 `sortMedia`, `mediaKind`, `newestFirst`.
- Produces in `github.ts`:
  - `const SHOWCASE_OWNER = "AyanoNK"`, `const SHOWCASE_DIR = "docs/showcase"`
  - `type TrackedRepo = { name: string; createdAt: Date; isPrivate: boolean; url: string; defaultBranch: string; highlight: boolean; bigHighlight: boolean }`
  - `listTrackedRepos(token: string, fetchFn = fetch): Promise<TrackedRepo[]>` — `GET https://api.github.com/user/repos?affiliation=owner&per_page=100`, follows `Link: rel="next"`, keeps `owner.login === SHOWCASE_OWNER` with topic `portfolio-tracker`. Throws with the HTTP status on any non-2xx.
  - `downloadShowcase(token: string, repo: TrackedRepo, destDir: string, fetchFn = fetch): Promise<string[]>` — lists `SHOWCASE_DIR` (recursively for subfolders) through the contents API at `defaultBranch`, writes each file under `destDir` with `Accept: application/vnd.github.raw`, returns the relative file paths. A 404 for the folder throws `"<repo>: docs/showcase not found"`.
- Produces in `content.config.ts`:
  - Collection `projects`, id = repo name, data:
    ```ts
    {
      createdAt: Date; isPrivate: boolean; url: string;
      highlight: boolean; bigHighlight: boolean;
      technologies: string[]; links: { title: string; url: string }[];
      text: Record<"en" | "es" | "ja", { title: string; description: string }>;
      cover?: Media; highlightMedia?: Media; bigHighlightMedia?: Media; carousel: Media[];
    }
    // Media = { kind: "image"; src: ImageMetadata } | { kind: "video"; src: string }
    ```
  - Collection `projectDetails`, id = `<lang>/<repo>`, rendered write-up (`body` from `parseText` of the locale's file).
- Produces in `src/lib/projects.ts`: `getProjects(): Promise<CollectionEntry<"projects">[]>` sorted with `newestFirst`.

- [ ] **Step 1: Write the failing tests** for `listTrackedRepos` with a fake `fetchFn`:

```ts
test("keeps owned repos with the tracker topic", async () => {
  const fetchFn = fakeFetch([[
    repo("a", ["portfolio-tracker", "portfolio-highlight"]),
    repo("b", ["radio"]),
    repo("c", ["portfolio-tracker"], "someone-else"),
  ]]);
  const repos = await listTrackedRepos("t", fetchFn);
  expect(repos.map((x) => [x.name, x.highlight, x.bigHighlight])).toEqual([["a", true, false]]);
});
test("follows pagination", async () => {
  const fetchFn = fakeFetch([[repo("a", ["portfolio-tracker"])], [repo("b", ["portfolio-tracker"])]]);
  expect((await listTrackedRepos("t", fetchFn)).map((x) => x.name)).toEqual(["a", "b"]);
});
test("throws on http error", async () => {
  await expect(listTrackedRepos("t", async () => new Response("", { status: 401 }))).rejects.toThrow(/401/);
});
test("sends the token", async () => {
  // assert the Authorization header is "Bearer t"
});
```
`fakeFetch(pages)` returns page `i` and sets `Link: <...page=i+2>; rel="next"` on all but the last; `repo(name, topics, owner = "AyanoNK")` builds the minimal API object (`name`, `topics`, `owner.login`, `private`, `html_url`, `created_at`, `default_branch`).

- [ ] **Step 2: Run** `pnpm test src/lib/showcase/github.test.ts` — Expected: FAIL.
- [ ] **Step 3: Implement `github.ts`** with the signatures above.
- [ ] **Step 4: Run** `pnpm test` — Expected: PASS.
- [ ] **Step 5: Add the env var** `SHOWCASE_GITHUB_TOKEN` to `env.schema` in `astro.config.mjs` as `envField.string({ context: "server", access: "secret" })`. Add it to the local `.env` (ask Ayano for a fine-grained token: all repos, read-only Contents and Metadata).
- [ ] **Step 6: Implement `loader.ts`**: `showcaseLoader(): { projects: Loader; projectDetails: Loader }` sharing one memoized fetch per build. For each repo: download into `.showcase-cache/<repo>/`; copy videos into `public/showcase/<repo>/` and refer to them as `/showcase/<repo>/<file>`; pictures stay in the cache and go through the schema's `image()` (set the entry's `filePath` to `.showcase-cache/<repo>/project-en.md` so relative image paths resolve); render write-ups with `renderMarkdown(body, { fileURL })` pointing at the cached locale file so write-up pictures go through `astro:assets`. Throw `"<repo>: <path> points outside docs/showcase"` for each `findBadPaths` hit. `logger.warn` when a highlight topic has no matching media file. Read the token with `getSecret("SHOWCASE_GITHUB_TOKEN")` from `astro:env/server`; if that import is not available inside `content.config.ts`, use Vite's `loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "")` instead and note it in the commit message.
- [ ] **Step 7: Wire `content.config.ts`** to the two loaders with the schema above; rewrite `src/lib/projects.ts`.
- [ ] **Step 8: Verify against GitHub.** Run `pnpm astro sync`. Expected: no errors; `.showcase-cache/` contains a folder per tracked repo. This needs at least one repo with `portfolio-tracker` and a pushed `docs/showcase/`. If none exists yet, stop and ask Ayano to push one (for example `melodia-stereo-bogota` with the Task 1 output) and add the topic; do not do it yourself. Pages still use the old fields at this point, so `pnpm build` is checked in Task 5.
- [ ] **Step 9: Commit** `git commit -m "load projects from github showcase folders"`

---

### Task 5: Details page with carousel

**Files:**
- Create: `src/components/Carousel.astro`, `src/components/ShowcaseMedia.astro`
- Modify: `src/modules/ProjectDetailShared.astro`, `src/pages/[lang]/projects/[slug].astro`, `astro.config.mjs` (redirects)

**Interfaces:**
- Consumes: Task 4 `projects` / `projectDetails` collections and `getProjects()`.
- Produces: `ShowcaseMedia.astro` props `{ media: Media; alt: string; class?: string; priority?: boolean }` — `<Image>` for pictures, `<video autoplay muted loop playsinline>` for videos. `Carousel.astro` props `{ items: Media[]; alt: string }` — horizontal CSS scroll-snap row, no JavaScript; renders nothing for an empty list.

- [ ] **Step 1: Build `ShowcaseMedia.astro` and `Carousel.astro`.**
- [ ] **Step 2: Rewrite `ProjectDetailShared.astro`** in the spec's order: cover, title, badges, write-up, links (GitHub button only when `!isPrivate`, then header `links`), carousel. Title and description from `project.data.text[lang]`.
- [ ] **Step 3: Update `[slug].astro`** to read `text[lang]` for `<title>`/description and `getEntry("projectDetails", \`${lang}/${project.id}\`)`.
- [ ] **Step 4: Add redirects** in `astro.config.mjs`, built from `{ bank: "bank-sms-manager", kimon: "kanji-lyrics-frontend", atlapetes: "atlapetes-blancae" }` × `locales`: `"/<lang>/projects/<old>": "/<lang>/projects/<new>"`.
- [ ] **Step 5: Verify.** `pnpm build` passes; `dist/en/projects/<repo>/index.html` exists for each tracked repo; a private repo's page has no `github.com` link; `dist/en/projects/bank/index.html` is a redirect to `/en/projects/bank-sms-manager`. Open one page with `pnpm preview` and check the carousel scrolls.
- [ ] **Step 6: Commit** `git commit -m "build project details pages from showcase data"`

---

### Task 6: Home cards and projects list page

**Files:**
- Create: `src/components/ProjectCard.astro`, `src/pages/[lang]/projects/index.astro`
- Modify: `src/sections/ProjectSection.astro`, `src/i18n/index/projects.ts`

**Interfaces:**
- Consumes: Task 3 `selectHome`; Task 4 `getProjects()`; Task 5 `ShowcaseMedia.astro`.
- Produces: `ProjectCard.astro` props `{ project: CollectionEntry<"projects"> }` — the current small card markup, media = `highlightMedia`.

- [ ] **Step 1: Add translation keys** under `index.projects`: `see_all` (en "See all projects", es "Ver todos los proyectos", ja "すべてのプロジェクトを見る"), `all_title` (en "All projects", es "Todos los proyectos", ja "すべてのプロジェクト"), `all_description` (en "Everything I have built, newest first.", es "Todo lo que he construido, del más reciente al más antiguo.", ja "これまでに作ったもの（新しい順）。").
- [ ] **Step 2: Extract `ProjectCard.astro`** from the small card in `ProjectSection.astro`.
- [ ] **Step 3: Rewrite `ProjectSection.astro`** to use `selectHome(await getProjects())`: big card when `featured` exists (media `bigHighlightMedia ?? highlightMedia`), then `small` as `ProjectCard`s, then a `see_all` link to `getRelativeLocaleUrl(lang, "projects")`. Remove the `isFeatured` throw.
- [ ] **Step 4: Create the list page** with `getStaticPaths` over `locales` (same pattern as `[slug].astro`), `ProjectLayout` with `all_title`/`all_description`, and a grid of `ProjectCard` for every project from `getProjects()`.
- [ ] **Step 5: Verify.** `pnpm build` passes; `dist/{en,es,ja}/projects/index.html` exist; the home page shows at most four cards; the `es` home page shows the Spanish titles. `pnpm check` and `pnpm exec prettier --check src` pass.
- [ ] **Step 6: Commit** `git commit -m "add projects list page and build home cards from showcase topics"`

---

### Task 7: Weekly rebuild

**Files:**
- Create: `.github/workflows/weekly-rebuild.yml`

- [ ] **Step 1: Write the workflow**: triggers `schedule: - cron: "0 6 * * 1"` (Mondays 06:00 UTC) and `workflow_dispatch`; one job on `ubuntu-latest` that runs `curl -fsS -X POST "$VERCEL_DEPLOY_HOOK"` with `VERCEL_DEPLOY_HOOK: ${{ secrets.VERCEL_DEPLOY_HOOK }}`.
- [ ] **Step 2: Verify** the YAML parses: `pnpm dlx yaml-lint .github/workflows/weekly-rebuild.yml` (or `python3 -c "import yaml,sys; yaml.safe_load(open(sys.argv[1]))" .github/workflows/weekly-rebuild.yml`). Expected: no error.
- [ ] **Step 3: Commit** `git commit -m "add weekly rebuild workflow"`
- [ ] **Step 4: Tell Ayano** to create the Vercel deploy hook, add it as the `VERCEL_DEPLOY_HOOK` repo secret, and add `SHOWCASE_GITHUB_TOKEN` to the Vercel project.

---

### Task 8: Open the PR

- [ ] **Step 1:** `pnpm test`, `pnpm check`, `pnpm build`, `pnpm exec prettier --check src` all pass.
- [ ] **Step 2:** Run `/astro-dev:astro-review`; fix every FAIL this branch introduced.
- [ ] **Step 3:** Open the PR against `main`; description reports the command results and both reviews, and states it must not merge until the four repos have `docs/showcase/` and topics. Run `/astro-dev:astro-code-review` and fix findings in the same PR.

---

### Task 9: Remove the old project files (separate PR, after Task 8 merges)

**Files:**
- Remove: `src/content/projects.json`, `src/content/projects/`, `src/assets/projects/`, `public/webm/`, the per-project keys (`bank`, `kimon`, `atlapetes`, `poshaus`) in `src/i18n/index/projects.ts`
- Modify: `CLAUDE.md` (Content section describes the GitHub loader and topics instead of `projects.json`)

- [ ] **Step 1:** Branch from the latest `origin/main`; delete the files; `grep -rn "projects.json\|webm/\|mini_" src` returns nothing.
- [ ] **Step 2:** `pnpm check`, `pnpm build`, `pnpm exec prettier --check src` pass, and the home page still shows the four projects (now from GitHub).
- [ ] **Step 3: Commit** `git commit -m "remove hand-written project data"`, then the same review and PR steps as Task 8.
