---
name: add-experience
description: Add or update a work experience item on this portfolio website, writing the texts in the house CV style and wiring them into the trilingual i18n system. Use whenever the user wants to add a new job, company, client project, milestone, or achievement to the website experience section, or pastes raw notes about work they did and wants them turned into experience content, even if they don't mention the word "experience".
---

# Add Experience Item

Adds a work experience item to this portfolio site: either a brand-new company entry or new milestones under an existing company. Produces texts in the house writing style, translates them to Spanish and Japanese, wires them into the site, and verifies the build.

## Step 1: Gather the facts

Collect these from the user. Never invent facts, clients, tools, or numbers; everything on this site must survive an interview question.

- Company, role, and dates, or which existing company and role the new content belongs under.
- What the project was: what it does, who the client is, and the client's industry.
- What the user did: each contribution, and for every tool involved, what it was used for.
- A measurable result for each milestone: a percentage, USD amount, time saved, users served, data volume, or delivery timeframe. Estimations are fine. If a milestone has no metric, ask the user for one before writing; only leave a milestone qualitative if the user explicitly says no number exists.

Client naming rule: employers can be named; clients get anonymized descriptors that state their size, region, and industry ("a Fortune 500 US energy company", "a leading US online survey platform"). Only name a client directly when the user confirms the relationship is public. When in doubt, ask.

## Step 2: Write the texts (house style)

The experience data model is: company, role, one `description`, and numbered `milestone_N` entries. Write them like this:

- **description**: one or two sentences of project and client context. What the engagement is, for whom, in what industry.
- **milestones**: complete sentences starting with a verb (Directed, Built, Migrated, Implemented). Each milestone states WHAT was done, names its tools in context, and ends with or contains its measurable result.

Tool mentions always follow "completed TASK using TOOL" or "used TOOL for TASK". Never drop tools in parentheses or list a bare stack; every tool named gets its purpose stated. Example:

- Wrong: "Built data pipelines (Python, PySpark, Databricks) with daily refresh."
- Right: "Built pipelines that cross raw data between S3 and Databricks, using Python and PySpark for transforming the inputs into bronze, silver, and gold tables refreshed daily, processing about 1 GB of data per day."

Style rules, all absolute:
- No dash-separated asides in prose. Commas or separate sentences instead. Date ranges like "Aug 2023 - Present" are fine.
- No "A, not B" or "not A, but B" constructions.
- No emojis anywhere.
- Plain, direct words. If a simpler word works, use it.
- Current work uses present participle ("Directing an ongoing initiative..."); finished work uses past tense.

## Step 3: Translate

Write English first, then Spanish and Japanese versions of every text. Match the tone of the existing entries in `src/i18n/index/experience.ts`: Spanish uses first person past ("Lideré...", "Construí..."), Japanese uses polite form ending in ました/しています. Translate meaning over words; keep product names, tool names, and metrics identical across languages.

## Step 4: Wire into the site

Two files must change together, because the component hardcodes which translation keys it renders:

1. `src/i18n/index/experience.ts` — add keys under `experience.<company_slug>`:
   - New company: `link_1`, `start_date`, `end_date`, then `<role_key>.{role, description, milestone_1..N}`, each field an object with `en`, `es`, `ja`.
   - Existing company: add `milestone_N` entries (and update `description` if the user asks) under the right role key.
2. `src/sections/ExperienceSection.astro` — the `experiences` array:
   - New company: add an entry with `titles` (role, description, milestones as `t()` calls), `startDate`, `endDate`, `companyName`, `companyURL`, `projects`, and `technologies`. Ask the user for the company URL, project links, and which technology badges to list.
   - Existing company: add the new `t("index.experience.<company>.<role>.milestone_N")` lines to that role's `milestones` array.

Keep the existing file conventions: the translation file ends with `as const`, and keys follow the `index.experience.company.role.field` dot-path used by `useTranslations`.

## Step 5: Verify

Run `pnpm build`. It renders every page and fails on missing or mistyped translation keys. Fix anything it reports.

Never run `git commit` in this repository. Leave the changes uncommitted for the user to review.
