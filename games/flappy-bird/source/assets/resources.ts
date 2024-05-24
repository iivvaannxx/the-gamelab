import { Sound } from "@pixi/sound";
import { Assets, type Texture } from "pixi.js";

import { manifest } from "@app/assets/manifest";
import { type GameSpritesheet, getSpritesheet } from "@app/assets/spritesheet";

/** A little helper to easily access the resources of our game. */
export class Resources {
  /** The spritesheet with all our game textures. */
  public static spritesheet: GameSpritesheet;

  public static dieSound: Sound;
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

    Resources.spritesheet = await getSpritesheet();

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

    Resources.dieSound = Sound.from({
      url: "/assets/sounds/die.ogg",
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
