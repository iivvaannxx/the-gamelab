import type { AssetsManifest } from "pixi.js";

/** The manifest for the assets used in the game. */
export const manifest: AssetsManifest = {
  bundles: [
    {
      name: "game",
      assets: [
        {
          alias: "spritesheet",
          src: "/assets/spritesheet.webp",
        },

        {
          alias: "spritesheet2",
          src: "/assets/spritesheet2.webp",
        },
      ],
    },
  ],
};

export const soundsManifest = [
  {
    alias: "dieSound",
    src: "/assets/sounds/die.ogg",
  },

  {
    alias: "hitSound",
    src: "/assets/sounds/hit.ogg",
  },

  {
    alias: "pointSound",
    src: "/assets/sounds/point.ogg",
  },

  {
    alias: "swooshSound",
    src: "/assets/sounds/swoosh.ogg",
  },

  {
    alias: "wingSound",
    src: "/assets/sounds/wing.ogg",
  },
];
