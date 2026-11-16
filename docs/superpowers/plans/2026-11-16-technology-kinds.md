# Technology Chip Kinds Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Color every technology chip by kind and sort each chip row protocols, libraries, languages, platforms, with unknown names last in gray.

**Architecture:** A `technologies` content collection (file loader on `src/content/technologies.yaml`) maps names to kinds. A pure helper sorts names into chips. A `TechnologyChips.astro` component loads the map, sorts, and renders `Badge`s with a variant per kind. The five places that render chips switch to it.

**Tech Stack:** Astro 7 content collections, Tailwind 4, class-variance-authority, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-16-technology-kinds-design.md`

## Global Constraints

- Kinds and order: `protocol`, `library`, `language`, `platform`.
- Inside a kind, keep the author's order.
- Unknown names: `neutral` badge, after all known kinds, author order kept. The build never fails for them.
- Colors: protocol `bg-main`, library `bg-marine`, language `bg-lightblue`, platform `bg-secondary-background`, unknown `bg-gray-200`. Black text and the existing border on all.
- No labels for kinds. No change to the other repos' showcase format.

## Review Focus

- A name listed twice in one row keeps both chips, in place within its kind (test in Task 1).
- Names are matched exactly, case included: `react` is unknown if the list has `React` (test in Task 1).
- An empty list renders nothing and does not break the wrapper (Task 2: the company page already guards with `length > 0`; keep that guard).
- Every name currently on the site is in the YAML, so no gray chip shows today (Task 2, Step 3 check).
- The featured project card and project page keep their `text-md` size (Task 2: pass `class` through).

---

### Task 1: Sort helper

**Files:**
- Create: `src/lib/technologies.ts`
- Test: `src/lib/technologies.test.ts`

**Interfaces:**
- Produces: `export const KINDS = ["protocol", "library", "language", "platform"] as const;` `export type Kind = (typeof KINDS)[number];` `export interface Chip { name: string; kind: Kind | undefined }` `export function sortTechnologies(names: string[], kinds: ReadonlyMap<string, Kind>): Chip[]`

- [ ] **Step 1: Write the failing tests**

```ts
const kinds = new Map<string, Kind>([
  ["Python", "language"], ["REST", "protocol"], ["Django", "library"],
  ["AWS", "platform"], ["Go", "language"], ["React", "library"],
]);

test("sorts by kind in protocol, library, language, platform order", () => {
  expect(sortTechnologies(["AWS", "Python", "Django", "REST"], kinds).map((c) => c.name))
    .toEqual(["REST", "Django", "Python", "AWS"]);
});
test("keeps the author's order inside a kind", () => {
  expect(sortTechnologies(["Go", "Python"], kinds).map((c) => c.name)).toEqual(["Go", "Python"]);
});
test("puts unknown names last with no kind, in author order", () => {
  expect(sortTechnologies(["Zig", "Python", "Elm"], kinds))
    .toEqual([{ name: "Python", kind: "language" }, { name: "Zig", kind: undefined }, { name: "Elm", kind: undefined }]);
});
test("matches names exactly, case included", () => {
  expect(sortTechnologies(["react"], kinds)).toEqual([{ name: "react", kind: undefined }]);
});
test("keeps duplicates", () => {
  expect(sortTechnologies(["Go", "REST", "Go"], kinds).map((c) => c.name)).toEqual(["REST", "Go", "Go"]);
});
test("returns an empty list for no names", () => {
  expect(sortTechnologies([], kinds)).toEqual([]);
});
```

- [ ] **Step 2: Run** `pnpm test src/lib/technologies.test.ts`. Expected: FAIL, module not found.
- [ ] **Step 3: Implement** `sortTechnologies`: a stable sort by the index of the kind in `KINDS`, unknown counted as `KINDS.length`.
- [ ] **Step 4: Run** `pnpm test`. Expected: all pass (52 old + 6 new).
- [ ] **Step 5: Commit** `git commit -m "add a helper that sorts technologies by kind"`

### Task 2: Kinds list, colored badges, and every chip row

**Files:**
- Create: `src/content/technologies.yaml`, `src/components/TechnologyChips.astro`
- Modify: `src/content.config.ts` (new `technologies` collection), `src/components/Badge.astro` (variants), `src/pages/[lang]/experience/[company].astro` (two rows), `src/components/ProjectCard.astro`, `src/sections/ProjectSection.astro`, `src/modules/ProjectDetailShared.astro`

**Interfaces:**
- Consumes: `KINDS`, `Kind`, `sortTechnologies` from Task 1.
- Produces: `<TechnologyChips technologies={string[]} class?={string} />` renders only the badges (callers keep their wrapper `div`); `class` goes on each badge.

- [ ] **Step 1: Add the collection.** `technologies.yaml` is a map of name to `{ kind: <kind> }`, with every name from the spec's "Proposed kinds" section. Collection: `file("src/content/technologies.yaml")`, schema `z.object({ kind: z.enum(KINDS) })`.
- [ ] **Step 2: Add Badge variants** `protocol`, `library`, `language`, `platform` with the colors in Global Constraints, and change `neutral` to `bg-gray-200 text-foreground`. Check nothing else uses `variant="neutral"` on Badge before changing it.
- [ ] **Step 3: Write `TechnologyChips.astro`.** Build the map from `getCollection("technologies")`, call `sortTechnologies`, render `<Badge variant={chip.kind ?? "neutral"} class={className}>`. Replace the five `technologies.map(... <Badge>)` blocks with it, passing `class="text-md"` where they had it.
- [ ] **Step 4: Verify.** `pnpm check`, `pnpm build`, `pnpm exec oxfmt --check src`, `pnpm test` all pass. In `dist/`, no technology badge has the gray class: `grep -c "bg-gray-200" dist/en/experience/softserve/index.html dist/en/index.html` prints 0 for each.
- [ ] **Step 5: Commit** `git commit -m "color technology chips by kind and sort them"`
