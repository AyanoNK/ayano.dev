import { defineConfig } from "astro/config";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), icon()],
  i18n: {
    defaultLocale: "en",
    locales: ["es", "en", "ja"],
  },
});
