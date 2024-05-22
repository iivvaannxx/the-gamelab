import { AnimatedSprite, Application, Circle } from "pixi.js";

import { Resources } from "@app/assets/resources";
import * as Keyboard from "@gamelab/input-system/keyboard";

/** Defines the logic for the Bird (player). */
export class Bird extends AnimatedSprite {
  /** The bird's vertical velocity. */
  private yVelocity = 0;

  /** Whether the bird is dead or not. */
  private dead = false;

  /** The collision bounds of the bird. */
  private collisionShape: Circle;

  /** The collision bounds of the bird. */
  public get collisionBounds() {
    return this.collisionShape;
  }

  /** Constructs a new entity of the Bird (player). */
  constructor() {
    const animationTextures = Resources.spritesheet.animations.bird;
    super(animationTextures);

    this.anchor.set(0.5);
    this.animationSpeed = 0.1;
    this.play();

    this.x = Application.instance.screen.width / 3;
    this.y = Application.instance.screen.height / 2;
    this.collisionShape = new Circle();
  }

  /** Updates the bird entity. Runs on every frame update. */
  public onUpdate() {
    if (Keyboard.spaceKey.wasPressedThisFrame) {
      this.jump();
    }

    this.updateCollisionShape();
  }

  /** Updates the bird's physics. Should run on every fixed update. */
  public onFixedUpdate(fixedDeltaTime: number) {
    // this.yVelocity += 1000 * fixedDeltaTime;
    this.y += this.yVelocity * fixedDeltaTime;
  }

  /** Makes the bird stop falling and do a little jump.  */
  public jump() {
    if (!this.dead) {
      this.yVelocity = -500;
    }
  }

  public die() {
    this.dead = true;
  }

  /** Updates the collision shape of the bird entity based on the current bounds. */
  public updateCollisionShape() {
    // The collision shape is a circle around the bird.
    // We need to calculate it based on the bounds (which are squared).
    const bounds = this.getBounds();

    // We derive a radius from the width of the bounds (could also be done from the height, they are equal).
    // The division by 4 is just an arbitrary value, because fits the bird's shape.
    // We want the center to be a bit to the right (so we divide by a smaller value).
    // This is because a the bird is not a perfect circle, but a bit more elongated.
    const radius = bounds.width / 4;
    const centerX = bounds.x + bounds.width / 1.9;
    const centerY = bounds.y + bounds.height / 2;

    this.collisionShape.radius = radius;
    this.collisionShape.x = centerX;
    this.collisionShape.y = centerY;
  }
}
