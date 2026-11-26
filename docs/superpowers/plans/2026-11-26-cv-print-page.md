# CV Print Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A `/resume` page that copies the Enhancv CV_2026 layout and prints to one A4 page.

**Architecture:** One typed data file (`src/data/cv.ts`) feeds a standalone Astro page (`src/pages/resume.astro`) built from small static `.astro` parts in `src/components/cv/`. Dates and meter levels go through tiny pure helpers in `src/lib/cv/` with Vitest tests. Print CSS fixes the sheet to A4.

**Tech Stack:** Astro 7, Tailwind 4, Astro Fonts API (fontsource), `@lucide/astro`, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-26-cv-print-page-design.md`. Visual reference: `~/Downloads/CV_2026_2.pdf`.

## Global Constraints

- English only. No `useTranslations`, no locale prefix.
- No new packages.
- Accent color `#880808`, text `#000000`. Headings Raleway, body Open Sans.
- Printed output: exactly one A4 page (210 x 297 mm), `@page { margin: 0 }`.
- `/cv` redirect stays. `/resume` is left out of the sitemap.
- `pnpm check`, `pnpm build`, `pnpm test`, `pnpm exec oxfmt --check src` pass.

## Review Focus

- Long content overflows to a second printed page: the sheet has a fixed A4 height with `overflow: hidden` on screen, so overflow is visible as clipping while editing (checked in Task 4 by measuring the content height).
- Print colors drop out (red bars, accent text): `print-color-adjust: exact` on the sheet (checked in Task 4 with print emulation).
- Fonts fall back to system fonts in print: both fonts are preloaded with `<Font preload>` (checked in Task 4 by reading `document.fonts`).
- An entry splits across a page edge: `break-inside: avoid` on each entry.
- Ongoing roles: `end: null` prints "Present" (Task 1 test).

---

### Task 1: CV data and helpers

**Files:**
- Create: `src/lib/cv/format.ts`, `src/lib/cv/format.test.ts`, `src/data/cv.ts`
- Modify: `vitest.config.ts` only if `src/lib/cv/` is not already picked up (it uses defaults, so it should be).

**Interfaces:**
- Produces: `type YearMonth = { year: number; month: number }` (month 1-12); `formatCvRange(start: YearMonth, end: YearMonth | null): string`; `meterBars(level: number): boolean[]` (length 5, first `level` true, level clamped to 0-5); `type Cv` and `export const cv: Cv` with fields `name, title, contact { email, site, linkedin, location }, experience: CvEntry[], projects: CvEntry[], skills: { title?: string; tags: string[] }[], strengths: { icon: "leader" | "gears"; title; description }[], education: { degree, institution, start, end, location, gpa, maxGpa }, certifications: { title, issuer }[], languages: { name, label, level }[], references: { name, role, email, phone? }[]`. `CvEntry = { title, start, end, location?, tech?, link, description, bullets: string[] }`. Bullets may contain `[text](url)` links.

- [ ] **Step 1: Write failing tests** in `format.test.ts`:
  - `formatCvRange({year:2023,month:8}, null)` is `"08/2023 - Present"`
  - `formatCvRange({year:2017,month:1}, {year:2021,month:12})` is `"01/2017 - 12/2021"`
  - `meterBars(4)` is `[true,true,true,true,false]`; `meterBars(7)` is five `true`; `meterBars(-1)` is five `false`
- [ ] **Step 2:** `pnpm test src/lib/cv` fails (module missing).
- [ ] **Step 3:** Implement `format.ts`.
- [ ] **Step 4:** `pnpm test src/lib/cv` passes.
- [ ] **Step 5:** Write `src/data/cv.ts` with the content from the Enhancv resume (dates as printed in the PDF: SoftServe 08/2023-Present, Verblio 08/2022-06/2023, i-comm 08/2020-08/2022, Bank Manager 09/2024-Present, Bird 04/2023-06/2023, Posha 01/2023-03/2023, education 01/2017-12/2021). Tech lists without the extra spaces Enhancv used for alignment. Factcil bullets keep the `[Factcil](https://www.factcil.com/)` link.
- [ ] **Step 6:** `pnpm check` passes. Commit: `add the CV data and its date and meter helpers`.

