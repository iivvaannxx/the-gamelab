import { type Application, Container, Graphics } from "pixi.js";

import { Bird } from "@app/entities/bird";
import { Pipe } from "@app/entities/pipe";

/** Describes the parameters given to the game scene constructor. */
type GameSceneInit = {
  /** The instance of the Pixi.js application. */
  app: Application;
};

/** Defines all the logic of the game. */
class GameScene {
  /** The instance of our application. */
  private app: Application;

  /** The instance to the bird entity (player) */
  private bird: Bird;

  /** The global graphics instance used to draw on the scene. */
  private graphics: Graphics;

  /** The container that holds all the pipes in the level. */
  private levelPipes: Container;

  /**
   * Initializes the game scene.
   * @param app The Pixi.js application instance.
   */
  constructor({ app }: GameSceneInit) {
    this.app = app;

    this.bird = new Bird();
    this.graphics = new Graphics();
    this.levelPipes = new Container();

    // TEST PIPES.
    this.createPipePair(0.5, 0.2, app.screen.width / 2 + 300);
    this.createPipePair(0.5, 0.2, app.screen.width / 2 + 600);
    this.createPipePair(0.5, 0.2, app.screen.width / 2 + 900);

    this.app.stage.addChild(this.graphics);
    this.app.stage.addChild(this.bird);
    this.app.stage.addChild(this.levelPipes);
  }

  /**
   * Updates the game scene. Runs on every frame update.
   * @param delta The time in seconds since the last frame.
   */
  public onUpdate(_delta: number) {
    this.graphics.clear();
    this.bird.onUpdate();

    for (const pipe of this.levelPipes.children as Pipe[]) {
      pipe.onUpdate();
    }
  }

  /**
   * Updates the physics of the game scene. Runs on every fixed update.
   * @param fixedDeltaTime The fixed time step in seconds.
   */
  public onFixedUpdate(fixedDeltaTime: number) {
    this.bird.onFixedUpdate(fixedDeltaTime);

    for (const pipe of this.levelPipes.children as Pipe[]) {
      if (pipe.collidesWithBird(this.bird)) {
        // GAME OVER!
      }
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
    // 2. The sum of gapY and gapSize is greater than 1 (there's not enough space).
    // 3. gapSize is greater or equal than gapY (the top pipe would not have enough space).
    // 4. gapSize is greater or equal than 1 - gapY (the bottom pipe would not have enough space).

    if (
      gapY < 0 ||
      gapSize < 0 ||
      gapY + gapSize > 1 ||
      gapSize >= gapY ||
      gapSize >= 1 - gapY
    ) {
      return false;
    }

    // The gap should be centered around the gapY value.
    // This means that the gap starts at `gapY - gapSize / 2` and ends at `gapY + gapSize / 2`.

    // The top pipe height goes from 0 to `gapY - gapSize / 2`.
    const topPipeHeight = gapY - gapSize / 2;
    const top = new Pipe({
      normalizedHeight: topPipeHeight,
      type: "top",
      xPosition,
    });

    // The bottom pipe height goes from `gapY + gapSize / 2` to 1.
    const bottomPipeHeight = 1 - (gapY + gapSize / 2);
    const bottom = new Pipe({
      normalizedHeight: bottomPipeHeight,
      type: "bottom",
      xPosition,
    });

    this.levelPipes.addChild(top);
    this.levelPipes.addChild(bottom);

    return true;
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
