# Experience Pages Implementation Plan

> **Replaced** by `docs/superpowers/plans/2026-11-15-experience-company-pages.md`. This plan built one page per client, which was changed to one page per employer.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the long home page experience section with short company cards, a list page of every client experience, and one page per experience, all in `en`, `es` and `ja`.

**Architecture:** Experience content lives in `src/content/experience/` as one `companies.yaml`, plus one folder per experience with a `meta.yaml` and `en.md`, `es.md`, `ja.md`. Three Astro content collections read them. Small pure helpers in `src/lib/experience/` format dates, check that translations and references are complete, and group experiences by company. A loader function runs the check and throws, so any gap fails the build.

**Tech Stack:** Astro 7 content collections (`glob` and `file` loaders from `astro/loaders`), Zod from `astro/zod`, Vitest, Tailwind 4, oxfmt.

**Spec:** `docs/superpowers/specs/2026-11-14-experience-pages-design.md`

## Global Constraints

- Work in the worktree `/Users/ayano/ayano.dev-experience` on branch `experience-pages`. Never push to `main`.
- Commit author is the existing git config (`s.correa.wilches@gmail.com`). No `Co-Authored-By` trailer and no mention of AI tooling in commits, PR title or PR body.
- No emojis anywhere.
- Commit messages: lower-case imperative, like the history ("show home page project cards in two columns").
- Every `{ en, es, ja }` field is required. A missing language fails the build.
- Facts that do not change with language (dates, technologies, links, order, home flag) live only in `meta.yaml` or `companies.yaml`.
- Dates are `YYYY-MM` strings. A missing `end` means current work.
- Clients: private clients get only a description of size, region and industry. Public clients get the name plus the description ("Factcil, a Colombian fintech startup").
- When sources disagree, `/Users/ayano/ayano.dev/factored_cv.md` wins. `/Users/ayano/ayano.dev/CV_2026_2.txt` and today's site (`src/i18n/index/experience.ts` on `main`) only add what it lacks. No fact, number or tool that is in none of them.
- Writing style: follow `.claude/skills/add-experience/SKILL.md` Steps 2 and 3 (verbs first, every tool with its purpose, no dash asides, no "A, not B", Spanish first person past, Japanese polite form, tool names and numbers identical across languages).
- Before the PR: `pnpm check`, `pnpm build`, `pnpm test` and `pnpm exec oxfmt --check src` pass.
- Keep the `id="experience-section"` anchor on the home page.

## Review Focus

1. **A language file is missing or has a different number of highlights.** The build must fail and name the experience and language. Tested in Task 2.
2. **`meta.yaml` names a company or role id that does not exist** (typo such as `softserv`). The build must fail with the bad id. Tested in Task 2.
3. **A `.md` file exists for an experience with no `meta.yaml`** (folder renamed halfway). The build must fail. Tested in Task 2.
4. **Spanish month names come out lower-case** ("ago 2023") from `Intl`. Shown dates must start with a capital ("Ago 2023"). Tested in Task 1.
5. **An experience without its own dates.** It must show its role's dates, and current work must show the translated "Present". Tested in Tasks 1 and 3.

---

### Task 1: Date formatting

**Files:**
- Create: `src/lib/experience/dates.ts`
- Test: `src/lib/experience/dates.test.ts`

**Interfaces:**
- Consumes: `Lang` from `src/i18n/ui.ts`.
- Produces: `formatMonth(month: string, lang: Lang): string` and `formatRange(start: string, end: string | undefined, lang: Lang, present: string): string`.

- [ ] **Step 1: Install dependencies in the worktree**

Run: `pnpm install`
Expected: finishes without errors. Copy `.env` from `/Users/ayano/ayano.dev/.env` into the worktree so builds can run later.

- [ ] **Step 2: Write the failing tests**

```ts
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
  expect(formatRange("2025-06", undefined, "en", "Present")).toBe("Jun 2025 - Present");
});

test("closed range", () => {
  expect(formatRange("2023-08", "2025-05", "es", "Actual")).toBe("Ago 2023 - May 2025");
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `pnpm test src/lib/experience/dates.test.ts`
Expected: FAIL, module not found.

- [ ] **Step 4: Implement both functions in `src/lib/experience/dates.ts`**

Use `Intl.DateTimeFormat(lang, { month: "short", year: "numeric", timeZone: "UTC" })` on `new Date(Date.UTC(year, month - 1, 1))`, then upper-case the first character.

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm test src/lib/experience/dates.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/experience/dates.ts src/lib/experience/dates.test.ts
git commit -m "add month formatting for experience dates"
```

### Task 2: Completeness check

