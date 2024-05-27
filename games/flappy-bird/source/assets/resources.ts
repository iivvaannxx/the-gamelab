import { Sound } from "@pixi/sound";
import { Assets, type Texture } from "pixi.js";

import { manifest } from "@app/assets/manifest";
import { type GameSpritesheet, getSpritesheet } from "@app/assets/spritesheet";

/** A little helper to easily access the resources of our game. */
export class Resources {
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

    for (const tex of Object.values(spritesheet.textures) as Texture[]) {
      // We use pixel art, so we want to avoid any smoothing.
      tex.source.scaleMode = "nearest";
    }

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

    Resources.wingSound = Resources.getSound("/assets/sounds/wing.ogg", true);
    Resources.pointSound = Resources.getSound("/assets/sounds/point.ogg", true);
    Resources.fallSound = Resources.getSound("/assets/sounds/fall.ogg", true);
    Resources.hitSound = Resources.getSound("/assets/sounds/hit.ogg", true);
    Resources.swooshSound = Resources.getSound(
      "/assets/sounds/swoosh.ogg",
      true,
    );
  }

  /**
   * Loads a sound from the specified URL.
   *
   * @param url - The URL of the sound file.
   * @param preload - Indicates whether the sound should be preloaded.
   * @returns A `Sound` object representing the loaded sound.
   */
  private static getSound(url: string, preload: boolean) {
    return Sound.from({
      url: url,
      preload: preload,

      autoPlay: false,
      loop: false,
    });
  }
}
