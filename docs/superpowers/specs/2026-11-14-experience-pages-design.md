# Experience pages

## Why

The "Professional Experience" section on the home page shows every role, its full description and every milestone for all four companies. It is too much text for a home page.

The site is also meant to be the most complete record of Sebastian's work. CVs are cut from it for each job application, not the other way around. Today the CVs (`CV_2026_2.txt`, `factored_cv.md`) hold more detail than the site.

## What an "experience" is

An experience is the work done for one client. At a product company (Verblio, Geomedical) the company is the client, so it has one experience. At SoftServe and I-Comm, which build software for other businesses, each client is its own experience, because each client has a different business and the work was different.

Internal SoftServe projects (the Google Cloud savings pipeline, the AI orchestrator) count as experiences too. Their client is SoftServe.

## Goals

- **Home page:** one card per company with a short company summary and a few highlights. Each highlight is one sentence about one experience and links to its page. A button opens the full list.
- **List page** at `/<lang>/experience/`: every experience, grouped by company, newest company first.
- **One page per experience** at `/<lang>/experience/<slug>/`: the full write-up of the work for that client.
- All text exists in `en`, `es` and `ja`. A missing or incomplete translation fails the build.
- The site holds everything in `factored_cv.md` and `CV_2026_2.txt`, plus the milestones the site has today that the CVs dropped.

## Non-goals

- Generating CVs from the site. The content is written so that it can be done later, but no script is part of this work.
- Pictures or videos on experience pages. Markdown allows them later; none are added now.
- Changing the other home page sections.

## Anti-goals

- Any fact, client, tool or number that is not in the CVs or on the site today. Everything must hold up in an interview.
- Naming a client that is not public. Clients get a description of size, region and industry ("a Fortune 500 US energy company"), as in `factored_cv.md`.
- Naming a public client without saying what it is. Readers in the US, Europe or Asia do not know a Colombian fintech by name, so a public client gets its name plus the description ("Factcil, a Colombian fintech startup").
- A page that shows a translation key, an English sentence on the Spanish page, or an empty section because one language was missed.
- Breaking the `#experience-section` anchor on the home page.

## Approaches

- **A. Markdown files per experience and language (picked).** Short fields at the top of each file, the full write-up in the body, read by an Astro content collection. Long text is easy to edit, each page can tell its own story, and Markdown is easy to cut CVs from. It needs translation checks, because three files per experience can drift apart.
- **B. Everything in `src/i18n/index/experience.ts`.** Smallest change, but the file is already 19 KB for four companies and can only hold plain sentences.
- **C. One YAML file per experience with fixed fields and no free text.** Very regular, but every page would look the same, which works against each client being different.

Sebastian picked A, with the condition that translations must be guarded.

## Where the content lives

```
src/content/experience/
  companies.yaml                 # the four companies
  softserve-energy-agents/
    meta.yaml                    # facts that are the same in every language
    en.md
    es.md
    ja.md
  softserve-aws-oil-gas/
    ...
```

**Facts that do not change with language are written once,** in `meta.yaml` or `companies.yaml`, never in the language files. That rules out a Spanish page with a different date or tech list than the English one.

`companies.yaml`, one entry per company:

- `id` (`softserve`, `verblio`, `icomm`, `geomedical`), `name`, `url`, `order` (home page order)
- `location`: optional `{ en, es, ja }` (from `CV_2026_2.txt`, for example "Remote - Texas, US"). Geomedical has none in the CVs.
- `technologies`: tools used at the company that no client is tied to (for example Pyramid, Jinja2, Templ and gRPC at SoftServe, Recurly, Apollo and GraphQL at Verblio). Shown on the list page under the company, so no badge from today's site is lost.
- `summary`: `{ en, es, ja }`, one or two sentences for the home card
- `roles`: list of `{ id, title: { en, es, ja }, start, end }`. SoftServe has two roles: Senior Software Engineer from 2023-08 to 2025-05, and AI Engineer from 2025-06 to now. The others have one.

Dates are `YYYY-MM`. `end` is left out for current work.

`meta.yaml`, one per experience:

