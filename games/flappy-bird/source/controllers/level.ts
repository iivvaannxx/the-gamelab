import { Application } from "pixi.js";

import type { Bird } from "@app/entities/bird";
import { Pipe } from "@app/entities/pipe";
import { randomFloatRange } from "@app/utils";

/** The interval at which pipes spawn. */
const PIPE_SPAWN_INTERVAL = 2.5;

/** The default initial gap size. */
const DEFAULT_GAP_SIZE = 0.5;

/** Defines the logic for the level (difficulty, pipe generation...). */
export class LevelController {
  /** The current gap of the pipes when spawned. */
  private currentGapSize = 0.5;

  /** The timer that controls the spawning rate of pipes. */
  private spawnTimer;

  /** The number of pipes that went offscreen (pending for destroy). */
  private offscreenPipes;

  /** The current pipes on the screen. */
  private currentPipes: Pipe[] = [];

  /** A reference to the bird entity. */
  private bird: Bird;

  /** Constructs a new instance of the Level Controller. */
  public constructor(bird: Bird) {
    // Initialize it so that the first pipes spawn immediately.
    this.spawnTimer = PIPE_SPAWN_INTERVAL;
    this.currentGapSize = DEFAULT_GAP_SIZE;

    this.offscreenPipes = 0;
    this.bird = bird;
  }

  /**
   * Updates the level controller. Runs on every frame update.
   * @param delta The time in seconds since the last frame.
   */
  public onUpdate(delta: number) {
    this.spawnTimer += delta;

    if (this.spawnTimer >= PIPE_SPAWN_INTERVAL) {
      this.spawnPipes();
      this.spawnTimer -= PIPE_SPAWN_INTERVAL;
    }

    for (const pipe of this.currentPipes) {
      pipe.onUpdate(delta);
    }

    if (this.offscreenPipes >= 2) {
      // The first two pipes (top and bottom) are the last ones that went offscreen.
      this.currentPipes = this.currentPipes.slice(this.offscreenPipes);
      this.offscreenPipes = 0;
    }
  }

  /**
   * Handles the fixed update logic for the level.
   * @param fixedDeltaTime - The fixed delta time for the update.
   */
  public onFixedUpdate(fixedDeltaTime: number) {
    for (const pipe of this.currentPipes) {
      if (pipe.collidesWithBird(this.bird)) {
        // GAME OVER!
      }
    }
  }

  /**
   * Modifies the gap size between the pipes (less gap, more difficult).
   * @param gapSize The new size of the gap between the pipes.
   */
  public setGapSize(gapSize: number) {
    this.currentGapSize = gapSize;
  }

  /** Spawns a new pair of pipes on the screen. */
  private spawnPipes() {
    // For the pipes to not be too close to the top or bottom of the screen.
    const minimumEdgeDistance = 0.1;
    const pipeSpawnPosition = Application.instance.screen.width + 200;

    while (
      !this.createPipePair(
        randomFloatRange(
          this.currentGapSize / 2 + minimumEdgeDistance,
          1 - minimumEdgeDistance - this.currentGapSize / 2,
        ),
        this.currentGapSize,
        pipeSpawnPosition,
      )
    ) {
      // It should never fail, the math generates valid points.
      // If it does we just loop until a good value is found.
    }
  }

  /**
   * Creates a pair of pipes with a gap between them.
   *
   * @param gapY The vertical position of the gap, ranging from 0 to 1.
   * @param gapSize The size of the gap, ranging from 0 to 1.
   * @param xPosition The horizontal position of the pipes.
   *
   * @returns Whether the pipe pair was successfully created.
   */
  private createPipePair(gapY: number, gapSize: number, xPosition: number) {
    // The following situations will yield invalid height calculation:
    // 1. gapSize or gapY are negative.
    // 2. The "start" of the gap (start of the top pipe) extends beyond the top of the screen.
    // 3. The "end" of the gap (start of bottom pipe) extends beyond the bottom of the screen.

    if (
      gapY < 0 ||
      gapSize < 0 ||
      gapY - gapSize / 2 < 0 ||
      gapY + gapSize / 2 > 1
    ) {
      return false;
    }

    const app = Application.instance;

    // Creates a new pipe with the given parameters.
    const createPipe = (height: number, type: "top" | "bottom") => {
      const pipe = new Pipe({
        normalizedHeight: height,
        type,
        xPosition,
      });

      // The pipes get destroyed when they go offscreen.
      pipe.on("destroyed", () => {
        this.offscreenPipes++;
        app.stage.removeChild(pipe);
      });

      return pipe;
    };

    // The gap should be centered around the gapY value.
    // This means that the gap starts at `gapY - gapSize / 2` and ends at `gapY + gapSize / 2`.

    // The top pipe height goes from 0 to `gapY - gapSize / 2`.
    const topPipeHeight = gapY - gapSize / 2;
    const top = createPipe(topPipeHeight, "top");
    this.currentPipes.push(top);

    // The bottom pipe height goes from `gapY + gapSize / 2` to 1.
    const bottomPipeHeight = 1 - (gapY + gapSize / 2);
    const bottom = createPipe(bottomPipeHeight, "bottom");
    this.currentPipes.push(bottom);

    app.stage.addChild(top);
    app.stage.addChild(bottom);

    return true;
  }
}
