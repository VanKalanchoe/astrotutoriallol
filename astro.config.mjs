import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import preact from "@astrojs/preact";

export default defineConfig({
  site: "https://vankalanchoe.netlify.app/",
  output: "server", // 🔥 IMPORTANT FIX

  integrations: [preact()],

  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"],
  },

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});