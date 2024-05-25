import { Container } from "pixi.js";

import { Bird } from "@app/scripts/entities/bird";
import type { Ground } from "@app/scripts/entities/ground";

/** Defines the logic for the level (pipe generation, ground collision...). */
export class LevelController extends Container {
  /** The interval at which pipes spawn. */
  private static readonly PIPE_SPAWN_INTERVAL = 2.5;

  private spawnTimer: number;
  private bird: Bird;
  private ground: Ground;
  private gameOver = false;

  /** Constructs a new instance of the Level Controller. */
  public constructor(ground: Ground) {
    super();

    // Initialize it so that the first pipes spawn immediately.
    this.spawnTimer = LevelController.PIPE_SPAWN_INTERVAL;
    this.ground = ground;

    this.bird = new Bird();
    this.addChild(this.bird);
  }

  /**
   * Updates the level controller. Runs on every frame update.
   * @param delta The time in seconds since the last frame.
   */
  public onUpdate(delta: number) {
    this.spawnTimer += delta;

    if (this.spawnTimer >= LevelController.PIPE_SPAWN_INTERVAL) {
      this.spawnTimer -= LevelController.PIPE_SPAWN_INTERVAL;
    }

    if (this.bird.bottomY > this.ground.surfaceY) {
      const birdBounds = this.bird.getBounds();
      const birdBeakPixelSize = birdBounds.height / 10;

      this.bird.y =
        this.ground.surfaceY - birdBounds.height / 2 + birdBeakPixelSize;

      // The bird collided with the ground.
      this.endGame(false);
    }

    this.bird.onUpdate(delta);
  }

  /**
   * Handles the fixed update logic for the level.
   * @param fixedDeltaTime - The fixed time step, in seconds.
   */
  public onFixedUpdate(fixedDeltaTime: number) {
    this.bird.onFixedUpdate(fixedDeltaTime);
  }

  /**
   * Resizes the level. Runs when the game area is resized.
   *
   * @param newCanvasWidth The new width of the game area.
   * @param newCanvasHeight The new height of the game area.
   */
  public onResize(newCanvasWidth: number, newCanvasHeight: number) {
    this.bird.onResize(newCanvasWidth, newCanvasHeight);
  }

  /**
   * Ends the game and triggers the "gameover" event.
   * @param deathByPipe - A boolean indicating whether the bird died by hitting a pipe.
   */
  private endGame(deathByPipe: boolean) {
    if (this.gameOver) {
      return;
    }

    this.ground.stop();
    this.bird.die();

    this.gameOver = true;
    this.emit("gameover", deathByPipe);
  }
}
