import type { AssetsManifest } from "pixi.js";

/** The manifest for the assets used in the game. */
export const manifest: AssetsManifest = {
  bundles: [
    {
      name: "game",
      assets: [
        {
          alias: "spritesheet",
          src: `${import.meta.env.BASE_URL}assets/images/spritesheet.webp`,
        },
      ],
    },
  ],
};
