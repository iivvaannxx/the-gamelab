import { Assets, Spritesheet } from "pixi.js";

// Generated via TexturePacker.
const data = {
  frames: {
    bird: {
      frame: { x: 424, y: 0, w: 256, h: 256 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 256, h: 256 },
      sourceSize: { w: 256, h: 256 },
    },
    birdFlap1: {
      frame: { x: 688, y: 0, w: 256, h: 256 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 256, h: 256 },
      sourceSize: { w: 256, h: 256 },
    },
    birdFlap2: {
      frame: { x: 0, y: 264, w: 256, h: 256 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 256, h: 256 },
      sourceSize: { w: 256, h: 256 },
    },
    birdFlapWhite: {
      frame: { x: 264, y: 264, w: 256, h: 256 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 256, h: 256 },
      sourceSize: { w: 256, h: 256 },
    },
    clouds1: {
      frame: { x: 0, y: 528, w: 1024, h: 256 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 1024, h: 256 },
      sourceSize: { w: 1024, h: 256 },
    },
    clouds2: {
      frame: { x: 0, y: 792, w: 1024, h: 256 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 1024, h: 256 },
      sourceSize: { w: 1024, h: 256 },
    },
    clouds3: {
      frame: { x: 0, y: 1056, w: 1024, h: 256 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 1024, h: 256 },
      sourceSize: { w: 1024, h: 256 },
    },
    ground: {
      frame: { x: 0, y: 0, w: 64, h: 64 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
      sourceSize: { w: 64, h: 64 },
    },
    pipeBody: {
      frame: { x: 72, y: 0, w: 156, h: 8 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 156, h: 8 },
      sourceSize: { w: 156, h: 8 },
    },
    pipeHead: {
      frame: { x: 236, y: 0, w: 180, h: 75 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 180, h: 75 },
      sourceSize: { w: 180, h: 75 },
    },
  },

  animations: {
    bird: ["bird", "birdFlap1", "birdFlap2"],
  },

  meta: {
    app: "https://www.codeandweb.com/texturepacker",
    version: "1.1",
    format: "RGBA8888",
    size: { w: 1024, h: 2048 },
    scale: "1",
  },
};

/** The type definitions for our game spritesheet. */
export type GameSpritesheet = Spritesheet<typeof data>;

/** A record with all the animated textures of the game. */
export type Animations = GameSpritesheet["animations"];

/** A record with all the static textures of the game. */
export type Textures = GameSpritesheet["textures"];

// A global reference to the game spritesheet with all our textures.
let spritesheet: GameSpritesheet;

/**
 * Loads and parses the spritesheet where all our sprites are contained.
 * @returns A promise that resolves with the ready-to-use spritesheet.
 */
export async function getSpritesheet() {
  if (spritesheet) {
    return spritesheet;
  }

  const spritesheetTexture = await Assets.load("spritesheet");
  spritesheet = new Spritesheet(spritesheetTexture, data);

  await spritesheet.parse();
  return spritesheet;
}
