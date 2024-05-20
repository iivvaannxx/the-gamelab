import { Assets } from "pixi.js";

import { manifest } from "@app/assets/manifest";
import { type GameSpritesheet, getSpritesheet } from "@app/assets/spritesheet";

/** A little helper to easily access the resources of our game. */
export class Resources {
  /** The spritesheet with all our game textures. */
  public static spritesheet: GameSpritesheet;

  /**
   * Initializes the resources of our game.
   * Needs to be called before trying to access any resource.
   */
  static async init() {
    await Assets.init({ manifest });
    Assets.backgroundLoadBundle("game");

    Resources.spritesheet = await getSpritesheet();
  }
}
