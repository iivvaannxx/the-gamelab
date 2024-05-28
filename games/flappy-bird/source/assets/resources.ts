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

    Resources.wingSound = Resources.getSound(["wing.mp3"]);
    Resources.fallSound = Resources.getSound(["fall.mp3"]);
    Resources.hitSound = Resources.getSound(["hit.mp3"]);
    Resources.swooshSound = Resources.getSound(["swoosh.mp3"]);
    Resources.pointSound = Resources.getSound(["point.mp3"], (sound) => {
      // Lower the volume of the point sound (it's a bit too high).
      sound.volume = 0.5;
    });
  }

  /**
   * Loads a sound from the specified URL.
   *
   * @param url The URL of the sound file.
   * @param onLoad A callback that will be called when the sound is loaded.
   * @returns A `Sound` object representing the loaded sound.
   */
  private static getSound(sources: string[], onLoad?: (sound: Sound) => void) {
    return Sound.from({
      url: sources.map((src) => `/assets/sounds/${src}`),
      preload: true,

      autoPlay: false,
      loop: false,

      loaded: (_err, sound) => {
        if (sound) {
          onLoad?.(sound);
        }
      },
    });
  }
}
