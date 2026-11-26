# CV print page

## Why

Enhancv is being dropped. The CV ("CV_2026", Enhancv "double" template) has to live in this repo as a page that looks the same, can be edited locally and prints to a one-page PDF.

## Goals

- A page at `/resume` that matches the CV_2026 PDF (`~/Downloads/CV_2026_2.pdf`): same two columns, widths, alignment, fonts, colors, icons, rules and spacing.
- Printing it from the browser (A4, default margins off) gives exactly one page.
- All CV text lives in one typed data file, so editing the CV means editing that file.
- The page is published with the site.

## Non-goals

- Translations. English only.
- Sharing content with the site's experience collections. The CV keeps its own wording.
- A PDF build step. The PDF comes from the browser's print dialog.
- Changing the `/cv` redirect.

## Approaches

- **A. Astro page with its own data file** (picked). Static `.astro` parts with Tailwind, data in `src/data/cv.ts`, print CSS for A4. Uses the repo's tools and adds no packages.
- B. Plain HTML file outside Astro. Skips formatting and type checks and repeats the font setup.
- C. Reuse the experience collections. The wording differs, so it would tie two versions of the text together.

## Design

- **Data:** `src/data/cv.ts` exports one typed `cv` object: header (name, title, email, site, LinkedIn, location), experience, projects, skill groups, strengths, education, certifications, languages (level 1-5 plus label) and references. Content is copied from the current Enhancv resume.
- **Page:** `src/pages/resume.astro`. It does not use `BaseLayout` (that adds the site background and locale). It has its own small `<head>` with the title and fonts. Left out of the sitemap.
- **Layout:** an A4 sheet (210 x 297 mm) centered on a gray screen background. Header across the top, then two columns at the PDF's ratio (about 58% / 42%) with the same gap.
- **Parts** in `src/components/cv/`: `CvHeader`, `CvSection` (title with the thick rule), `CvEntry` (role or project: title, date, location with tech list on the right, link, description, bullets), `CvTags`, `CvStrength`, `CvEducation` (with the GPA box), `CvLanguage` (five-bar meter), `CvReference`.
- **Style:** Raleway for section titles and the name, Open Sans for body, loaded with the Astro Fonts API. Black text, `#880808` accent. Icons from `@lucide/astro` that match the Enhancv ones (calendar, map pin, link, at sign; a figure and gears for strengths). The faint triangle pattern behind the header is drawn with an inline SVG.
- **Print:** `@page { size: A4; margin: 0 }`, screen background and shadow removed, colors forced to print, entries kept from splitting across pages.

## Left to the builder

- Exact sizes and spacing, matched by eye against the PDF.
- The closest lucide icon for each Enhancv icon.
