import { Assets, Spritesheet } from "pixi.js";

const data = {
  meta: {
    size: { w: 453, h: 256 },
    scale: "1",
  },

  animations: {
    bird: ["birdFlapUp", "birdFlapMid", "birdFlapDown"],
    sparkles: [
      "sparkle0",
      "sparkle1",
      "sparkle2",
      "sparkle3",
      "sparkle2",
      "sparkle1",
    ],
  },

  frames: {
    background: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 0,
        y: 0,
        w: 144,
        h: 256,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 144,
        h: 256,
      },
      sourceSize: {
        w: 144,
        h: 256,
      },
    },

    ground: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 146,
        y: 0,
        w: 154,
        h: 56,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 154,
        h: 56,
      },
      sourceSize: {
        w: 154,
        h: 56,
      },
    },

    scoreboard: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 146,
        y: 58,
        w: 113,
        h: 58,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 113,
        h: 58,
      },
      sourceSize: {
        w: 113,
        h: 58,
      },
    },

    flappyBirdTitle: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 146,
        y: 173,
        w: 96,
        h: 22,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 96,
        h: 22,
      },
      sourceSize: {
        w: 96,
        h: 22,
      },
    },

    gameOverTitle: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 146,
        y: 199,
        w: 94,
        h: 19,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 94,
        h: 19,
      },
      sourceSize: {
        w: 94,
        h: 19,
      },
    },

    getReadyTitle: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 146,
        y: 221,
        w: 87,
        h: 22,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 87,
        h: 22,
      },
      sourceSize: {
        w: 87,
        h: 22,
      },
    },

    newLabel: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 146,
        y: 245,
        w: 16,
        h: 7,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 16,
        h: 7,
      },
      sourceSize: {
        w: 16,
        h: 7,
      },
    },

    plus: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 290,
        y: 231,
        w: 5,
        h: 5,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 5,
        h: 5,
      },

      sourceSize: {
        w: 5,
        h: 5,
      },
    },

    num0: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 288,
        y: 100,
        w: 7,
        h: 10,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 7,
        h: 10,
      },
      sourceSize: {
        w: 7,
        h: 10,
      },
    },

    num1: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 289,
        y: 118,
        w: 7,
        h: 10,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 7,
        h: 10,
      },
      sourceSize: {
        w: 7,
        h: 10,
      },
    },

    num2: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 289,
        y: 134,
        w: 7,
        h: 10,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 7,
        h: 10,
      },
      sourceSize: {
        w: 7,
        h: 10,
      },
    },

    num3: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 289,
        y: 150,
        w: 7,
        h: 10,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 7,
        h: 10,
      },
      sourceSize: {
        w: 7,
        h: 10,
      },
    },

    num4: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 287,
        y: 173,
        w: 7,
        h: 10,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 7,
        h: 10,
      },
      sourceSize: {
        w: 7,
        h: 10,
      },
    },

    num5: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 287,
        y: 185,
        w: 7,
        h: 10,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 7,
        h: 10,
      },
      sourceSize: {
        w: 7,
        h: 10,
      },
    },

    num6: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 165,
        y: 245,
        w: 7,
        h: 10,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 7,
        h: 10,
      },
      sourceSize: {
        w: 7,
        h: 10,
      },
    },

    num7: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 175,
        y: 245,
        w: 7,
        h: 10,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 7,
        h: 10,
      },
      sourceSize: {
        w: 7,
        h: 10,
      },
    },

    num8: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 185,
        y: 245,
        w: 7,
        h: 10,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 7,
        h: 10,
      },
      sourceSize: {
        w: 7,
        h: 10,
      },
    },

    num9: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 195,
        y: 245,
        w: 7,
        h: 10,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 7,
        h: 10,
      },
      sourceSize: {
        w: 7,
        h: 10,
      },
    },

    menuButton: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 246,
        y: 118,
        w: 40,
        h: 14,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 40,
        h: 14,
      },
      sourceSize: {
        w: 40,
        h: 14,
      },
    },

    okButton: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 246,
        y: 134,
        w: 40,
        h: 14,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 40,
        h: 14,
      },
      sourceSize: {
        w: 40,
        h: 14,
      },
    },

    rateButton: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 246,
        y: 150,
        w: 40,
        h: 14,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 40,
        h: 14,
      },
      sourceSize: {
        w: 40,
        h: 14,
      },
    },

    scoreButton: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 244,
        y: 173,
        w: 40,
        h: 14,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 40,
        h: 14,
      },
      sourceSize: {
        w: 40,
        h: 14,
      },
    },

    shareButton: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 242,
        y: 197,
        w: 40,
        h: 14,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 40,
        h: 14,
      },
      sourceSize: {
        w: 40,
        h: 14,
      },
    },

    startButton: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 242,
        y: 213,
        w: 40,
        h: 14,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 40,
        h: 14,
      },
      sourceSize: {
        w: 40,
        h: 14,
      },
    },

    pauseButton: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 287,
        y: 58,
        w: 13,
        h: 14,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 13,
        h: 14,
      },
      sourceSize: {
        w: 13,
        h: 14,
      },
    },

    playButton: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 287,
        y: 84,
        w: 13,
        h: 14,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 13,
        h: 14,
      },
      sourceSize: {
        w: 13,
        h: 14,
      },
    },

    birdFlapUp: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 264,
        y: 64,
        w: 17,
        h: 12,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 17,
        h: 12,
      },
      sourceSize: {
        w: 17,
        h: 12,
      },
    },

    birdFlapMid: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 264,
        y: 90,
        w: 17,
        h: 12,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 17,
        h: 12,
      },
      sourceSize: {
        w: 17,
        h: 12,
      },
    },

    birdFlapDown: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 223,
        y: 124,
        w: 17,
        h: 12,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 17,
        h: 12,
      },
      sourceSize: {
        w: 17,
        h: 12,
      },
    },

    pipeDown: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 302,
        y: 0,
        w: 26,
        h: 135,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 26,
        h: 135,
      },
      sourceSize: {
        w: 26,
        h: 135,
      },
    },

    pipeUp: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 330,
        y: 0,
        w: 26,
        h: 121,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 26,
        h: 121,
      },
      sourceSize: {
        w: 26,
        h: 121,
      },
    },

    instructions: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 152,
        y: 122,
        w: 59,
        h: 49,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 59,
        h: 49,
      },
      sourceSize: {
        w: 59,
        h: 49,
      },
    },

    bronzeMedal: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 302,
        y: 137,
        w: 22,
        h: 22,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 22,
        h: 22,
      },
      sourceSize: {
        w: 22,
        h: 22,
      },
    },

    silverMedal: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 266,
        y: 229,
        w: 22,
        h: 22,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 22,
        h: 22,
      },
      sourceSize: {
        w: 22,
        h: 22,
      },
    },

    goldMedal: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 242,
        y: 229,
        w: 22,
        h: 22,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 22,
        h: 22,
      },
      sourceSize: {
        w: 22,
        h: 22,
      },
    },

    platinumMedal: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 220,
        y: 144,
        w: 22,
        h: 22,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 22,
        h: 22,
      },
      sourceSize: {
        w: 22,
        h: 22,
      },
    },

    blackTex: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 302,
        y: 161,
        w: 16,
        h: 16,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 16,
        h: 16,
      },
      sourceSize: {
        w: 16,
        h: 16,
      },
    },

    whiteTex: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 302,
        y: 179,
        w: 16,
        h: 16,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 16,
        h: 16,
      },
      sourceSize: {
        w: 16,
        h: 16,
      },
    },

    gearsNotice: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 358,
        y: 0,
        w: 95,
        h: 7,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 95,
        h: 7,
      },
      sourceSize: {
        w: 95,
        h: 7,
      },
    },

    sparkle0: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 275,
        y: 110,
        w: 5,
        h: 5,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 5,
        h: 5,
      },
      sourceSize: {
        w: 5,
        h: 5,
      },
    },

    sparkle1: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 295,
        y: 74,
        w: 5,
        h: 5,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 5,
        h: 5,
      },
      sourceSize: {
        w: 5,
        h: 5,
      },
    },

    sparkle2: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 261,
        y: 110,
        w: 5,
        h: 5,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 5,
        h: 5,
      },
      sourceSize: {
        w: 5,
        h: 5,
      },
    },

    sparkle3: {
      anchor: { x: 0.5, y: 0.5 },
      frame: {
        x: 268,
        y: 110,
        w: 5,
        h: 5,
      },

      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 5,
        h: 5,
      },
      sourceSize: {
        w: 5,
        h: 5,
      },
    },
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
