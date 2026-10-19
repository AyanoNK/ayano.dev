import { defineConfig, envField, fontProviders } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://www.ayano.dev",
  build: {
    inlineStylesheets: "always",
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => page !== "https://www.ayano.dev/",
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", es: "es", ja: "ja" },
      },
    }),
  ],
  redirects: {
    "/cv":
      "https://mega.nz/file/GYU2RSjS#b0Aame20v7CdS0yVtuhSTOwqUhUTzJf-86ATJoB_DGc",
    "/mega": "https://mega.nz/folder/KU1QzQ7A#XuPIABxK0MZ7tQY7cxgbHg",
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
    defaultLocale: "en",
    locales: ["en", "es", "ja"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
