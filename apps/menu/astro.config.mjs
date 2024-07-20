import icon from "astro-icon";
import { defineConfig, squooshImageService } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";

const makeGameURL = (slug) => `https://thegamelab.dev/${slug}`;

// https://astro.build/config
export default defineConfig({
  site: "https://thegamelab.dev",

  srcDir: "source",
  outDir: "build",
  output: "static",

  compressHTML: true,
  image: {
    service: squooshImageService(),
  },

  integrations: [
    tailwind({ applyBaseStyles: false }),
    icon({
      iconDir: "source/assets/icons",

      // See: https://github.com/natemoo-re/astro-icon/issues/195
      svgoOptions: {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                cleanupIds: false,
              },
            },
          },
        ],
      },
    }),

    robotsTxt(),
    sitemap({
      customPages: [makeGameURL("flappy-bird")],
    }),
  ],
});
