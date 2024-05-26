import { Sound } from "@pixi/sound";
import { Assets, type Texture } from "pixi.js";

import { manifest } from "@app/assets/manifest";
import { type GameSpritesheet, getSpritesheet } from "@app/assets/spritesheet";

/** A little helper to easily access the resources of our game. */
export class Resources {
  /** The spritesheet with all our game textures. */
  public static spritesheet: GameSpritesheet;

  public static numbersTextures: Texture[] = [];

  public static fallSound: Sound;
  public static hitSound: Sound;
  public static pointSound: Sound;
  public static swooshSound: Sound;
  public static wingSound: Sound;

  /**
   * Initializes the resources of our game.
   * Needs to be called before trying to access any resource.
   */
  static async init() {
    await Assets.init({ manifest });
    Assets.backgroundLoadBundle("game");

    const spritesheet = await getSpritesheet();

    Resources.spritesheet = spritesheet;
    Resources.numbersTextures = [
      spritesheet.textures.num0,
      spritesheet.textures.num1,
      spritesheet.textures.num2,
      spritesheet.textures.num3,
      spritesheet.textures.num4,
      spritesheet.textures.num5,
      spritesheet.textures.num6,
      spritesheet.textures.num7,
      spritesheet.textures.num8,
      spritesheet.textures.num9,
    ];

    for (const tex of Object.values(
      Resources.spritesheet.textures,
    ) as Texture[]) {
      tex.source.scaleMode = "nearest";
    }

    // The most important sound is this, ensure it's loaded first.
    Resources.wingSound = Sound.from({
      url: "/assets/sounds/wing.ogg",
      preload: true,

      autoPlay: false,
      loop: false,
    });

    Resources.fallSound = Sound.from({
      url: "/assets/sounds/fall.ogg",
      preload: false,

      autoPlay: false,
      loop: false,
    });

    Resources.hitSound = Sound.from({
      url: "/assets/sounds/hit.ogg",
      preload: true,

      autoPlay: false,
      loop: false,
    });

    Resources.pointSound = Sound.from({
      url: "/assets/sounds/point.ogg",
      preload: true,

      autoPlay: false,
      loop: false,
    });

    Resources.swooshSound = Sound.from({
      url: "/assets/sounds/swoosh.ogg",
      preload: true,

      autoPlay: false,
      loop: false,
    });
  }
}
