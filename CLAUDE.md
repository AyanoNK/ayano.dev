# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Astro, featuring a multilingual interface (English, Spanish, Japanese) showcasing professional experience, projects, and technical expertise. The site is deployed on Vercel and uses a purple/marine color theme.

## Development Commands

```bash
# Install dependencies (uses pnpm, not npm)
pnpm install

# Start development server on port 3000
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Architecture

### Tech Stack
- **Framework**: Astro v4 with React integration
- **Styling**: Tailwind CSS with custom theme (purple/marine color palette)
- **Internationalization**: Custom i18n implementation supporting English, Spanish, and Japanese
- **Analytics**: Vercel Speed Insights and custom web vitals tracking
- **Icons**: SimpleIcons and CircleFlags

### Project Structure

```
src/
├── components/     # Reusable Astro components (Card, Tech, Language, etc.)
├── layouts/        # Page layouts (IndexLayout, SectionLayout, WorkingLayout)
├── modules/        # Major page sections (Header, Footer, etc.)
├── pages/          # File-based routing with locale subfolders (/en, /es, /ja)
├── sections/       # Content sections (ExperienceSection, ProjectSection, etc.)
├── i18n/          # Internationalization utilities and translations
├── scripts/        # Client-side JavaScript (carousel functionality)
└── img/           # Images and SVG assets
```

### Internationalization

The i18n system is custom-built:
- **Configuration**: `src/i18n/ui.ts` contains all translations for en/es/ja locales
- **Utilities**: `src/i18n/utils.ts` provides `getLangFromUrl()` and `useTranslations()` helpers
- **Astro config**: Defines `defaultLocale: "en"` and `locales: ["es", "en", "ja"]`
- **Routing**: Locale-specific pages live in `src/pages/{locale}/` directories
- Translation keys use dot notation (e.g., `"index.experience.title"`)

### Styling System

- Custom Tailwind theme with branded colors defined in `tailwind.config.cjs`:
  - `darkpurple`: #28305f
  - `lightpurple`: #17244a
  - `marine`: #eeb674
  - `lightblue`: #ffe6d6
  - `whiter`: #e1e1ea
- Custom rainbow animation for special effects
- Dark mode support via class strategy
- Font: Open Sans from Google Fonts

### Key Components

- **Header/Footer**: Consistent navigation and contact information across all pages
- **ExperienceTimeline**: Displays professional work history with links
- **ProjectItem**: Showcases personal projects with video demos (webm format in `/public/webm/`)
- **Language switcher**: Enables navigation between en/es/ja versions
- **Carrousel**: Custom carousel implementation using HammerJS for touch gestures

## Adding New Content

### Adding a new translation key:
1. Add the key to all three locales (en, es, ja) in `src/i18n/ui.ts`
2. Use the `useTranslations` helper in components: `const t = useTranslations(lang); t("your.key")`

### Adding a new page:
1. Create `.astro` file in `src/pages/` (for default locale) or `src/pages/{locale}/` (for specific locale)
2. File name becomes the route (e.g., `about.astro` → `/about`)
3. Use appropriate layout wrapper (typically `IndexLayout.astro`)

### Adding project videos:
- Place `.webm` files in `public/webm/` directory
- Reference as `/webm/filename.webm` in components

## Important Notes

- This project uses **pnpm**, not npm
- The live site is at https://www.ayano.software/
- Analytics requires `PUBLIC_VERCEL_ANALYTICS_ID` environment variable
- All translations must be added to all three locales to avoid fallback issues
