# Ayano.dev

Check out the live website at [https://www.ayano.software/](https://www.ayano.software/).

## Tech Stack

- **Framework**: Astro 5 with React integration
- **Styling**: Tailwind CSS with shadcn/ui components
- **Font**: DM Sans

## Project Structure

```
/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/      # Reusable components (including shadcn/ui)
│   ├── i18n/            # Internationalization (en, es, ja)
│   ├── layouts/         # Page layouts
│   ├── modules/         # Shared modules (Header, Footer)
│   ├── pages/           # Routes with language subdirectories
│   ├── sections/        # Page sections
│   └── lib/             # Utility functions
└── package.json
```

## Commands

All commands are run from the root of the project:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts local dev server at `localhost:3000`        |
| `npm run build`        | Build your production site to `./dist/`            |
| `npm run preview`      | Preview your build locally, before deploying       |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `npm run astro --help` | Get help using the Astro CLI                       |

## Internationalization

The site supports three languages:
- English (default): `/en/`
- Spanish: `/es/`
- Japanese: `/ja/`

Translations are managed in `src/i18n/`.

## Icons

- [Lucide Icons](https://lucide.dev/)
- [CircleFlags](https://github.com/HatScripts/circle-flags)
