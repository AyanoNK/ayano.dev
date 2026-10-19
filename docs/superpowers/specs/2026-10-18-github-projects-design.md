# Projects from GitHub

## Why

Today the projects on the site are written by hand in this repo: `src/content/projects.json`, the write-ups in `src/content/projects/{en,es,ja}/`, the translation keys in `src/i18n/`, the card images in `src/assets/projects/` and the videos in `public/webm/`. Adding or changing a project means a PR here.

The goal is that each project describes itself in its own GitHub repo, and the site picks it up. Some of those repos are private, and they still need to show on the site.

## Goals

- A new page that lists every project on the site. Clicking one opens its details page, as the home page cards do today.
- The list of projects, their text and their media come from Ayano's GitHub repos (github.com/AyanoNK), private ones included.
- The home page projects section keeps its current look: one big featured card and three small cards. Which repos go there is set by GitHub topics.
- All three languages (`en`, `es`, `ja`) keep translated titles, descriptions and write-ups.
- The site rebuilds itself once a week to pick up changes.

## Non-goals

- Live updates. Changes show up on the next rebuild, not right away.
- Showing code, commits or anything else from a private repo beyond what is in its `docs/showcase/` folder.
- A per-project order number or featured flag inside the repo files. Order and featured status come only from topics and creation dates.

## Anti-goals

- Anything that makes a private repo's code or files public beyond `docs/showcase/`.
- Links on the site that send visitors to a private repo (a 404 for them).
- Breaking links to the current project pages that have already been shared.

## What a repo needs

### Which repos show up

The GitHub token decides. Ayano gives the fine-grained token access to only the repos that should show on the site. A repo the token can see shows up if it has a `docs/showcase/` folder on its default branch. A repo without that folder is skipped (logged at debug level, plus one "loaded N of M repos" line), because a fine-grained token can always read public repos and GitHub may list them too.

There is no `portfolio-tracker` topic.

### GitHub topics

| Topic | Meaning |
| --- | --- |
| `portfolio-highlight` | The repo also shows as a small card on the home page. |
| `portfolio-big-highlight` | The repo gets the big featured card on the home page. |


### The `docs/showcase/` folder

```
docs/showcase/
  project-en.md
  project-es.md
  project-jp.md
  cover.webp                      big picture above the title on the details page
  portfolio-highlight.webp        media for the small home page card
  portfolio-big-highlight.webm    media for the big home page card
  01-login.png                    carousel items
  02-home.mp4
  ...
```

- `project-jp.md` is the Japanese file and maps to the site's `ja` locale.
- If `project-es.md` or `project-jp.md` is missing, that language uses `project-en.md`. `project-en.md` is required. A repo with a `docs/showcase/` folder but no `project-en.md` fails the build with an error that names the repo.
- Media files can be pictures or videos. `cover`, `portfolio-highlight` and `portfolio-big-highlight` are matched by name, with any supported extension.
- A repo only needs the media files for the places it appears: `portfolio-highlight.*` if it has that topic, `portfolio-big-highlight.*` if it has that one. `cover.*` is optional; without it the details page has no big picture, as some projects do today.
- Every other picture or video in the folder goes in the carousel, sorted by file name.

### The `project-xy.md` files

```md
---
technologies: [Kotlin, Jetpack Compose, Material3]
links:
  - title: Play Store
    url: https://play.google.com/store/apps/details?id=...
---

# Bank SMS Manager

Short description, used on the cards and as the page description.

The long write-up, in Markdown...
```

- **Header** (only read from `project-en.md`; the other languages do not repeat it):
  - `technologies`: the tech badges, shown as written.
  - `links`: extra links shown on the details page. Optional.
- **Title**: the first `#` heading of the file for that language.
- **Short description**: the first paragraph under the title.
- **Long write-up**: everything after the short description, rendered as Markdown on the details page.
- **Pictures and links inside the write-up** (calls made while writing this up): a relative picture such as `![](01-login.png)` must point to a file inside `docs/showcase/`. The build downloads it and serves it from the site like the other media. A relative picture or link that points outside `docs/showcase/` fails the build with an error naming the repo and the path. Full `https://` links are left alone.

## How the site uses it

### Finding the repos

At build time, the site uses a GitHub token to list the repos owned by Ayano that it can see (private included). For each one that has `docs/showcase/`, it reads `docs/showcase/` from the repo's default branch: the three Markdown files and the media.

Media from private repos can't be loaded by a visitor's browser, so the build downloads every media file it uses and serves it from the site. Pictures go through `astro:assets` so they are resized as today.

### Project address

A project's address is its repo name: `/<lang>/projects/<repo name>/`.

The four current projects move to new addresses, and the old ones redirect:

| Old | New |
| --- | --- |
| `/<lang>/projects/bank/` | `/<lang>/projects/bank-sms-manager/` |
| `/<lang>/projects/kimon/` | `/<lang>/projects/kimon/` (unchanged: the repo is now named `kimon`) |
| `/<lang>/projects/atlapetes/` | `/<lang>/projects/atlapetes-blancae/` |
| `/<lang>/projects/poshaus/` | `/<lang>/projects/poshaus/` (unchanged) |

### Order

The highlights are found by topic, so the home page may have fewer than four. Empty spots are hidden; the build does not fail (call made while writing this up). If no repo has either highlight topic, the home page projects section shows only the "see all projects" link.

