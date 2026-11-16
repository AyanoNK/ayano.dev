# Technology chip kinds

## Why

Sections and projects list many technologies, and the SoftServe CV will add more. Today every chip is the same blue badge, so a long row is hard to scan. Giving each chip a color by kind, and sorting the row by kind, lets a reader see at a glance which chips are protocols, libraries, languages or platforms.

## Goals

- Every technology chip has one of four kinds: protocol, library, language, platform.
- Each kind has its own color.
- Every chip row is sorted by kind, in this order: protocols, libraries, languages, platforms. Inside a kind, the author's order is kept.
- This applies everywhere chips show: the company header, each experience section, project cards, the featured project card and project pages.

## Non-goals

- No labels or headings for the kinds. Readers infer them from the colors.
- No change to the showcase file format in the other repos.
- No change to which technologies each section or project lists.

## Anti-goals

- A name that is not in the list must never block a build.

## Approaches

1. **One list on this site that maps each name to its kind** (picked). Content files keep plain names. Project names from other repos are looked up the same way.
2. A kind written next to each name in every content file. Rejected: the same name repeats in many files and can drift, and the other repos' showcase format would have to change.
3. Four separate lists in each content file. Rejected for the same reasons.

## Design

- **The list.** `src/content/technologies.yaml` maps each name to `protocol`, `library`, `language` or `platform`. It is read at build time.
- **Unknown names.** A name missing from the list shows as a plain gray chip (the existing `neutral` badge) at the end of the row. The build does not fail. (User's choice.)
- **Colors.** One color per kind from the existing palette, with black text and the existing black border: protocol `main` (blue), library `marine` (orange), language `lightblue` (peach), platform `secondary-background` (white). My call; the user sees them in the preview before merging and can change them. Unknown names use gray so they don't look like platforms.
- **Sorting.** One helper takes a list of names and returns them sorted by kind, each with its kind. Every place that renders chips uses it.
- **Company header.** The blue company header lists the company's own technologies plus every technology its sections use, each name once. Its chips are split into one row per kind, in the same order, with no labels. (User's request after the first preview.)

## Proposed kinds

Frameworks count as libraries. Databases, tools, hosted services and AI models count as platforms. Names marked * are judgment calls for the user to check.

- **Protocols, standards and architecture:** REST, GraphQL, gRPC, MCP
- **Libraries:** Angular, Apollo, Astro, Bootstrap 4, DeepEval, Django, Django REST Framework, Flask, Google ADK, hls.js, Jinja2, LangChain, LangGraph, MUI, Next.js, Playwright, Polars, Preact, Pyramid Web Framework, PySpark, React, React Native, Ruby on Rails, shadcn/ui, Tailwind CSS, Templ, Vitest
- **Languages:** CSS*, Go, HTML*, Java, JavaScript, Python, Ruby, SCSS*, TypeScript
- **Platforms:** Airflow*, AWS, AWS Bedrock, AWS EC2, AWS EKS, AWS ELB, AWS RDS, AWS S3, AWS Textract, Azure, BigQuery, Claude*, Databricks, Docker*, Figma*, GitHub Actions*, Google App Engine, Google Cloud, Heroku, Kubernetes*, LangFuse, Phoenix*, Pinecone, PostgreSQL, Recurly API, ServiceNow, Snowflake, Stripe, Supabase, Terraform*, Vercel, WordPress REST API*

## Left to the builder

- Where the helper lives and what it is called, following `src/lib/`.
- Tests for the helper: sorting order, author order inside a kind, unknown names last.
