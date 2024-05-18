import { Resources } from "@app/assets/resources";
import { AnimatedSprite, type Application } from "pixi.js";

/** Defines the logic for the Bird (player). */
export class Bird {
  /** The bird's sprite instance. */
  private sprite: AnimatedSprite;

  /** The application instance. */
  private app: Application;

  /**
   * Constructs a new entity of the Bird (player).
   * @param app The Pixi.js application instance.
   */
  constructor(app: Application) {
    this.app = app;
    this.sprite = this.setupSprite();

    app.stage.addChild(this.sprite);
    app.ticker.add(this.update.bind(this));
  }

  /**
   * Creates and sets up the sprite of the bird.
   * @returns The sprite of the bird.
   */
  private setupSprite() {
    const animationTextures = Resources.spritesheet.animations.bird;
    const sprite = new AnimatedSprite(animationTextures);

    sprite.anchor.set(0.5);
    sprite.animationSpeed = 0.1;
    sprite.play();

    return sprite;
  }

  /**
   * Ensures that the bird sprite is responsive to the screen size,
   * and it positions it in the center of the screen.
   */
  private ensureResponsive() {
    const { width, height } = this.app.screen;

    this.sprite.x = width / 2;
    this.sprite.y = height / 2;
    this.sprite.scale = 0.4;
  }

  /** Updates the bird entity. Runs on every frame update. */
  private update() {
    this.ensureResponsive();
  }
}
