import { Assets, Spritesheet } from "pixi.js";

// Generated via TexturePacker.
const data = {
  frames: {
    background: {
      // The actual width of the background tile is 8, but for some reason it causes bleeding.
      // Because it's a repeating texture on the X axis, we can't safely trim it to 6 without being noticeable.
      frame: { x: 0, y: 0, w: 6, h: 512 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 6, h: 512 },
      sourceSize: { w: 6, h: 512 }
    },
    bird: {
      frame: { x: 440, y: 0, w: 256, h: 256 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 256, h: 256 },
      sourceSize: { w: 256, h: 256 }
    },
    "bird-flap-1": {
      frame: { x: 704, y: 0, w: 256, h: 256 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 256, h: 256 },
      sourceSize: { w: 256, h: 256 }
    },
    "bird-flap-2": {
      frame: { x: 0, y: 520, w: 256, h: 256 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 256, h: 256 },
      sourceSize: { w: 256, h: 256 }
    },
    "bird-flap-white": {
      frame: { x: 264, y: 520, w: 256, h: 256 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 256, h: 256 },
      sourceSize: { w: 256, h: 256 }
    },
    "clouds-1": {
      frame: { x: 0, y: 784, w: 1024, h: 256 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 1024, h: 256 },
      sourceSize: { w: 1024, h: 256 }
    },
    "clouds-2": {
      frame: { x: 0, y: 1048, w: 1024, h: 256 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 1024, h: 256 },
      sourceSize: { w: 1024, h: 256 }
    },
    "clouds-3": {
      frame: { x: 0, y: 1312, w: 1024, h: 256 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 1024, h: 256 },
      sourceSize: { w: 1024, h: 256 }
    },
    ground: {
      frame: { x: 16, y: 0, w: 64, h: 64 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 64, h: 64 },
      sourceSize: { w: 64, h: 64 }
    },
    "pipe-body": {
      frame: { x: 88, y: 0, w: 156, h: 8 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 156, h: 8 },
      sourceSize: { w: 156, h: 8 }
    },
    "pipe-head": {
      frame: { x: 252, y: 0, w: 180, h: 75 },
      rotated: false,
      trimmed: false,
      spriteSourceSize: { x: 0, y: 0, w: 180, h: 75 },
      sourceSize: { w: 180, h: 75 }
    }
  },
  animations: {
    bird: ["bird", "bird-flap-1", "bird-flap-2"]
  },
  meta: {
    app: "https://www.codeandweb.com/texturepacker",
    version: "1.1",
    format: "RGBA8888",
    size: { w: 1024, h: 2048 },
    scale: "1"
  }
};

/**
 * Loads and parses the spritesheet where all our sprites are contained.
 * @returns A promise that resolves with the ready-to-use spritesheet.
 */
export async function loadSpritesheet() {
  const spritesheetTexture = await Assets.load("spritesheet");
  const spritesheet = new Spritesheet(spritesheetTexture, data);

  await spritesheet.parse();
  return spritesheet;
}
