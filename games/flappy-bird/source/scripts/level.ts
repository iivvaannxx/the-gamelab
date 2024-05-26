import { Application, Container } from "pixi.js";

import { Bird } from "@app/scripts/entities/bird";
import type { Ground } from "@app/scripts/entities/ground";
import { Pipe, type PipeDirection } from "@app/scripts/entities/pipe";

import { Resources } from "@app/assets/resources";
import { ellipseRectCollisionWithRotation } from "@app/utils/collision";
import { randomFloatRange } from "@app/utils/random";
import { getResponsiveScale } from "@app/utils/screen";

/** Defines the logic for the level (pipe generation, ground collision...). */
export class Level extends Container {
  /** The interval at which pipes spawn. */
  private static readonly PIPE_SPAWN_INTERVAL = 2.5;

  private offscreenPipes = 0;
  private pipeSpawnTimer: number;
  private pipes: Pipe[] = [];
  private lastGapY = 0.5;

  private ground: Ground;
  private bird: Bird;

  private gameOver = false;

  /** The height of the area where the bird can fly and the pipes get spawned. */
  private get playableAreaHeight() {
    // This area is defined by: totalHeight - groundHeight
    // groundHeight = height - this.ground.surfaceY
    const { height } = Application.instance.screen;
    return height - (height - this.ground.surfaceY);
  }

  public constructor(ground: Ground) {
    super({
      eventMode: "none",
      interactiveChildren: false,
    });

    // Initialize it so that the first pipes spawn immediately.
    this.pipeSpawnTimer = Level.PIPE_SPAWN_INTERVAL;
    this.ground = ground;

    this.bird = new Bird();
    this.addChild(this.bird);
  }

  /**
   * Updates the level controller. Runs on every frame update.
   * @param delta The time in seconds since the last frame.
   */
  public onUpdate(delta: number) {
    this.bird.onUpdate(delta);

    // Check for ground collision.
    if (this.bird.bottomY > this.ground.surfaceY) {
      const birdBounds = this.bird.getBounds();
      const birdBeakPixelSize = birdBounds.width / 10;

      this.bird.y =
        this.ground.surfaceY - birdBounds.height / 2 + birdBeakPixelSize;

      this.endGame(false);
    }

    this.handlePipes(delta);
  }

  /**
   * Handles the fixed update logic for the level.
   * @param fixedDeltaTime - The fixed time step, in seconds.
   */
  public onFixedUpdate(fixedDeltaTime: number) {
    this.bird.onFixedUpdate(fixedDeltaTime);

    // Check for pipe collision.
    for (const pipe of this.pipes) {
      if (
        ellipseRectCollisionWithRotation(
          this.bird.collider,
          pipe.collider,
          this.bird.angle,
        )
      ) {
        this.endGame(true);
        return;
      }
    }
  }

  /**
   * Resizes the level. Runs when the game area is resized.
   *
   * @param newCanvasWidth The new width of the game area.
   * @param newCanvasHeight The new height of the game area.
   */
  public onResize(newCanvasWidth: number, newCanvasHeight: number) {
    this.bird.onResize(newCanvasWidth, newCanvasHeight);

    for (const pipe of this.pipes) {
      pipe.onResize(newCanvasWidth, newCanvasHeight);
    }
  }

  /**
   * Handles the spawning and updating of pipes in the game level.
   * @param delta - The time elapsed since the last frame.
   */
  private handlePipes(delta: number) {
    if (this.gameOver) {
      return;
    }

    this.pipeSpawnTimer += delta;

    if (this.pipeSpawnTimer >= Level.PIPE_SPAWN_INTERVAL) {
      this.pipeSpawnTimer -= Level.PIPE_SPAWN_INTERVAL;
      this.spawnPipes();
    }

    for (const pipe of this.pipes) {
      pipe.onUpdate(delta);

      if (pipe.x < -200) {
        this.offscreenPipes++;
        pipe.destroy();
        pipe.removeFromParent();
      }
    }

    // Remove offscreen pipes.
    if (this.offscreenPipes > 0) {
      this.pipes = this.pipes.slice(this.offscreenPipes);
      this.offscreenPipes = 0;
    }
  }

  /** Spawns a new pair of pipes into the level. */
  private spawnPipes() {
    // We spawn pipes between the 30% and 70% of the playable area.
    // But in between pipe generations the maximum difference in Y should be 20%.
    // This way we avoid drastic changes in the pipe opening positions.
    const minGapY = Math.max(0.3, this.lastGapY - 0.2);
    const maxGapY = Math.min(0.7, this.lastGapY + 0.2);
    const gapSize = 0.25;

    const randomY = randomFloatRange(minGapY, maxGapY);
    this.lastGapY = randomY;

    const { top, bottom } = this.createPipePair(randomY, gapSize);
    this.addChild(top, bottom);
    this.pipes.push(top, bottom);
  }

  /**
   * Creates a pair of pipes ready to be spawned.
   *
   * @param gapY - The vertical position of the gap between the pipes (relative to playableAreaHeight).
   * @param gapSize - The size of the gap between the pipes (relative to playableAreaHeight).
   * @returns The instances of both the top and the bottom pipe.
   */
  private createPipePair(gapY: number, gapSize: number) {
    const { width, height } = Application.instance.screen;

    // Creates a new pipe with the given direction.
    const createPipe = (direction: PipeDirection) => {
      const pipe = new Pipe({ direction });

      // Pipes are spawned dynamically, make sure they are scaled upon creation.
      // Other objects are scaled upon game initialization (they're static).
      const scale = getResponsiveScale(width, height);
      pipe.scale.set(scale);
      pipe.x = width + 200;

      const pipeHeight = pipe.getBounds().height;
      const anchor =
        direction === "up"
          ? ((1 - (gapY + gapSize / 2)) * this.playableAreaHeight) / pipeHeight
          : ((gapY - gapSize / 2) * this.playableAreaHeight) / pipeHeight;

      pipe.anchor.set(0.5, direction === "up" ? anchor : 1 - anchor);
      pipe.y = direction === "up" ? this.playableAreaHeight : 0;

      // Adjust the collider to match the pipe's position.
      pipe.adjustCollider();

      return pipe;
    };

    // Top pipe is the one that has direction "down".
    const top = createPipe("down");
    const bottom = createPipe("up");

    return { top, bottom };
  }

  /**
   * Ends the game and triggers the "gameover" event.
   * @param deathByPipe - A boolean indicating whether the bird died by hitting a pipe.
   */
  private endGame(deathByPipe: boolean) {
    if (this.gameOver) {
      return;
    }

    if (deathByPipe) {
      setTimeout(() => {
        Resources.fallSound.play();
      }, 100);
    }

    this.ground.toggleStop(true);
    this.bird.die();

    this.gameOver = true;
    this.emit("gameover", deathByPipe);
  }
}
