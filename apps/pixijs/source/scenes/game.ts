import type { Application } from "pixi.js";

/** Defines all the logic of the game. */
class GameScene {
  /** The instance of our application. */
  private app!: Application;

  /**
   * Initializes the game scene.
   * @param app The Pixi.js application instance.
   */
  init(app: Application) {
    this.app = app;
  }
}

/** The unique instance of our game scene. */
export const gameScene = new GameScene();
