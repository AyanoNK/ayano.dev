# Experience Company Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the per-client experience pages from PR #13 into one page per employer, built from section folders, and add the new sections from LinkedIn and Sebastian's answers.

**Architecture:** Section folders move under a company folder (`src/content/experience/<company>/<section>/`). The company comes from the folder name. One dynamic route `[company].astro` renders a company with all its sections as anchored blocks. The completeness check works per section and also checks company folders.

**Tech Stack:** Astro 7 content collections, Zod from `astro/zod`, Vitest, Tailwind 4, oxfmt.

**Spec:** `docs/superpowers/specs/2026-11-14-experience-pages-design.md` (revised). Previous plan: `docs/superpowers/plans/2026-11-14-experience-pages.md`.

## Global Constraints

- Work in `/Users/ayano/ayano.dev-experience` on branch `experience-pages`, which is PR #13. Never push to `main`.
- Commits: author from git config, lower-case imperative messages, no `Co-Authored-By`, no AI mentions, no emojis.
- Every `{ en, es, ja }` field is required. Facts that do not change with language live only in YAML.
- No fact, number, client or tool outside: `/Users/ayano/ayano.dev/factored_cv.md`, `/Users/ayano/ayano.dev/CV_2026_2.txt`, `git show 06286b9:src/i18n/index/experience.ts`, the spec's "LinkedIn facts used" and "Decisions from Sebastian" sections. `factored_cv.md` wins on conflicts, except where a Sebastian decision says otherwise.
- Writing style: `.claude/skills/add-experience/SKILL.md` Steps 2 and 3.
- Before pushing: `pnpm check`, `pnpm build`, `pnpm test`, `pnpm exec oxfmt --check src` pass.

## Review Focus

1. **A company in `companies.yaml` with no section folders.** The build must fail naming the company. Tested in Task 1.
2. **A section folder under a name that is not a company** (`softserv/x/`). The build must fail naming the bad company. Tested in Task 1.
3. **A short section with zero highlights.** The page must show no empty highlights box. Checked in Task 2 Step 6.
4. **Headings inside a section body.** They must sit below the section title (h3 under an h2), so the page outline stays correct. Checked in Task 2 Step 6.
5. **Links from the home card and overview page.** Each must land on the right section of the company page in the same language. Checked in Task 2 Step 6.

---

### Task 1: Check works per section and per company folder

**Files:**
- Modify: `src/lib/experience/check.ts`, `src/lib/experience/check.test.ts`

**Interfaces:**
- Produces: `checkExperiences(companies: CompanyRef[], experiences: ExperienceRef[], details: DetailRef[]): string[]`, same signature as PR #13. `ExperienceRef.id` is now `"<company>/<section>"` and `DetailRef.id` is `"<company>/<section>/<lang>"`. The experience's company is still passed as `ExperienceRef.company`.

- [ ] **Step 1: Update the fixtures and add the failing tests**

Fixture ids become `acme/x` and `acme/x/<lang>`. Existing message tests keep their wording with the new ids (`"acme/x: missing ja.md"`, `'acme/x: unknown company "acmee"'`, `"acme/ghost: has en.md but no meta.yaml"`). New:

```ts
test("company with no sections", () => {
  const out = checkExperiences(
    [...companies, { id: "empty", roles: [{ id: "dev" }] }],
    experiences,
    details,
  );
  expect(out).toEqual(["empty: has no sections"]);
});
test("zero highlights in every language is fine", () => {
  const none = details.map((d) => ({ ...d, highlights: [] }));
  expect(checkExperiences(companies, experiences, none)).toEqual([]);
});
```

- [ ] **Step 2: Run tests, see the new ones fail**

Run: `pnpm test src/lib/experience/check.test.ts`
Expected: FAIL on "company with no sections" and on the orphan id parsing.

- [ ] **Step 3: Update `check.ts`**

Split a detail id at its last `/` to get the experience id and language. Add the "has no sections" problem after the per-experience loop.

- [ ] **Step 4: Run tests, see them pass**

Run: `pnpm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/experience/check.ts src/lib/experience/check.test.ts
git commit -m "check experience sections inside company folders"
```

### Task 2: Company folders and the company page

**Files:**
- Move: every `src/content/experience/<old-slug>/` to `src/content/experience/<company>/<section>/` (table below)
- Modify: each moved `meta.yaml` (drop `company`), every moved `*.md` body (`## ` headings become `### `)
- Modify: `src/content.config.ts`, `src/lib/experience/data.ts`, `src/components/ExperienceHomeCard.astro`, `src/sections/ExperienceSection.astro`, `src/pages/[lang]/experience/index.astro`, `src/i18n/index/experience.ts`
- Create: `src/pages/[lang]/experience/[company].astro`
- Delete: `src/pages/[lang]/experience/[slug].astro`, `src/components/ExperienceListItem.astro`

