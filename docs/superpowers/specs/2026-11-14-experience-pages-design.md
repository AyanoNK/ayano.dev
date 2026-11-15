# Experience pages

## Why

The "Professional Experience" section on the home page shows every role, its full description and every milestone for all four companies. It is too much text for a home page.

The site is also meant to be the most complete record of Sebastian's work. CVs are cut from it for each job application, not the other way around. Today the CVs (`CV_2026_2.txt`, `factored_cv.md`) and LinkedIn hold more detail than the site.

## Revision

A first version (PR #13) gave every client its own page. Sebastian wants one page per place of employment instead, because the work is divided by employer, and some milestones are too small for a page of their own (for example keeping Kubernetes services reliable). Verblio will gain more milestones over time. This document describes the revised design. Most of PR #13 carries over, and the work stays in PR #13.

## Words used here

- **Company page:** one page per place of employment. Four today: SoftServe, Verblio, I-Comm, Geomedical.
- **Section:** one block on a company page. A section is the work for one client (at SoftServe, a consultancy, each client is a section) or one milestone. A section can be long, with highlights and several headings, or short, with one paragraph.

## Goals

- **Home page:** one card per company with location, dates, roles, a short summary and at least 3 highlights. Each highlight is a result picked from a section (or a short section's summary), followed by a "View details" link to that section on the company page. A button opens the overview page.
- **Overview page** at `/<lang>/experience/`: the four companies, each with its summary and a list of its sections. Each item links to that section on the company page.
- **Company page** at `/<lang>/experience/<company>/`: everything done at that employer, with one section per client or milestone, each reachable at `#<section>`.
- All text exists in `en`, `es` and `ja`. A missing, empty or incomplete translation fails the build.
- The site holds everything in `factored_cv.md`, `CV_2026_2.txt`, LinkedIn (read 2026-11-14) and the old site's milestones.
- Adding a milestone to a company means adding one section folder. No code changes.

## Non-goals

- Generating CVs from the site.
- Pictures or videos on company pages. Markdown allows images from full `https://` URLs later. Local image files are not processed on company pages, and the build rejects them.
- Changing the other home page sections.
- A page per section.

## Anti-goals

- Any fact, client, tool or number that is not in the CVs, LinkedIn or the old site. Everything must hold up in an interview.
- Naming a client that is not public. Clients get a description of size, region and industry ("a Fortune 500 US energy company").
- Naming a public client without saying what it is ("Factcil, a Colombian fintech startup").
- A page that shows a translation key, an English sentence on the Spanish page, or an empty section.

## Approaches

- **A. One write-up per company per language**, sections as `##` headings. Simplest, but sections lose their own role, client, tools and dates, and the build can only check whole files.
- **B. Company page built from section folders (picked).** Each section is a folder with `meta.yaml` and three language files. The PR #13 write-ups and translation check carry over. Cost: a tiny milestone still needs four small files.
- **C. One file per company per language with sections as a list in front matter.** Long prose inside YAML is hard to edit.

Sebastian picked B.

## Where the content lives

```
src/content/experience/
  companies.yaml                    # company facts (unchanged from PR #13)
  softserve/
    energy-agents/
      meta.yaml
      en.md
      es.md
      ja.md
    aws-oil-gas/
    ...
  verblio/
    platform/
  icomm/
    factcil/
  geomedical/
    partera-vital/
```

**The company comes from the folder name.** `meta.yaml` no longer has a `company` field. The build fails when a folder name is not a company id in `companies.yaml`.

`companies.yaml` keeps its PR #13 fields: `id`, `name`, `url`, `order`, optional `location`, `summary`, `technologies` (tools with no section tied to them), `roles` (`id`, `title`, `start`, optional `end`).

`meta.yaml` per section: `role`, `order` (position on the company page, newest first), `home` (the lines this section puts on the home card: highlight positions starting at 1, or `summary`; every company card shows at least 3 lines, and the build fails otherwise), optional `start` and `end` (a missing `end` falls back to the role's end), `technologies`, optional `links`.

`<lang>.md` front matter: `title`, `client`, `summary` (the line on the home card and the overview page), `highlights` (zero to five results; zero for a short section). The body is the write-up and must not be empty.

## Translation guards

The PR #13 check carries over, now per section: every section has all three language files, no file has an empty body, highlight counts match across languages, the role exists in the company, and no language file exists without a `meta.yaml`. New: a company folder that is not in `companies.yaml` fails, and so does a company in `companies.yaml` with no sections. Labels go in `src/i18n/index/experience.ts` in all three languages. Dates are formatted by `Intl`.

## Pages

**Home card** stays as in PR #13. Highlight links go to `/<lang>/experience/<company>/#<section>`, and a "View details" link on each card goes to the company page.

**Overview page:** per company, the name, location, roles with dates and summary, then each section as a link with its title, client and summary.

**Company page:** a header with name, link, location, roles with dates, summary and the company-wide tools. Then a short list of the sections (a table of contents) linking to their anchors. Then each section in order: title as a heading with its `id`, client, role and dates, tools, highlights if any, and the body. Navigation goes back to the overview page.

## The sections

**Which source wins.** `factored_cv.md` wins when sources disagree. LinkedIn, `CV_2026_2.txt` and the old site add what it lacks.

| Company | Section | Role | Notes |
|---|---|---|---|
| SoftServe | `energy-agents` | AI Engineer | from PR #13 |
| SoftServe | `aws-oil-gas` | AI Engineer | from PR #13 |
| SoftServe | `ai-orchestrator` | AI Engineer | from PR #13, plus LinkedIn: self-healing, self-managing, mimics the full software development life cycle |
| SoftServe | `mcp-template` | AI Engineer | new, from LinkedIn and Sebastian: company-wide MCP server template with authentication, authorization and common tools, now the standard for every new MCP server; cut new server setup from about a week to one day; built before the orchestrator |
| SoftServe | `cost-dashboard` | AI Engineer | from PR #13 |
| SoftServe | `gcp-savings` | AI Engineer | from PR #13 |
| SoftServe | `media-chatbot` | Senior Software Engineer | from PR #13 |
| SoftServe | `survey-payments` | Senior Software Engineer | from PR #13, without the uptime result |
| SoftServe | `service-reliability` | Senior Software Engineer | new short section: diagnosed and restored microservices on Kubernetes to reach 99.95% uptime, for the online survey platform |
| Verblio | `platform` | Senior Software Engineer | from PR #13 |
| Verblio | `on-call` | Senior Software Engineer | new short section, confirmed by Sebastian: set up the on-call rotation and wrote the incident runbooks for the platform team |
| I-Comm | `factcil` | Full Stack Software Engineer | from PR #13, plus LinkedIn: factoring for freelancers who wait 30 to 90 days for payment, a neo-bank for independents with several financial services, Terraform |
| I-Comm | `kubernetes-deployment` | Full Stack Software Engineer | new short section, from LinkedIn and Sebastian: deployed the fintech clients' software on AWS with Kubernetes and Elastic Load Balancing, with CI through GitHub Actions, and kept those services reliable |
| Geomedical | `partera-vital` | Development Coordinator | from PR #13 |

## Decisions from Sebastian (2026-11-14)

- Keeping Kubernetes services reliable happened at both SoftServe and I-Comm. Each gets a short section.
- The MCP template's "about a week to one day" figure is real, and the template came before the orchestrator.
- The Verblio on-call rotation and runbooks are real.
- Sebastian never worked at Meridian Labs. `PENDING_CHANGES.md` is deleted, since its real items now live in section folders and it describes the old way of adding experience.
- Factcil was a client of I-Comm, so it is a section on the I-Comm page, not its own employer.
- Verblio role: Senior Software Engineer. Geomedical role: Development Coordinator (es "Coordinador de Desarrollo", ja "開発コーディネーター").
- SoftServe location: "Remote - Bogotá, Colombia". The headquarters are in Texas, but Sebastian works remotely from Colombia.

## LinkedIn facts used (read 2026-11-14)

Only these LinkedIn facts are new to the site. Everything else on LinkedIn already matches the CVs or the old site.

- SoftServe, AI Engineer: a company-wide MCP server template with authentication, authorization and common tooling out of the box, used as the standard by all teams every time a new MCP server is created. The orchestrator is self-healing and self-managing, focuses on transparency and explainability of the agents' decisions and actions and on easy integration of new agents and tools, and mimics the full software development life cycle.
- I-Comm: a remote team building custom software for fintech organizations with React and Django, continuous integration with GitHub Actions, AWS deployment with Kubernetes, and Elastic Load Balancing, following Scrum.
- Factcil: a Colombian fintech expanding the traditional factoring market to help freelancers who wait 30 to 90 days for payment, building the next neo-bank for independents with several financial services, using AWS, Django, React and Terraform.

## Removed and changed from PR #13

- Routes `/<lang>/experience/<client-slug>/` become `/<lang>/experience/<company>/`. PR #13 is not merged, so no redirects are needed.
- `ExperienceListItem.astro` is replaced by the overview page's section links.
- The `add-experience` skill is updated for section folders.

## Left to the builder

- Component names and splits.
- How the check gets the company id from the file path.
- Layout details within the current site style.
