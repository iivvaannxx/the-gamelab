import { type GameSpritesheet, getSpritesheet } from "./spritesheet";

/** A little helper to easily access the resources of our game. */
export class Resources {
  /** The spritesheet with all our game textures. */
  public static spritesheet: GameSpritesheet;

  /**
   * Initializes the resources of our game.
   * Needs to be called before trying to access any resource.
   */
  static async init() {
    Resources.spritesheet = await getSpritesheet();
  }
}
