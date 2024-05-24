import { Assets, type Texture } from "pixi.js";

import { manifest, soundsManifest } from "@app/assets/manifest";
import { type GameSpritesheet, getSpritesheet } from "@app/assets/spritesheet";
import { Sound } from "@pixi/sound";
import { type GameSpritesheet2, getSpritesheet2 } from "./spritesheet2";
import { type GameSpritesheet3, getSpritesheet3 } from "./spritesheet3";

/** A little helper to easily access the resources of our game. */
export class Resources {
  /** The spritesheet with all our game textures. */
  public static spritesheet: GameSpritesheet;

  public static spritesheet2: GameSpritesheet2;

  public static spritesheet3: GameSpritesheet3;

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
    Resources.spritesheet3 = await getSpritesheet3();

    for (const tex of Object.values(
      Resources.spritesheet3.textures,
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
