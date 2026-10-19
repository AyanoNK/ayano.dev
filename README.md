# Ayano.dev

Check out the live website at [https://www.ayano.dev/](https://www.ayano.dev/).

## Tech Stack

- **Framework**: Astro 7 with React integration
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **Font**: DM Sans, loaded with the Astro Fonts API

## Project Structure

```
/
├── public/                # Files served as-is (favicons, robots.txt, videos)
├── src/
│   ├── assets/            # Images, optimized by astro:assets
│   ├── components/        # Reusable components (shadcn/ui in ui/)
│   ├── content/           # Project data and per-language Markdown
│   ├── i18n/              # Translations (en, es, ja)
│   ├── layouts/           # Page layouts
│   ├── lib/               # Helpers
│   ├── modules/           # Shared page parts (title, language selector)
│   ├── pages/             # Routes; [lang]/ builds every language
│   ├── sections/          # Home page sections
│   ├── consts.ts          # Contact links
│   └── content.config.ts  # Content collection schemas
└── package.json
```

## Environment Variables

The build needs these in `.env` (or in the Vercel project settings):

| Variable   | Value                 |
| :--------- | :-------------------- |
| `GITHUB`   | GitHub profile URL    |
| `LINKEDIN` | LinkedIn profile URL  |
| `EMAIL`    | Contact email address |

## Commands

All commands are run from the root of the project:

| Command             | Action                                              |
| :------------------ | :-------------------------------------------------- |
| `pnpm install`      | Installs dependencies                               |
| `pnpm dev`          | Starts local dev server at `localhost:3000`         |
| `pnpm check`        | Type-checks the project with `astro check`          |
| `pnpm build`        | Builds the production site to `./dist/`             |
| `pnpm preview`      | Previews the build locally, before deploying        |
| `pnpm astro ...`    | Runs CLI commands like `astro add`, `astro preview` |
| `pnpm astro --help` | Gets help using the Astro CLI                       |

## Internationalization

The site supports three languages:

- English (default): `/en/`
- Spanish: `/es/`
- Japanese: `/ja/`

Translations are managed in `src/i18n/`. Visiting `/` sends visitors to the language their browser prefers.

## Icons

- [Lucide Icons](https://lucide.dev/)
