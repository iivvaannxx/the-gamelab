import { defineConfig } from "vite";

import { VitePWA } from "vite-plugin-pwa";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/flappy-bird/" : "/",
  plugins: [
    tsConfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Flappy Bird",
        short_name: "Flappy Bird",
        description:
          "🎮 A clone of the popular Flappy Bird game. Made with Typescript and Pixi.js",

        theme_color: "#121212",
        background_color: "#121212",
        display: "standalone",

        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,png,webp,xml,ico,ogg}"],
      },
    }),
  ],
});