**Files:**
- Create: `src/lib/experience/check.ts`
- Test: `src/lib/experience/check.test.ts`

**Interfaces:**
- Consumes: `locales` from `src/i18n/ui.ts`.
- Produces:

```ts
export interface CompanyRef { id: string; roles: { id: string }[] }
export interface ExperienceRef { id: string; company: string; role: string }
export interface DetailRef { id: string; highlights: string[] } // id is "<experience id>/<lang>"
export function checkExperiences(
  companies: CompanyRef[],
  experiences: ExperienceRef[],
  details: DetailRef[],
): string[]; // one plain-English message per problem, empty when all is well
```

- [ ] **Step 1: Write the failing tests**

Build a valid fixture (one company `acme` with role `dev`, one experience `acme-x`, three details with two highlights each) and assert:

```ts
test("valid data has no problems", () => {
  expect(checkExperiences(companies, experiences, details)).toEqual([]);
});
test("missing language file", () => {
  const out = checkExperiences(companies, experiences, details.filter((d) => d.id !== "acme-x/ja"));
  expect(out).toEqual(["acme-x: missing ja.md"]);
});
test("highlight counts differ", () => {
  // es has three highlights, en and ja two
  expect(out).toEqual(["acme-x: es.md has 3 highlights, en.md has 2"]);
});
test("unknown company", () => {
  expect(out).toEqual(['acme-x: unknown company "acmee"']);
});
test("unknown role", () => {
  expect(out).toEqual(['acme-x: unknown role "lead" in company "acme"']);
});
test("details without meta.yaml", () => {
  // an extra "ghost/en" detail
  expect(out).toEqual(["ghost: has en.md but no meta.yaml"]);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test src/lib/experience/check.test.ts`
Expected: FAIL, module not found.

- [ ] **Step 3: Implement `checkExperiences` in `src/lib/experience/check.ts`**

