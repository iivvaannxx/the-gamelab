import { type Application, Container } from "pixi.js";

import { LevelController } from "@app/scripts/controllers/level";
import { ScoreController } from "@app/scripts/controllers/score";
import { Bird } from "@app/scripts/entities/bird";

import { Resources } from "@app/assets/resources";
import * as Keyboard from "@gamelab/input-system/keyboard";

/** Describes the parameters given to the game scene constructor. */
type GameSceneInit = {
  /** The instance of the Pixi.js application. */
  app: Application;
};

/** Defines all the logic of the game. */
class GameScene extends Container {
  /** The instance of our application. */
  private app: Application;

  /** The instance to the bird entity (player) */
  private bird: Bird;

  /** The instance of the controller used to to generate the level. */
  private levelController: LevelController;

  /** The instance of the controller used to manage the score. */
  private scoreController: ScoreController;

  private started = false;

  /**
   * Initializes the game scene.
   * @param app The Pixi.js application instance.
   */
  constructor({ app }: GameSceneInit) {
    super();
    this.app = app;

    this.bird = new Bird();
    this.scoreController = new ScoreController();

    this.levelController = new LevelController(this.bird);
    this.levelController.on("point", this.onPoint.bind(this));
    this.levelController.on("gameover", this.onGameOver.bind(this));

    this.addChild(this.bird);
  }

  /**
   * Updates the game scene. Runs on every frame update.
   * @param delta The time in seconds since the last frame.
   */
  public onUpdate(delta: number) {
    if (Keyboard.spaceKey.wasPressedThisFrame) {
      this.started = true;
    }

    if (!this.started) {
      return;
    }

    this.bird.onUpdate();
    this.levelController.onUpdate(delta);
  }

  /**
   * Updates the physics of the game scene. Runs on every fixed update.
   * @param fixedDeltaTime The fixed time step in seconds.
   */
  public onFixedUpdate(fixedDeltaTime: number) {
    if (!this.started) {
      return;
    }

    this.bird.onFixedUpdate(fixedDeltaTime);
    this.levelController.onFixedUpdate(fixedDeltaTime);
  }

  public onResize(newCanvasWidth: number, newCanvasHeight: number) {
    this.bird.onResize(newCanvasWidth, newCanvasHeight);
  }

  public onGameOver() {}

  public onPoint() {
    this.scoreController.increaseScore();
    Resources.pointSound.play();
  }
}

/** The unique instance of our game scene. */
let gameScene: GameScene;

/**
 * Creates a new game scene. If one already exists, it will return the existing one.
 *
 * @param init - The initialization parameters for the game scene.
 * @returns The current or newly created game scene.
 */
export function getGameScene(init: GameSceneInit) {
  if (gameScene) {
    console.warn("Game scene already initialized.");
    return gameScene;
  }

  gameScene = new GameScene(init);
  return gameScene;
}

export type { GameScene };
