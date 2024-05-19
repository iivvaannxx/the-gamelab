import { Bird } from "@app/entities/bird";
import type { Application } from "pixi.js";

/** Defines all the logic of the game. */
class GameScene {
  /** The instance of our application. */
  private app!: Application;

  /** The instance to the bird entity (player) */
  private bird!: Bird;

  /**
   * Initializes the game scene.
   * @param app The Pixi.js application instance.
   */
  init(app: Application) {
    this.app = app;
    this.bird = new Bird(app);
  }

  update() {
    this.bird.update();
  }
}

/** The unique instance of our game scene. */
export const gameScene = new GameScene();
