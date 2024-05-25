import { Container } from "pixi.js";

import { Resources } from "@app/assets/resources";
import { LevelController } from "@app/scripts/controllers/level";
import { ScoreController } from "@app/scripts/controllers/score";

import type { Ground } from "@app/scripts/entities/ground";
import { GameUI } from "@app/scripts/ui/game-ui";

import * as Keyboard from "@gamelab/input-system/keyboard";

/** Defines all the possible states of the game. */
enum GameState {
  PENDING_START = 0,
  PLAYING = 1,
  GAME_OVER = 2,
}

/** Defines all the logic of the game. */
class GameScene extends Container {
  /** The instance of the controller used to to generate the level. */
  private levelController: LevelController;

  /** The instance of the controller used to manage the score. */
  private scoreController: ScoreController;

  /** The game user interface container. */
  private ui: GameUI;

  /** The current state of the game. */
  private state: GameState;

  constructor(ground: Ground) {
    super();
    this.state = GameState.PENDING_START;

    this.ui = new GameUI();
    this.scoreController = new ScoreController();

    this.levelController = new LevelController(ground);
    this.levelController.on("point", this.onPoint.bind(this));
    this.levelController.on("gameover", this.onGameOver.bind(this));

    this.addChild(this.ui);
    this.addChild(this.levelController);
  }

  /**
   * Updates the game scene. Runs on every frame update.
   * @param delta The time in seconds since the last frame.
   */
  public onUpdate(delta: number) {
    this.waitForInput();

    if (this.state === GameState.PENDING_START) {
      return;
    }

    this.levelController.onUpdate(delta);
  }

  /**
   * Updates the physics of the game scene. Runs on every fixed update.
   * @param fixedDeltaTime The fixed time step, in seconds.
   */
  public onFixedUpdate(fixedDeltaTime: number) {
    if (this.state === GameState.PENDING_START) {
      return;
    }

    this.levelController.onFixedUpdate(fixedDeltaTime);
  }

  /**
   * Resizes the game scene. Runs when the game area is resized.
   *
   * @param newCanvasWidth The new width of the game area.
   * @param newCanvasHeight The new height of the game area.
   */
  public onResize(newCanvasWidth: number, newCanvasHeight: number) {
    this.levelController.onResize(newCanvasWidth, newCanvasHeight);
  }

  /** Event fired when the player dies. */
  private onGameOver() {
    this.ui.whiteFlash();
    this.state = GameState.GAME_OVER;
  }

  /** Event fired when the player scores a point. */
  private onPoint() {
    this.scoreController.increaseScore();
    Resources.pointSound.play();
  }

  /** Waits for user input before starting the game. */
  private waitForInput() {
    if (
      Keyboard.spaceKey.wasPressedThisFrame &&
      this.state === GameState.PENDING_START
    ) {
      this.state = GameState.PLAYING;
    }
  }
}

/** The unique instance of our game scene. */
let gameScene: GameScene;

/**
 * Creates a new game scene. If one already exists, it will return the existing one.
 *
 * @param ground The instance of the ground entity.
 * @returns The current or newly created game scene.
 */
export function getGameScene(ground: Ground) {
  if (gameScene) {
    console.warn("Game scene already initialized.");
    return gameScene;
  }

  gameScene = new GameScene(ground);
  return gameScene;
}

export type { GameScene };
