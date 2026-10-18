import { defineConfig, fontProviders } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  build: {
    inlineStylesheets: "always",
  },
  integrations: [react()],
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
    locales: ["es", "en", "ja"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
