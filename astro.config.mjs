import { defineConfig, envField, fontProviders } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const site = "https://www.ayano.dev";
const defaultLocale = "en";
const locales = ["en", "es", "ja"];
// Projects that are no longer on the site.
const removedProjectSlugs = ["bank", "atlapetes"];

// https://astro.build/config
export default defineConfig({
  site,
  build: {
    inlineStylesheets: "always",
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => page !== `${site}/`,
      i18n: {
        defaultLocale,
        locales: Object.fromEntries(locales.map((locale) => [locale, locale])),
      },
    }),
  ],
  redirects: {
    "/cv":
      "https://mega.nz/file/GYU2RSjS#b0Aame20v7CdS0yVtuhSTOwqUhUTzJf-86ATJoB_DGc",
    "/mega": "https://mega.nz/folder/KU1QzQ7A#XuPIABxK0MZ7tQY7cxgbHg",
    // Removed projects send shared links to the projects list.
    ...Object.fromEntries(
      locales.flatMap((locale) =>
        removedProjectSlugs.map((slug) => [
          `/${locale}/projects/${slug}`,
          `/${locale}/projects`,
        ]),
      ),
    ),
  },
  env: {
    schema: {
      GITHUB: envField.string({
        context: "server",
        access: "public",
        url: true,
      }),
      LINKEDIN: envField.string({
        context: "server",
        access: "public",
        url: true,
      }),
      EMAIL: envField.string({ context: "server", access: "public" }),
      GITHUB_FINE_GRAINED_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "DM Sans",
      cssVariable: "--font-dm-sans",
      weights: ["100 1000"],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale,
    locales,
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
