import { Assets, Spritesheet } from "pixi.js";

const data = {
  frames: {
    0: {
      frame: {
        x: 606,
        y: 431,
        w: 24,
        h: 36,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 24,
        h: 36,
      },
      sourceSize: {
        w: 24,
        h: 36,
      },
    },
    1: {
      frame: {
        x: 586,
        y: 431,
        w: 16,
        h: 36,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 16,
        h: 36,
      },
      sourceSize: {
        w: 16,
        h: 36,
      },
    },
    2: {
      frame: {
        x: 670,
        y: 391,
        w: 24,
        h: 36,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 24,
        h: 36,
      },
      sourceSize: {
        w: 24,
        h: 36,
      },
    },
    3: {
      frame: {
        x: 642,
        y: 391,
        w: 24,
        h: 36,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 24,
        h: 36,
      },
      sourceSize: {
        w: 24,
        h: 36,
      },
    },
    4: {
      frame: {
        x: 614,
        y: 391,
        w: 24,
        h: 36,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 24,
        h: 36,
      },
      sourceSize: {
        w: 24,
        h: 36,
      },
    },
    5: {
      frame: {
        x: 586,
        y: 391,
        w: 24,
        h: 36,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 24,
        h: 36,
      },
      sourceSize: {
        w: 24,
        h: 36,
      },
    },
    6: {
      frame: {
        x: 670,
        y: 351,
        w: 24,
        h: 36,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 24,
        h: 36,
      },
      sourceSize: {
        w: 24,
        h: 36,
      },
    },
    7: {
      frame: {
        x: 642,
        y: 351,
        w: 24,
        h: 36,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 24,
        h: 36,
      },
      sourceSize: {
        w: 24,
        h: 36,
      },
    },
    8: {
      frame: {
        x: 614,
        y: 351,
        w: 24,
        h: 36,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 24,
        h: 36,
      },
      sourceSize: {
        w: 24,
        h: 36,
      },
    },
    9: {
      frame: {
        x: 586,
        y: 351,
        w: 24,
        h: 36,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 24,
        h: 36,
      },
      sourceSize: {
        w: 24,
        h: 36,
      },
    },
    backgroundNight: {
      frame: {
        x: 2,
        y: 2,
        w: 288,
        h: 512,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 288,
        h: 512,
      },
      sourceSize: {
        w: 288,
        h: 512,
      },
    },
    backgroundDay: {
      frame: {
        x: 294,
        y: 2,
        w: 288,
        h: 512,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 288,
        h: 512,
      },
      sourceSize: {
        w: 288,
        h: 512,
      },
    },
    base: {
      frame: {
        x: 2,
        y: 518,
        w: 336,
        h: 112,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 336,
        h: 112,
      },
      sourceSize: {
        w: 336,
        h: 112,
      },
    },
    pipeGreen: {
      frame: {
        x: 586,
        y: 2,
        w: 52,
        h: 320,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 52,
        h: 320,
      },
      sourceSize: {
        w: 52,
        h: 320,
      },
    },
    pipeRed: {
      frame: {
        x: 642,
        y: 2,
        w: 52,
        h: 320,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 52,
        h: 320,
      },
      sourceSize: {
        w: 52,
        h: 320,
      },
    },
    message: {
      frame: {
        x: 2,
        y: 634,
        w: 184,
        h: 267,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 184,
        h: 267,
      },
      sourceSize: {
        w: 184,
        h: 267,
      },
    },
    gameOver: {
      frame: {
        x: 342,
        y: 518,
        w: 192,
        h: 42,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 192,
        h: 42,
      },
      sourceSize: {
        w: 192,
        h: 42,
      },
    },
    pipeHead: {
      frame: {
        x: 586,
        y: 326,
        w: 52,
        h: 21,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 52,
        h: 21,
      },
      sourceSize: {
        w: 52,
        h: 21,
      },
    },
    pipeBody: {
      frame: {
        x: 642,
        y: 326,
        w: 50,
        h: 3,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 50,
        h: 3,
      },
      sourceSize: {
        w: 50,
        h: 3,
      },
    },
    yellowBirdUpFlap: {
      frame: {
        x: 634,
        y: 431,
        w: 34,
        h: 24,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 34,
        h: 24,
      },
      sourceSize: {
        w: 34,
        h: 24,
      },
    },
    yellowBirdMidFlap: {
      frame: {
        x: 586,
        y: 471,
        w: 34,
        h: 24,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 34,
        h: 24,
      },
      sourceSize: {
        w: 34,
        h: 24,
      },
    },
    yellowBirdDownFlap: {
      frame: {
        x: 624,
        y: 471,
        w: 34,
        h: 24,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 34,
        h: 24,
      },
      sourceSize: {
        w: 34,
        h: 24,
      },
    },
    redBirdUpFlap: {
      frame: {
        x: 662,
        y: 471,
        w: 34,
        h: 24,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 34,
        h: 24,
      },
      sourceSize: {
        w: 34,
        h: 24,
      },
    },
    redBirdMidFlap: {
      frame: {
        x: 538,
        y: 518,
        w: 34,
        h: 24,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 34,
        h: 24,
      },
      sourceSize: {
        w: 34,
        h: 24,
      },
    },
    redBirdDownFlap: {
      frame: {
        x: 576,
        y: 518,
        w: 34,
        h: 24,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 34,
        h: 24,
      },
      sourceSize: {
        w: 34,
        h: 24,
      },
    },
    blueBirdUpFlap: {
      frame: {
        x: 614,
        y: 518,
        w: 34,
        h: 24,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 34,
        h: 24,
      },
      sourceSize: {
        w: 34,
        h: 24,
      },
    },
    blueBirdMidFlap: {
      frame: {
        x: 652,
        y: 518,
        w: 34,
        h: 24,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 34,
        h: 24,
      },
      sourceSize: {
        w: 34,
        h: 24,
      },
    },
    blueBirdDownFlap: {
      frame: {
        x: 342,
        y: 564,
        w: 34,
        h: 24,
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: 34,
        h: 24,
      },
      sourceSize: {
        w: 34,
        h: 24,
      },
    },
  },

  animations: {
    blueBird: ["blueBirdUpFlap", "blueBirdMidFlap", "blueBirdDownFlap"],
    redBird: ["redBirdUpFlap", "redBirdMidFlap", "redBirdDownFlap"],
    yellowBird: ["yellowBirdUpFlap", "yellowBirdMidFlap", "yellowBirdDownFlap"],
  },

  meta: {
    app: "https://umesh-kc.itch.io/free-texture-atlas-generator-web-app",
    size: { w: 698, h: 903 },
    scale: "1",
  },
};

/** The type definitions for our game spritesheet. */
export type GameSpritesheet2 = Spritesheet<typeof data>;

/** A record with all the animated textures of the game. */
export type Animations2 = GameSpritesheet2["animations"];

/** A record with all the static textures of the game. */
export type Textures2 = GameSpritesheet2["textures"];

// A global reference to the game spritesheet with all our textures.
let spritesheet: GameSpritesheet2;

/**
 * Loads and parses the spritesheet where all our sprites are contained.
 * @returns A promise that resolves with the ready-to-use spritesheet.
 */
export async function getSpritesheet2() {
  if (spritesheet) {
    return spritesheet;
  }

  const spritesheetTexture = await Assets.load("spritesheet2");
  spritesheet = new Spritesheet(spritesheetTexture, data);

  await spritesheet.parse();
  return spritesheet;
}