- `company` (a company `id`), `role` (a role `id` in that company)
- `start`, `end` (optional, `YYYY-MM`; the page falls back to the role's dates)
- `order` (position inside its company, newest first)
- `home` (`true` when it is one of the highlights on the home card)
- `technologies`: the badges, only tools the text ties to this client
- `links`: optional `{ title, url }` list (for example Factcil and the Partera Vital article that the site links today)

`<lang>.md` front matter:

- `title`: short name of the work ("Autonomous ticketing agents")
- `client`: the client description ("A Fortune 500 US energy company")
- `summary`: one sentence. It is the highlight line on the home card and the line under the title on the list page.
- `highlights`: three to five results with numbers, shown at the top of the experience page

The body is the full write-up. Suggested headings: the client and the problem, what was built, results. Each page can change this when the story needs it.

## Translation guards

- **Schema:** every `{ en, es, ja }` field in the YAML files is required by the Zod schema. A missing language fails the build.
- **Matching files:** a check in `src/lib/experience/` fails the build when an experience folder lacks one of `en.md`, `es.md`, `ja.md`, or when the three files have a different number of `highlights`.
- **References:** the same check fails when `meta.yaml` names a company or role that does not exist.
- **Tests:** Vitest covers that check, as it covers `src/lib/showcase/` today.
- **Page labels** ("View all experience", "Highlights", "Present", "Back") go in `src/i18n/ui.ts` like other labels. `useTranslations` returns the key itself when one is missing, so each new label must be added in all three languages.
- **Dates** are formatted per language with `Intl.DateTimeFormat` ("Aug 2023", "Ago 2023", "2023年8月"). They are never written by hand.

## Pages

**Home card (`src/sections/ExperienceSection.astro`).** Reads the collections instead of the hard-coded array. Per company: name with link, location, dates, the role titles, the company summary, then the `summary` line of each experience with `home: true`, each linking to its page. One button under the cards opens the list page. Technology badges move off the home card and onto the experience pages.

**List page (`src/pages/[lang]/experience/index.astro`).** One block per company (name, dates, summary), then a card per experience: title, client, role, dates, summary, link.

**Experience page (`src/pages/[lang]/experience/[slug].astro`).** Title, client, company, role, dates, location, technology badges, the highlights list, the Markdown body, then links. Navigation goes back to the list page. The body uses the existing `.markdown-content` styles. Those rules sit inside `ProjectDetailShared.astro` today. They move to a place both pages can use.

The look follows what the site has: the bordered cards with offset shadows used by `NewExperienceCard.astro` and `ProjectCard.astro`.

## The experiences

**Which source wins.** `factored_cv.md` is the newest and wins when sources disagree. `CV_2026_2.txt` and today's site only add what it lacks. So Verblio's role is "Senior Software Engineer", I-Comm's is "Full Stack Software Engineer", and the ticketing client is "a Fortune 500 US energy company".

**Results only on today's site** are kept:
- "Migrated 20% of marketing and subscription renewal emails...", "Recovered thousands in tax funds..." and "Diagnosed and restored microservices to achieve 99.95% uptime" go on `softserve-survey-payments`.
- Verblio's "Automated platform workflow to reduce administrator access... by 50%" and the CVs' "Documented... reducing questions to the development team by 50%" are two separate results. Both stay, as does "Developed and implemented new solutions to legacy code without breaking any functionalities".

| Company | Slug | Role | Client |
|---|---|---|---|
| SoftServe | `softserve-energy-agents` | AI Engineer | Fortune 500 US energy company (ticketing agents, Claude skills marketplace) |
| SoftServe | `softserve-aws-oil-gas` | AI Engineer | Amazon Web Services (oil and gas prediction agent) |
| SoftServe | `softserve-gcp-savings` | AI Engineer | SoftServe internal (Committed Use Discounts savings pipeline) |
| SoftServe | `softserve-ai-orchestrator` | to confirm | SoftServe internal (AI orchestrator) |
| SoftServe | `softserve-cost-dashboard` | to confirm | Global professional services and consulting firm (cloud cost dashboard) |
| SoftServe | `softserve-media-chatbot` | Senior Software Engineer | US advertising measurement company (CES 2025 chatbot) |
| SoftServe | `softserve-survey-payments` | Senior Software Engineer | Leading US online survey platform (Stripe payments) |
| Verblio | `verblio-platform` | Senior Software Engineer | Verblio |
| I-Comm | `icomm-factcil` | Full Stack Software Engineer | Factcil, a Colombian fintech startup |
| Geomedical | `geomedical-partera-vital` | Tech Lead | UNFPA Colombia and DANE (Partera Vital) |

The writing follows the house style in `.claude/skills/add-experience/SKILL.md`: verbs first, every tool with its purpose, a number on every result, no dash asides, Spanish in first person past, Japanese in polite form.

## Removed and changed

- The experience keys in `src/i18n/index/experience.ts` go away. Only the section title and labels stay, in `ui.ts` or that file.
- `NewExperienceCard.astro` and the `NewExperience` types are replaced by the new components.
- The `add-experience` skill is updated to write `meta.yaml` and the three language files instead of the old keys.

## Left to the builder

- Component names and how the cards are split into components.
- The exact Zod schema and where the translation check runs (in the loader or in a helper the pages call).
- Card layout details, within the current site style.
