import { Container } from "pixi.js";

import { Resources } from "@app/assets/resources";
import { ScoreController } from "@app/scripts/controllers/score";
import { Level } from "@app/scripts/level";

import { GameUI } from "@app/scripts/ui/game-ui";

import type { Ground } from "@app/scripts/entities/ground";
import * as Keyboard from "@gamelab/input-system/keyboard";

/** Defines all the possible states of the game. */
enum GameState {
  PENDING_START = 0,
  PLAYING = 1,
  GAME_OVER = 2,
}

/** Defines all the logic of the game. */
export class GameScene extends Container {
  private level: Level;
  private scoreController: ScoreController;
  private ui: GameUI;
  private state: GameState;

  constructor(ground: Ground) {
    super({ isRenderGroup: true, zIndex: 1 });
    this.state = GameState.PENDING_START;

    this.ui = new GameUI();
    this.ui.setScore(0);

    this.scoreController = new ScoreController();

    this.level = new Level(ground);
    this.level.on("point", this.onPoint.bind(this));
    this.level.on("gameover", this.onGameOver.bind(this));

    this.addChild(this.ui);
    this.addChild(this.level);
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

    this.level.onUpdate(delta);
  }

  /**
   * Updates the physics of the game scene. Runs on every fixed update.
   * @param fixedDeltaTime The fixed time step, in seconds.
   */
  public onFixedUpdate(fixedDeltaTime: number) {
    if (this.state === GameState.PENDING_START) {
      return;
    }

    this.level.onFixedUpdate(fixedDeltaTime);
  }

  /**
   * Resizes the game scene. Runs when the game area is resized.
   *
   * @param newCanvasWidth The new width of the game area.
   * @param newCanvasHeight The new height of the game area.
   */
  public onResize(newCanvasWidth: number, newCanvasHeight: number) {
    this.ui.onResize(newCanvasWidth, newCanvasHeight);
    this.level.onResize(newCanvasWidth, newCanvasHeight);
  }

  /** Event fired when the player dies. */
  private onGameOver() {
    this.ui.whiteFlash();
    this.state = GameState.GAME_OVER;
  }

  /** Event fired when the player scores a point. */
  private onPoint() {
    this.scoreController.increaseScore();
    this.ui.setScore(this.scoreController.currentScore);

    Resources.pointSound.play();
  }

  /** Waits for user input before starting the game. */
  private waitForInput() {
    if (Keyboard.spaceKey.wasPressedThisFrame) {
      this.state = GameState.PLAYING;
    }
  }
}
