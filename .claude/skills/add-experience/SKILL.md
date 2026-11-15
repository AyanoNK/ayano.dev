---
name: add-experience
description: Add or update a work experience item on this portfolio website, writing the texts in the house CV style and writing them into the trilingual experience content files. Use whenever the user wants to add a new job, company, client project, milestone, or achievement to the website experience section, or pastes raw notes about work they did and wants them turned into experience content, even if they don't mention the word "experience".
---

# Add Experience Item

Adds a work experience item to this portfolio site: a new company, a new section (one client or one milestone) on a company page, or new results for an existing section. Produces texts in the house writing style, translates them to Spanish and Japanese, wires them into the site, and verifies the build.

## Step 1: Gather the facts

Collect these from the user. Never invent facts, clients, tools, or numbers; everything on this site must survive an interview question.

- Company, role, and dates, or which existing company and role the new content belongs under.
- What the project was: what it does, who the client is, and the client's industry.
- What the user did: each contribution, and for every tool involved, what it was used for.
- A measurable result for each highlight: a percentage, USD amount, time saved, users served, data volume, or delivery timeframe. Estimations are fine. If a highlight has no metric, ask the user for one before writing; only leave a highlight qualitative if the user explicitly says no number exists.

Client naming rule: employers can be named; clients get anonymized descriptors that state their size, region, and industry ("a Fortune 500 US energy company", "a leading US online survey platform"). Only name a client directly when the user confirms the relationship is public, and then always add the descriptor, because readers in the US, Europe or Asia may not know the name ("Factcil, a Colombian fintech startup"). When in doubt, ask.

## Step 2: Write the texts (house style)

Each place of employment has one page on the site. The page is made of sections: one per client (at a consultancy such as SoftServe, each client is its own section) or one per milestone. A small milestone is a short section with one paragraph. Each section has these texts, per language:

- **title**: a short name for the work ("Autonomous ticketing agents").
- **client**: the client name or descriptor (see the naming rule).
- **summary**: one sentence starting with a verb, with the main result. It shows on the home page card and the overview page.
- **highlights**: zero to five results (zero for a short section), each a sentence starting with a verb (Directed, Built, Migrated, Implemented) that states what was done, names its tools in context, and contains its measurable result.
- **body**: the write-up in Markdown, never empty. Headings start at `###`, because the section title is already a heading on the page. Suggested headings for a long section: the client and the problem, what was built, results. A short section is one paragraph with no headings. Images in a body must use a full `https://` URL, because company pages do not process local image files.

A company also has a one or two sentence `summary` for its home page card.

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

Write English first, then Spanish and Japanese versions of every text. Match the tone of the existing files in `src/content/experience/`: Spanish uses first person past ("Lideré...", "Construí..."), Japanese uses polite form ending in ました/しています. Translate meaning over words; keep product names, tool names, and metrics identical across languages.

## Step 4: Write the files

Experience content lives in `src/content/experience/`. Read an existing experience folder first and match it.

1. **New company or role:** add it to `src/content/experience/companies.yaml` with `id`, `name`, `url`, `order`, optional `location`, `summary`, `technologies` (tools used at the company that no section lists) and `roles` (`id`, `title`, `start`, optional `end`). Every translated field has `en`, `es` and `ja`. Dates are `YYYY-MM`, and a missing `end` means current.
2. **New section:** create `src/content/experience/<company>/<section>/`, where `<company>` is the company id from `companies.yaml` and `<section>` is a short kebab-case name that becomes the link anchor (`/en/experience/softserve/#energy-agents`). It holds:
   - `meta.yaml`: `role` (a role id of that company), `order` (position on the company page, newest first), `home` (true to show it on the home page card), optional `start` and `end`, `technologies` (only tools the text names), optional `links` (`title` per language and `url`).
   - `en.md`, `es.md`, `ja.md`: front matter with `title`, `client`, `summary`, `highlights`, then the body. All three files need the same number of highlights.
3. **New results for an existing section:** add them to the highlights or body of all three language files.

Facts that do not change with language (dates, technologies, links) go only in the YAML files. Nothing else needs editing: the home page, the overview page and the company pages read these files.

## Step 5: Verify

Run `pnpm build`. It fails when a language file is missing or has an empty body, the highlight counts differ, a field is empty, a section folder sits under a name that is not a company id, a company has no sections, or `meta.yaml` names a role the company does not have. Fix anything it reports.

Never run `git commit` in this repository. Leave the changes uncommitted for the user to review.