Highlight counts are compared against `en.md`. Messages use exactly the formats in the tests.

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test src/lib/experience/check.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/experience/check.ts src/lib/experience/check.test.ts
git commit -m "add check that every experience is complete in every language"
```

### Task 3: Grouping and date fallback

**Files:**
- Create: `src/lib/experience/group.ts`
- Test: `src/lib/experience/group.test.ts`

**Interfaces:**
- Produces:

```ts
export interface Role { id: string; start: string; end?: string }
export interface Company { id: string; order: number; roles: Role[] }
export interface Experience { id: string; company: string; role: string; order: number; start?: string; end?: string; home: boolean }
export function groupByCompany<C extends Company, E extends Experience>(
  companies: C[], experiences: E[],
): { company: C; experiences: E[] }[]; // companies by order ascending, experiences by order ascending
export function experienceDates(experience: Experience, company: Company): { start: string; end?: string };
```

- [ ] **Step 1: Write the failing tests**

```ts
test("companies and experiences come out in order", () => {
  // companies b(order 2), a(order 1); experiences a2(order 2), a1(order 1), b1
  expect(groupByCompany(companies, experiences).map((g) => [g.company.id, g.experiences.map((e) => e.id)]))
    .toEqual([["a", ["a1", "a2"]], ["b", ["b1"]]]);
});
test("a company with no experiences is left out", () => { /* company c with none */ });
test("experience without dates uses its role", () => {
  expect(experienceDates({ ...exp, start: undefined, end: undefined }, company))
    .toEqual({ start: "2025-06", end: undefined });
});
test("experience dates win over role dates", () => {
  expect(experienceDates({ ...exp, start: "2024-01", end: "2024-06" }, company))
    .toEqual({ start: "2024-01", end: "2024-06" });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test src/lib/experience/group.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement both functions in `src/lib/experience/group.ts`**

`experienceDates` uses the experience's own dates only when it has `start`. Otherwise it returns the role's `start` and `end`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test src/lib/experience/group.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/experience/group.ts src/lib/experience/group.test.ts
git commit -m "add grouping of experiences by company"
```

### Task 4: Collections, loader and the first experience

**Files:**
- Modify: `src/content.config.ts`
- Create: `src/lib/experience/data.ts`
- Create: `src/content/experience/companies.yaml`
- Create: `src/content/experience/geomedical-partera-vital/{meta.yaml,en.md,es.md,ja.md}`

**Interfaces:**
- Consumes: Tasks 1 to 3.
- Produces: collections `companies`, `experiences`, `experienceDetails`, and

```ts
export async function getExperienceData(lang: Lang): Promise<{
  groups: {
    company: CollectionEntry<"companies">["data"];
    experiences: {
      id: string;
      meta: CollectionEntry<"experiences">["data"];
      detail: CollectionEntry<"experienceDetails">;
      dates: string; // formatted with formatRange and the "present" label
    }[];
  }[];
}>;
```

`getExperienceData` loads the three collections, runs `checkExperiences` and throws `new Error("Experience content is incomplete:\n" + problems.join("\n"))` when there are problems, then groups with `groupByCompany` and keeps only the details for `lang`.

- [ ] **Step 1: Define the collections in `src/content.config.ts`**

- `companies`: `file("src/content/experience/companies.yaml")`. Schema: `id`, `name`, `url`, `order: number`, `location?: LocaleText`, `summary: LocaleText`, `technologies: string[]` (default `[]`), `roles: { id, title: LocaleText, start, end? }[]`, where `LocaleText = z.object({ en: z.string().min(1), es: z.string().min(1), ja: z.string().min(1) })` and months match `/^\d{4}-\d{2}$/`.
- `experiences`: `glob({ pattern: "*/meta.yaml", base: "src/content/experience", generateId: ({ entry }) => entry.split("/")[0] })`. Schema: `company`, `role`, `order: number`, `start?`, `end?`, `home: boolean` (default `false`), `technologies: string[]`, `links: { title: LocaleText, url }[]` (default `[]`).
- `experienceDetails`: `glob({ pattern: "*/{en,es,ja}.md", base: "src/content/experience", generateId: ({ entry }) => entry.replace(/\.md$/, "") })`. Schema: `title`, `client`, `summary` (non-empty strings), `highlights: z.array(z.string().min(1)).min(1).max(5)`.

- [ ] **Step 2: Write `companies.yaml` with all four companies**

| id | name | url | order | roles |
|---|---|---|---|---|
| `softserve` | SoftServe | https://www.softserveinc.com/ | 1 | `ai-engineer` AI Engineer 2025-06 to now; `senior-software-engineer` Senior Software Engineer 2023-08 to 2025-05 |
| `verblio` | Verblio | https://verblio.com/ | 2 | `senior-software-engineer` Senior Software Engineer 2022-08 to 2023-06 |
| `icomm` | I-Comm Solutions SAS | https://i-comm.co/ | 3 | `full-stack-engineer` Full Stack Software Engineer 2020-08 to 2022-08 |
| `geomedical` | Geomedical Health Group | https://geomedical.co/ | 4 | `tech-lead` Tech Lead 2020-09 to 2020-12 |

Locations from `CV_2026_2.txt` (SoftServe "Remote - Texas, US", Verblio "Remote - Colorado, US", I-Comm "Remote - Bogotá, Colombia"), none for Geomedical. Summaries: one or two sentences per company from the CV role descriptions. Role titles in `es` and `ja` reuse today's translations in `src/i18n/index/experience.ts` where they exist. `technologies`: the badges from today's `ExperienceSection.astro` (including the commented-out ones) that no experience lists after Tasks 4 to 6. Fill this field last, in Task 6.

- [ ] **Step 3: Write the Geomedical experience**

`meta.yaml`: `company: geomedical`, `role: tech-lead`, `order: 1`, `home: true`, technologies React Native, Flask, Google Cloud (the tools the text names), link "UNFPA article" to the URL in today's `ExperienceSection.astro`. Source: the Geomedical part of `factored_cv.md`, plus today's site text. Client: "UNFPA Colombia and DANE". Body headings: the client and the problem, what was built, results.

- [ ] **Step 4: Write `getExperienceData` in `src/lib/experience/data.ts`**

- [ ] **Step 5: Verify the build reads the content**

Run: `pnpm check && pnpm build`
Expected: both pass. No page calls `getExperienceData` yet. Task 7 tests that a missing file fails the build.

- [ ] **Step 6: Commit**

```bash
git add src/content.config.ts src/lib/experience/data.ts src/content/experience
git commit -m "add experience content collections with the geomedical experience"
```

### Task 5: Verblio and I-Comm experiences

**Files:**
- Create: `src/content/experience/verblio-platform/{meta.yaml,en.md,es.md,ja.md}`
- Create: `src/content/experience/icomm-factcil/{meta.yaml,en.md,es.md,ja.md}`

- [ ] **Step 1: Write `verblio-platform`**

`company: verblio`, `role: senior-software-engineer`, `order: 1`, `home: true`. Technologies: Ruby on Rails, Angular, PostgreSQL, Heroku. Link "Verblio App" to https://app.verblio.com/. Client: "Verblio, a US content marketing platform". Highlights and body cover all of these, each a separate result:
- moved 70% of customers into the new business line
- fraud detection with behavioral and rule-based detection, 95% fewer active fraudulent accounts
- documented price list and in-app credit processes, 50% fewer questions to the team
- automated a platform workflow, 50% less administrator access needed in specific cases
- new solutions in legacy code without breaking existing features

- [ ] **Step 2: Write `icomm-factcil`**

`company: icomm`, `role: full-stack-engineer`, `order: 1`, `home: true`. Technologies: Django, React, AWS, GitHub Actions, Stripe, Figma. Link "Factcil" to https://www.factcil.com/. Client: "Factcil, a Colombian fintech startup". Source: the I-Comm part of `factored_cv.md` (100% billing automation with electronic invoicing, subscriptions with Stripe, 50% of the landing page).

- [ ] **Step 3: Verify**

Run: `pnpm build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/content/experience/verblio-platform src/content/experience/icomm-factcil
git commit -m "add verblio and i-comm experiences"
```

### Task 6: SoftServe experiences

**Files:**
- Create: one folder per row below, each with `meta.yaml`, `en.md`, `es.md`, `ja.md`
- Modify: `src/content/experience/companies.yaml` (company `technologies`)

Before starting, get the role of `softserve-ai-orchestrator` and `softserve-cost-dashboard` from Sebastian (`ai-engineer` from June 2025, `senior-software-engineer` before). The check in Task 2 rejects a missing role.

| Slug | Role | order | home | Client | Source in `factored_cv.md` |
|---|---|---|---|---|---|
| `softserve-energy-agents` | `ai-engineer` | 1 | true | A Fortune 500 US energy company | ticketing agents bullet and its two sub-bullets |
| `softserve-aws-oil-gas` | `ai-engineer` | 2 | true | Amazon Web Services | oil and gas bullet and its three sub-bullets |
| `softserve-gcp-savings` | `ai-engineer` | 3 | false | SoftServe (internal) | Committed Use Discounts bullet |
| `softserve-ai-orchestrator` | from Sebastian | 4 | false | SoftServe (internal) | orchestrator bullet and sub-bullet |
| `softserve-cost-dashboard` | from Sebastian | 5 | false | A global professional services and technology consulting firm | dashboard bullet and its three sub-bullets |
| `softserve-media-chatbot` | `senior-software-engineer` | 6 | true | A US advertising measurement and media analytics company | CES chatbot bullet and sub-bullet |
| `softserve-survey-payments` | `senior-software-engineer` | 7 | false | A leading US online survey platform | Stripe bullet, plus today's site milestones: 20% of emails moved to a producer-consumer setup, thousands in tax funds recovered, 99.95% uptime restored |

If Sebastian's answer changes the role of the two open rows, re-number `order` so each role's experiences sit together, newest first.

- [ ] **Step 1: Write the seven experiences**

Technologies per experience are only the tools its text names.

- [ ] **Step 2: Fill `technologies` in `companies.yaml`**

For each company, the badges in today's `ExperienceSection.astro` that no experience of that company lists.

- [ ] **Step 3: Verify**

Run: `pnpm build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/content/experience
git commit -m "add softserve experiences"
```

### Task 7: Experience page and list page

**Files:**
- Create: `src/components/MarkdownContent.astro`
- Modify: `src/modules/ProjectDetailShared.astro` (use `MarkdownContent`, drop its `<style>`)
- Modify: `src/layouts/ProjectLayout.astro` (optional `backHref?: string`, `backLabel?: string`, default home and `index.projects.back`)
- Modify: `src/i18n/index/experience.ts` (new labels, see Step 1)
- Create: `src/components/ExperienceListItem.astro`
- Create: `src/pages/[lang]/experience/index.astro`
- Create: `src/pages/[lang]/experience/[slug].astro`

**Interfaces:**
- Consumes: `getExperienceData(lang)` from Task 4.
- Produces: routes `/<lang>/experience/` and `/<lang>/experience/<slug>/`. Link with `getRelativeLocaleUrl(lang, "experience/" + id)`.

- [ ] **Step 1: Add labels under `index.experience` in all three languages**

`view_all` ("See all experience"), `all_title` ("Professional Experience"), `all_description` (one sentence for the meta description), `highlights` ("Highlights"), `technologies` ("Technologies"), `company_technologies` ("Also used at this company"), `present` ("Present"), `back_to_list` ("Back to experience"), `links` ("Links"), `view_details` ("View details"). Keep `title`. The old company keys stay until Task 8.

- [ ] **Step 2: Move the Markdown styles into `MarkdownContent.astro`**

A wrapper `<div class="markdown-content ..."><slot /></div>` with the exact `<style>` block from `ProjectDetailShared.astro` and the same classes it uses on the div today. `ProjectDetailShared.astro` uses it.

- [ ] **Step 3: Build the list page**

`getStaticPaths` over `locales`, as in `src/pages/[lang]/projects/index.astro`. One block per company (name with link, location, role titles with dates, summary, `company_technologies` badges if any), then an `ExperienceListItem` per experience: title, client, role title, dates, summary, link to its page.

- [ ] **Step 4: Build the experience page**

`getStaticPaths` over `locales` times experience ids, passing nothing but `lang` and `slug`. The page calls `getExperienceData(lang)` and finds the entry. Shows title, client, company with link, role title, dates, location, technology badges, highlights list, `render(detail)` body inside `MarkdownContent`, links. `ProjectLayout` with `backHref` to the list page and `backLabel` `back_to_list`.

- [ ] **Step 5: Verify**

Run: `pnpm check && pnpm build && ls dist/en/experience dist/ja/experience/softserve-energy-agents`
Expected: passes, list has 10 folders plus `index.html`.

Then delete `src/content/experience/icomm-factcil/es.md` and run `pnpm build`.
Expected: FAIL with "icomm-factcil: missing es.md". Restore the file (`git checkout -- src/content/experience`).

- [ ] **Step 6: Commit**

Two commits, since the Markdown move is its own change:

```bash
git add src/components/MarkdownContent.astro src/modules/ProjectDetailShared.astro
git commit -m "move markdown styles into a shared component"
git add src/layouts/ProjectLayout.astro src/i18n/index/experience.ts src/components/ExperienceListItem.astro "src/pages/[lang]/experience"
git commit -m "add experience list and detail pages"
```

### Task 8: New home section and removal of the old one

**Files:**
- Create: `src/components/ExperienceHomeCard.astro`
- Modify: `src/sections/ExperienceSection.astro`
- Modify: `src/i18n/index/experience.ts` (remove company keys, `links`, `milestones`)
- Delete: `src/components/NewExperienceCard.astro`, `src/types/technology.d.ts`

- [ ] **Step 1: Rewrite `ExperienceSection.astro`**

Keep the outer `<section>`, the grid background box and the heading. Read `getExperienceData(lang)`. Per company an `ExperienceHomeCard`: header with company link and the company's overall dates (earliest role start to latest role end), role titles, company summary, then the `summary` of each experience with `home: true`, each linking to its page. Below the cards, an `Anchor` to the list page with `view_all`, as `ProjectSection.astro` does for projects. Keep the `MoveUp` icons between cards.

- [ ] **Step 2: Remove the old files and keys**

Delete `NewExperienceCard.astro` and `src/types/technology.d.ts`. In `experience.ts` remove everything except the labels from Task 7 Step 1.

- [ ] **Step 3: Verify**

Run: `pnpm check && pnpm build && pnpm test && pnpm exec oxfmt --check src && grep -rn "index.experience\.\(softserve\|verblio\|icomm\|geomedical\)" src`
Expected: all pass, grep prints nothing. Open `pnpm preview` at `/en/`, `/es/`, `/ja/` and confirm the home cards, the button, and that every highlight link opens a page in the same language.

- [ ] **Step 4: Commit**

```bash
git add -A src
git commit -m "show short company cards in the home experience section"
```

### Task 9: Update the add-experience skill

**Files:**
- Modify: `.claude/skills/add-experience/SKILL.md`

- [ ] **Step 1: Rewrite Step 2 and Step 4 of the skill**

Step 2: the data model is now company (in `companies.yaml`) plus one experience per client, with `title`, `client`, `summary`, `highlights` and a Markdown body. Step 4: create `src/content/experience/<company>-<slug>/` with `meta.yaml` and the three language files, or add a company or role to `companies.yaml`; decide `home` and `order`. Add the public client rule (name plus description). Steps 1, 3 and 5 stay. Remove the instruction to edit `ExperienceSection.astro`.

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/add-experience/SKILL.md
git commit -m "update add-experience skill for the experience content folder"
```

### Task 10: Reviews and pull request

- [ ] **Step 1:** Run `pnpm check`, `pnpm build`, `pnpm test`, `pnpm exec oxfmt --check src`. All pass.
- [ ] **Step 2:** Run `/astro-dev:astro-review` on the branch. Fix every FAIL this branch introduced.
- [ ] **Step 3:** Confirm `gh auth status` shows AyanoNK. Push and open the PR against `main`. The body reports the command results and the review result. No AI attribution.
- [ ] **Step 4:** Run `/astro-dev:astro-code-review` on the PR. Fix findings in the same PR and add its result to the PR body.
