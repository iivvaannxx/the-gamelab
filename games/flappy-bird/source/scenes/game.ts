import { Bird } from "@app/entities/bird";
import { type Application, Graphics } from "pixi.js";

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

  /**
   * Initializes the game scene.
   * @param app The Pixi.js application instance.
   */
  constructor({ app }: GameSceneInit) {
    this.app = app;
    this.bird = new Bird(this.app);

    this.graphics = new Graphics();
    app.stage.addChild(this.graphics);
  }

  public update() {
    this.bird.update();
  }

  public fixedUpdate(_fixedDeltaTime: number) {
    // this.bird.updatePhysics(fixedDeltaTime);
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