| Old folder | New folder |
|---|---|
| `softserve-energy-agents` | `softserve/energy-agents` |
| `softserve-aws-oil-gas` | `softserve/aws-oil-gas` |
| `softserve-gcp-savings` | `softserve/gcp-savings` |
| `softserve-ai-orchestrator` | `softserve/ai-orchestrator` |
| `softserve-cost-dashboard` | `softserve/cost-dashboard` |
| `softserve-media-chatbot` | `softserve/media-chatbot` |
| `softserve-survey-payments` | `softserve/survey-payments` |
| `verblio-platform` | `verblio/platform` |
| `icomm-factcil` | `icomm/factcil` |
| `geomedical-partera-vital` | `geomedical/partera-vital` |

**Interfaces:**
- Consumes: Task 1.
- Produces: `ExperienceItem` gains `section: string` (the folder name, used as the anchor id). `id` is `"<company>/<section>"`. `CompanyGroup` is unchanged. Company page URL: `getRelativeLocaleUrl(lang, "experience/" + company.id)`; section link: that URL plus `"#" + section`.

- [ ] **Step 1: Move the folders with `git mv`, drop `company:` from each `meta.yaml`, and shift body headings**

- [ ] **Step 2: Update the collections**

`experiences`: pattern `*/*/meta.yaml`, id `entry` without `/meta.yaml`, no `company` field (remove `reference` import). `experienceDetails`: pattern `*/*/{en,es,ja}.md`, id without `.md`. `highlights`: `.min(0).max(5)`.

- [ ] **Step 3: Update `getExperienceData`**

Company is `id.split("/")[0]`, section is `id.split("/")[1]`.

- [ ] **Step 4: Build the company page `[company].astro`**

`getStaticPaths` over `locales` times groups from `getExperienceData(lang)`, props `{ group }`, typed with `InferGetStaticPropsType`. Header: name with link, location, roles with dates, summary, `company_technologies` badges. Then a "Sections" list (new label `index.experience.sections`: en "Sections", es "Secciones", ja "セクション") linking to `#<section>`. Then per section, a `<section id={section}>` with an `h2` title, client, role and dates, technology badges with the `technologies` label, highlights box only when `highlights.length > 0`, and the body in `MarkdownContent`, then links. `ProjectLayout` with `backHref` to the overview page. Page title: company name; description: company summary.

- [ ] **Step 5: Update the overview page, the home card and the section**

Overview: per company, the header block as today plus a link to the company page (`index.experience.view_details`), then each section as a link to `#<section>` with title, client and summary. Remove `ExperienceListItem.astro`. Home card: highlight links go to the company page anchor; add a "View details" link to the company page under the highlights.

- [ ] **Step 6: Verify**

Run: `pnpm check && pnpm build && pnpm test && pnpm exec oxfmt --check src`
Expected: all pass; `dist/en/experience/` holds `softserve`, `verblio`, `icomm`, `geomedical` and `index.html`.

Then confirm in `dist`: `grep -c 'id="energy-agents"' dist/ja/experience/softserve/index.html` prints 1; `grep -o 'experience/softserve/#energy-agents' dist/es/index.html` finds the home link; no `<h2>` appears inside a `markdown-content` box. Open `pnpm preview` and check one company page per language.

- [ ] **Step 7: Commit**

```bash
git add -A src
git commit -m "show one experience page per employer with a section per client"
```

### Task 3: SoftServe content

**Files:**
- Create: `src/content/experience/softserve/mcp-template/`, `src/content/experience/softserve/service-reliability/`
- Modify: `softserve/ai-orchestrator/*`, `softserve/survey-payments/*`, every SoftServe `meta.yaml` (`order`), `companies.yaml` (SoftServe location)

Section order, newest first: energy-agents 1, aws-oil-gas 2, gcp-savings 3, ai-orchestrator 4, mcp-template 5, cost-dashboard 6, media-chatbot 7, survey-payments 8, service-reliability 9.

