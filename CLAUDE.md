# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workflow

Every change goes through a pull request against `main`. Never push to `main` directly.

1. Branch from the latest `origin/main`. Base every PR on `main`, not on another PR's branch: GitHub does not always retarget a stacked PR, and the change can merge into the other branch instead of `main`.
2. Before opening the PR, run `pnpm check`, `pnpm build` and `pnpm exec prettier --check src`. All three must pass.
3. Run `/astro-dev:astro-review` on the branch. Fix every FAIL that the change introduced before opening the PR.
4. Open the PR, then run `/astro-dev:astro-code-review` on it. Fix any findings in the same PR.
5. In the PR description, report the results of the commands and both reviews.
6. Once the PR is merged, clean up. First confirm `gh pr view <number> --json state,baseRefName` shows `MERGED` into `main`. Then switch to `main`, pull, and delete the PR's local branch, its branch on GitHub, and any worktree made for it.
   - Before removing a worktree, check it for uncommitted changes and for commits not on `main`. Save anything that would be lost, or ask first.
   - Do not touch a worktree locked by another session that is still running.

## Commands

```bash
pnpm dev        # Dev server on localhost:3000
pnpm check      # astro check (type check)
pnpm build      # Static build to ./dist/
pnpm preview    # Serve the built site
pnpm exec prettier --check src   # Formatting
pnpm test       # Vitest
```

Vitest covers `src/lib/showcase/`. There is no linter.

- `astro check` needs TypeScript 6. TypeScript 7 does not ship the API it uses, so keep `typescript` on `^6`.
- The build reads `GITHUB`, `LINKEDIN`, `EMAIL` and `GITHUB_FINE_GRAINED_TOKEN` through `astro:env` (declared in `astro.config.mjs`). It fails if they are missing from `.env` or the Vercel project.
- `pnpm check` and `pnpm build` fetch the projects from GitHub with that token, so they need network access.
- `sharp` must stay installed. Without it `astro:assets` does not resize images.

## Architecture

A static personal portfolio built with Astro 7, React islands and Tailwind CSS 4, deployed on Vercel. The package manager is pnpm.

### Routing and i18n

Three locales: `en` (default), `es`, `ja`. `prefixDefaultLocale` is `true`, so every page lives under a locale prefix.

- `src/pages/[lang]/index.astro` and `src/pages/[lang]/projects/[slug].astro` build every locale from `getStaticPaths`. There are no per-locale page copies.
- `src/pages/index.astro` is not a real page. An inline script sends the visitor to `/<browser language>/`.
- Read the locale with `getLang(Astro.currentLocale)` from `src/i18n/utils.ts`, and build links with `getRelativeLocaleUrl()` from `astro:i18n`. Do not parse `Astro.url.pathname` or hard-code `/${lang}/`.
- Translations live in `src/i18n/ui.ts`, with the `index.*` sections split into `src/i18n/index/*.ts`. Each leaf is `{ en, es, ja }`. `useTranslations(lang)` returns `t(key)` for dot-path keys and returns the key itself when it is missing.
- `/cv` and `/mega` are external redirects in `redirects` in `astro.config.mjs`.
- The sitemap comes from `@astrojs/sitemap`, with `/` filtered out. `public/robots.txt` points to `sitemap-index.xml`.

### Content

Projects come from GitHub at build time. `src/lib/showcase/loader.ts` lists the AyanoNK repos that `GITHUB_FINE_GRAINED_TOKEN` can see and reads each one's `docs/showcase/` folder (`project-en.md`, `project-es.md`, `project-jp.md` and media). Repos without that folder are skipped. The token also lists every public repo, so the folder is what puts a project on the site. The format is in `docs/superpowers/specs/2026-10-18-github-projects-design.md`.

Two collections in `src/content.config.ts`, both filled by that loader:

- `projects`: one entry per repo, id = repo name. `getProjects()` in `src/lib/projects.ts` returns them newest first (repo creation date).
- `projectDetails`: the rendered write-up per language. Its entry ids are `<lang>/<repo name>`.

The `portfolio-highlight` and `portfolio-big-highlight` repo topics pick the home page cards (`selectHome()` in `src/lib/showcase/select.ts`). Downloads go to `.showcase-cache/` and videos to `public/showcase/`, both gitignored.

The project page loads both collections in `getStaticPaths` and passes them as props to `src/modules/ProjectDetailShared.astro`.

### Layouts and components

- `BaseLayout.astro` owns `<head>` (title, description, `<html lang>`, the DM Sans `<Font>`) and the body background. `IndexLayout` and `ProjectLayout` wrap it, and every page passes its own `title` and `description`.
- Folders: pages → layouts → `src/modules/` (shared page parts) → `src/sections/` (home page sections, each loads its own data and translations) → `src/components/`.
- Prefer `.astro` components for anything static. React is only for interactive islands. Today the only island is `CertificationCard.tsx` (`client:visible`), built on the shadcn/ui pieces in `src/components/ui/`. `Card` from `ui/card.tsx` is also rendered statically, which is fine because the island reuses it.
- Islands cannot use `astro:assets` components. Call `getImage()` in the parent `.astro` file and pass plain `src`, `width` and `height` (see `CertificationSection.astro`).
- Site-wide constants such as the contact links live in `src/consts.ts`.

### Styling and assets

- Tailwind 4 runs through `@tailwindcss/vite`. There is no `tailwind.config.*`. Theme tokens (colors such as `darkpurple`, the `shadow-shadow*` offsets and the `boxShadowX/Y` translate values) are in `@theme` in `tailwind.css`. Light and dark values are CSS variables on `:root` and `.dark`.
- DM Sans loads through the Astro Fonts API (`fonts` in `astro.config.mjs`) as `--font-dm-sans`.
- Content images go in `src/assets/` and render with `<Image />`. `public/` holds only files served as-is: favicons and `robots.txt` (plus the generated `public/showcase/`).
- Use `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) with CVA for variant classes.
- Rendered Markdown is styled with `:global()` rules under `.markdown-content` in `ProjectDetailShared.astro`.
- Prettier uses `prettier-plugin-astro` and `prettier-plugin-tailwindcss` (`tailwindStylesheet: ./tailwind.css`), with `bracketSameLine: true`.

`@/*` maps to `./src/*`.