Everywhere, "newest" means the date the repo was created on GitHub.

- **Projects list page**: every repo on the site, newest first.
- **Big featured card**: the newest repo with `portfolio-big-highlight`. If no repo has it, the newest repo with `portfolio-highlight` takes the spot (using its `portfolio-big-highlight.*` file if it has one, otherwise its `portfolio-highlight.*` file).
- **Small cards**: the three newest repos with `portfolio-highlight`, not counting the one in the big card. Extra `portfolio-big-highlight` repos that lost the big spot are not added as small cards unless they also have `portfolio-highlight`.

### Home page cards

Same layout as today in `src/sections/ProjectSection.astro`.

- Title and description: from the `project-xy.md` for the page's language.
- Tech badges: from the `project-en.md` header.
- Media: `portfolio-big-highlight.*` for the big card, `portfolio-highlight.*` for small cards. A picture shows as an image, a video plays muted on loop as today.

### Projects list page

A new page at `/<lang>/projects/` in all three languages, listing every project newest first. Each item is a card like the small home page card (title, description, badges, the `portfolio-highlight.*` media if the repo has it) and links to the details page. The home page projects section gets a "see all projects" link to it. The site has no header or nav bar, and this change does not add one.

### Details page

In order, top to bottom:

1. `cover.*`, if present.
2. The title.
3. The tech badges.
4. The long write-up.
5. Links: a GitHub button only if the repo is public, then the `links` from the header.
6. A carousel with the remaining pictures and videos, if there are any. It replaces today's single demo video.

The page `<title>` and description come from the title and short description for that language.

### Weekly rebuild

A GitHub Action in this repo calls a Vercel deploy hook once a week, and has a manual "Run workflow" button. The deploy hook URL is a repo secret.

### GitHub access

A fine-grained GitHub token with read-only access to contents and metadata on only the repos that should show on the site. It is read through `astro:env` like `GITHUB`, `LINKEDIN` and `EMAIL`, set in Vercel and in the local `.env`. If GitHub can't be reached or the token is missing, the build fails and Vercel keeps serving the last good version.

## Bootstrap skill

A Claude Code skill, built with `/skill-creator`, that sets up `docs/showcase/` in any repo so it is ready for the site.

- **Where it lives** (call made while writing this up): `~/.claude/skills/portfolio-showcase/`, so it can run from inside any repo, not only this one.
- **What it does**, run from the root of a repo:
  1. Reads the repo (README, `package.json` or similar, the code) to learn what the project is and which tools it uses.
  2. Writes `docs/showcase/project-en.md`, `project-es.md` and `project-jp.md` in the format above: the header with `technologies` and any `links`, the title, the short description and a first draft of the write-up, translated into Spanish and Japanese.
  3. Lists the media files the repo still needs (`cover.*`, `portfolio-highlight.*`, `portfolio-big-highlight.*`, carousel items) and copies in any that the user points to. It does not invent pictures.
  4. Reminds the user to give the site's GitHub token access to the repo, and says which highlight topics to add if wanted, and the `gh repo edit --add-topic` command for them. It does not change topics or commit without the user saying so.
- **If `docs/showcase/` already exists**, it fills in only what is missing and does not overwrite files.
- **First test repo**: `/Users/ayano/melodia-stereo-bogota` (private, an Astro site).
- The skill is also how the four current projects get their `docs/showcase/` folder (next section), with this repo's existing text and media as the source instead of a fresh draft.

## Moving the four current projects

For `bank-sms-manager`, `kanji-lyrics-frontend`, `atlapetes-blancae` and `poshaus`:

Ayano does this part by hand in those repos, in parallel with the site work. The site work makes no commits, PRs or topic changes in other repos. The bootstrap skill is tested by running it in `/Users/ayano/melodia-stereo-bogota` and leaving the files there uncommitted for Ayano to review.

The site PR must not merge until at least the four repos have their `docs/showcase/` folder and topics, or the home page loses its projects.

1. Add `docs/showcase/` to the repo, built from what this repo has today:
   - `project-en.md`, `project-es.md`, `project-jp.md` from `src/content/projects/{en,es,ja}/<id>.md`, with the title and short description taken from the translation keys in `src/i18n/`, and the `technologies` and `links` from `src/content/projects.json`.
   - `cover.*` and `portfolio-highlight.*` from `src/assets/projects/mini_<id>.webp`.
   - `portfolio-big-highlight.*` from `public/webm/<id>.webm` for the repo that gets the big card.
   - The demo video `public/webm/<id>.webm` as the first carousel item.
2. Give the site's token access to all four repos. Add `portfolio-highlight` to the three that are small cards today, and `portfolio-big-highlight` to `bank-sms-manager`.

The existing `Play Store (soon)` link pointing at `#` moves into the `bank-sms-manager` header as it is.

Note that with creation-date order, the home page order may differ from today's hand-set order.

Once the site reads from GitHub, this repo drops `src/content/projects.json`, `src/content/projects/`, the project translation keys, `src/assets/projects/` and `public/webm/`.

## Left to the builder

- How the GitHub data reaches Astro (a custom content loader is the natural fit with the existing collections).
- The carousel component and how it behaves. It should be an `.astro` component unless it needs to be an island.
- The exact list of supported picture and video extensions.
- Wording of new translation strings ("All projects", "See all projects").
- Name of the token env var and of the workflow file.