- [ ] **Step 1: `mcp-template`**: role `ai-engineer`, `home: false`, client "SoftServe (internal)", technologies "MCP". Highlights: "Cut new MCP server setup from about a week to one day." and "Became the standard template every team uses when creating a new MCP server." Body: company-wide template with authentication, authorization and common tooling out of the box.
- [ ] **Step 2: `ai-orchestrator`**: add the LinkedIn facts to the body (self-healing, self-managing, transparency and explainability of the agents' decisions and actions, easy integration of new agents and tools, mimics the full software development life cycle). Highlights stay.
- [ ] **Step 3: `survey-payments`**: remove the 99.95% uptime highlight, body bullet and result line in all three languages.
- [ ] **Step 4: `service-reliability`**: role `senior-software-engineer`, `home: false`, client "A leading US online survey platform", technologies "Kubernetes". No highlights. One paragraph: diagnosed and restored microservices running on Kubernetes, achieving 99.95% uptime.
- [ ] **Step 5: SoftServe location** in `companies.yaml`: en "Remote - Bogotá, Colombia", es "Remoto - Bogotá, Colombia", ja "リモート - コロンビア、ボゴタ". Remove "Kubernetes" from SoftServe's company `technologies` (it now has a section).
- [ ] **Step 6: Verify**: `pnpm build` passes; `dist/en/experience/softserve/index.html` contains `id="mcp-template"` and `id="service-reliability"`, and "99.95%" appears once.
- [ ] **Step 7: Commit**: `git add src/content/experience && git commit -m "add mcp template and service reliability sections to softserve"`

### Task 4: Verblio, I-Comm and Geomedical content

**Files:**
- Create: `src/content/experience/verblio/on-call/`, `src/content/experience/icomm/kubernetes-deployment/`
- Modify: `icomm/factcil/*`, `companies.yaml` (Geomedical role title, I-Comm company technologies)
- Delete: `PENDING_CHANGES.md`

- [ ] **Step 1: `verblio/on-call`**: role `senior-software-engineer`, `order: 2`, `home: false`, client "Verblio, a US content marketing platform", no technologies, no highlights. One paragraph: set up the on-call rotation and wrote the incident runbooks for the platform team. Use the Spanish and Japanese wording from `PENDING_CHANGES.md` item 3 ("Configuré la rotación de guardias...", "オンコールローテーションを立ち上げ...").
- [ ] **Step 2: `icomm/factcil`**: add to "The client and the problem" what Factcil does (expanding the traditional factoring market for freelancers who wait 30 to 90 days for payment, building a neo-bank for independents with several financial services), and Terraform to the body and `technologies`.
- [ ] **Step 3: `icomm/kubernetes-deployment`**: role `full-stack-engineer`, `order: 2`, `home: false`, client "Fintech clients in Latin America", technologies AWS, Kubernetes, AWS ELB, GitHub Actions. No highlights. One paragraph: deployed the clients' software on AWS with Kubernetes and Elastic Load Balancing, with continuous integration through GitHub Actions, and kept those services reliable. Remove Kubernetes and AWS ELB from I-Comm's company `technologies`.
- [ ] **Step 4: Geomedical role**: rename the role id `tech-lead` to `development-coordinator` in `companies.yaml` and `geomedical/partera-vital/meta.yaml`, title en "Development Coordinator", es "Coordinador de Desarrollo", ja "開発コーディネーター".
- [ ] **Step 5: Delete `PENDING_CHANGES.md`** with `git rm`.
- [ ] **Step 6: Verify**: `pnpm build` passes; `dist/en/experience/verblio/index.html` contains `id="on-call"`; `dist/en/experience/geomedical/index.html` contains "Development Coordinator".
- [ ] **Step 7: Commit**: three commits, one per company change and one for the deletion:

```bash
git add src/content/experience/verblio && git commit -m "add on-call section to verblio"
git add src/content/experience/icomm src/content/experience/companies.yaml && git commit -m "add factcil details and kubernetes deployment section to i-comm"
git add src/content/experience && git commit -m "use development coordinator as the geomedical role"
git rm -q PENDING_CHANGES.md && git commit -m "remove pending experience drafts now on the site"
```

### Task 5: Skill update

**Files:**
- Modify: `.claude/skills/add-experience/SKILL.md`

- [ ] **Step 1:** Rewrite Step 4 for `src/content/experience/<company>/<section>/` (no `company` field; zero highlights allowed for a short section; body headings start at `###`). Step 2: a section is one client or one milestone on the employer's page.
- [ ] **Step 2:** Commit: `git commit -am "update add-experience skill for company sections"`

### Task 6: Reviews and PR #13

- [ ] **Step 1:** `pnpm check`, `pnpm build`, `pnpm test`, `pnpm exec oxfmt --check src` pass.
- [ ] **Step 2:** Final whole-branch review by a fresh reviewer; fix Critical and Important findings with tests.
- [ ] **Step 3:** `/astro-dev:astro-review` on the branch; fix FAILs this change introduced.
- [ ] **Step 4:** Push to `experience-pages`; rewrite PR #13's title and description for company pages with the command and review results.
- [ ] **Step 5:** `/astro-dev:astro-code-review` on PR #13; fix findings; add the result to the description.
