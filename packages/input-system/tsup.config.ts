import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    keyboard: "./source/keyboard/index.ts",
    mouse: "./source/mouse/index.ts",
    touch: "./source/touch/index.ts",
    index: "./source/index.ts",
  },

  format: "esm",
  platform: "browser",
  target: "es6",
  outDir: "dist",

  bundle: true,
  treeshake: true,
  splitting: true,
  dts: true,

  minifySyntax: true,
  minifyIdentifiers: true,
  sourcemap: true,
});