### Task 2: CV parts

**Files:**
- Create in `src/components/cv/`: `CvSection.astro`, `CvEntry.astro`, `CvTags.astro`, `CvStrength.astro`, `CvEducation.astro`, `CvCertification.astro`, `CvLanguage.astro`, `CvReference.astro`, `CvHeader.astro`, `InlineLinks.astro`

**Interfaces:**
- Consumes: types and helpers from Task 1.
- Produces: each part takes one data item as props (`CvSection` takes `title` and a slot). `InlineLinks` takes `text: string` and renders `[x](url)` as underlined links, everything else as text (escape by rendering pieces as Astro expressions, never `set:html`).

- [ ] **Step 1:** Build each part to match the PDF:
  - Section: uppercase Raleway bold title, ~3px black rule under it.
  - Entry: title in Raleway regular, larger; then rows with `Calendar`, `MapPin` (location left, tech list pushed right), `Link` icons, small gray text; description; bullets with `•`; dotted gray separator between entries (not after the last).
  - Tags: optional red uppercase group title, bordered boxes with bold text, dotted separator between groups.
  - Strength: red icon (`PersonStanding` for leader, `Cog`/`Settings` for gears) left, bold title, gray description.
  - Education: degree (Raleway), institution red bold, date and location rows; GPA box on the right with a left border, "GPA" small gray, value red bold, "/ 5.0" gray.
  - Language: name bold, label gray, five vertical red bars (gray when off) on the right.
  - Reference: name bold, role line, underlined `mailto:` and `tel:` links.
  - Header: uppercase name ~40px bold, red title, contact row with `AtSign`, `Link`, `Link`, red `MapPin`; faint triangle SVG in the top area behind the text.
- [ ] **Step 2:** `pnpm check` passes. Commit: `add the CV page parts`.

### Task 3: The page and fonts

**Files:**
- Create: `src/pages/resume.astro`
- Modify: `astro.config.mjs` (fonts, sitemap filter)

- [ ] **Step 1:** Add fonts `Raleway` (`--font-raleway`) and `Open Sans` (`--font-open-sans`) to `fonts` in `astro.config.mjs`, same provider and options as DM Sans. Change the sitemap filter to also drop `${site}/resume/`.
- [ ] **Step 2:** Write `resume.astro`: own `<html lang="en">`, `<head>` with title "Sebastian Correa - CV", `<Font ... preload>` for both, imports `tailwind.css`. Body gray on screen; `.sheet` is 210mm x 297mm, white, centered, shadow, padding matching the PDF, `overflow: hidden`, `print-color-adjust: exact`. Header, then a grid of two columns at about 58% / 42% with the PDF's gap. Left: Experience, Projects. Right: Skills, Strengths, Education, Certifications, Languages, References.
- [ ] **Step 3:** Print CSS in the page: `@page { size: A4; margin: 0 }`; in `@media print` body background white, sheet shadow and centering margin removed; entries `break-inside: avoid`.
- [ ] **Step 4:** `pnpm check` and `pnpm build` pass and `dist/resume/index.html` exists. Commit: `add the printable CV page at /resume`.

### Task 4: Match the PDF and check printing

- [ ] **Step 1:** Run `pnpm dev`, open `http://localhost:3000/resume` in the browser pane, screenshot, and compare side by side with the PDF render. Fix sizes, spacing and icons until they line up.
- [ ] **Step 2:** In the page, check that the content height of both columns is below the sheet height and that `document.fonts` has Raleway and Open Sans loaded.
- [ ] **Step 3:** Print to PDF with headless Chrome (`--print-to-pdf --no-pdf-header-footer`) against the dev server and confirm the PDF has one page; read it and compare with the original.
- [ ] **Step 4:** `pnpm exec oxfmt --check src`, `pnpm test`, `pnpm check`, `pnpm build` pass. Commit any fixes: `match the CV page spacing to the Enhancv PDF`.
