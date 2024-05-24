import { EventEmitter } from "pixi.js";

import type { Bird } from "@app/scripts/entities/bird";

/** The interval at which pipes spawn. */
const PIPE_SPAWN_INTERVAL = 2.5;

/** Defines the logic for the level (pipe generation, destruction...). */
export class LevelController extends EventEmitter {
  /** The timer that controls the spawning rate of pipes. */
  private spawnTimer = PIPE_SPAWN_INTERVAL;

  /** The number of pipes that went offscreen (pending for destroy). */
  // private offscreenPipes = 0;

  /** A reference to the bird entity. */
  // private bird: Bird;

  /** Whether the game is over or not. */
  private gameOver = false;

  /** Constructs a new instance of the Level Controller. */
  public constructor(_bird: Bird) {
    super();

    // Initialize it so that the first pipes spawn immediately.
    this.spawnTimer = PIPE_SPAWN_INTERVAL;
    // this.bird = bird;
  }

  /**
   * Updates the level controller. Runs on every frame update.
   * @param delta The time in seconds since the last frame.
   */
  public onUpdate(delta: number) {
    if (this.gameOver) {
      return;
    }

    this.spawnTimer += delta;

    if (this.spawnTimer >= PIPE_SPAWN_INTERVAL) {
      this.spawnTimer -= PIPE_SPAWN_INTERVAL;
    }

    /* for (let i = 0; i < this.currentPipes.length - 1; i += 2) {
      // We only need to check scoring with one, otherwise points are doubled.
      if (this.currentPipes[i]) {
        if (
          this.currentPipes[i].x < this.bird.x &&
          !this.currentPipes[i].scored
        ) {
          // New point scored!
          this.currentPipes[i].scored = true;
          this.emit("point");
        }
      }

      // Pipes come in pairs of 2 (top, bottom).
      this.currentPipes[i].onUpdate(delta);
      this.currentPipes[i + 1].onUpdate(delta);
    }

    if (this.offscreenPipes >= 2) {
      // The first two pipes (top and bottom) are the last ones that went offscreen.
      this.currentPipes = this.currentPipes.slice(this.offscreenPipes);
      this.offscreenPipes = 0;
    } */
  }

  /**
   * Handles the fixed update logic for the level.
   * @param fixedDeltaTime - The fixed delta time for the update.
   */
  public onFixedUpdate(_fixedDeltaTime: number) {
    if (this.gameOver) {
      return;
    }

    /* for (const pipe of this.currentPipes) {
      if (pipe.collidesWithBird(this.bird)) {
        this.bird.die();

        this.gameOver = true;
        this.emit("gameover");
      }
    } */
  }
}
