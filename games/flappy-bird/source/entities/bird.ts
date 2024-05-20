import { Resources } from "@app/assets/resources";
import {
  AnimatedSprite,
  type Application,
  Circle,
  type Graphics,
} from "pixi.js";

/** Defines the logic for the Bird (player). */
export class Bird {
  /** The bird's sprite instance. */
  private sprite: AnimatedSprite;

  /** The application instance. */
  private app: Application;

  /** The bird's vertical velocity. */
  private yVelocity = 0;

  /** The shape we use to detect collision. */
  public collider: Circle;

  /**
   * Constructs a new entity of the Bird (player).
   * @param app The Pixi.js application instance.
   */
  constructor(app: Application) {
    this.app = app;
    this.sprite = this.setupSprite();

    this.ensureCorrectTransform();
    this.sprite.y = app.screen.height / 2;
    this.collider = new Circle(
      this.sprite.x,
      this.sprite.y,

      // The sprite texture is square (so are the bounds).
      // Doesn't matter if we use width or height.
      this.sprite.getBounds().width / 4,
    );

    // Add it to the stage to render
    app.stage.addChild(this.sprite);
  }

  /** Updates the bird entity. Runs on every frame update. */
  public update() {
    this.ensureCorrectTransform();

    this.collider.x = this.sprite.x;
    this.collider.y = this.sprite.y;
  }

  public updatePhysics(fixedDeltaTime: number) {
    this.yVelocity += 500 * fixedDeltaTime;
    this.sprite.y += this.yVelocity * fixedDeltaTime;
  }

  /**
   * Renders a debug representation of the bird's collider on the given graphics object.
   * @param graphics - The graphics object to render on.
   */
  public debug(graphics: Graphics) {
    graphics
      .circle(this.collider.x, this.collider.y, this.collider.radius)
      .stroke({ width: 2, color: 0xff0000 });
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
   * Ensures that the bird sprite has the correct transform
   * and it positions it in the center of the screen.
   */
  private ensureCorrectTransform() {
    const { width } = this.app.screen;

    this.sprite.x = width / 2;
    this.sprite.scale = 0.4;
  }
}
