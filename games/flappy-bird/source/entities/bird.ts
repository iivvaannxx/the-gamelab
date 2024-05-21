import { AnimatedSprite, Application, Circle } from "pixi.js";

import { Resources } from "@app/assets/resources";
import * as Keyboard from "@gamelab/input-system/keyboard";

/** Defines the logic for the Bird (player). */
export class Bird extends AnimatedSprite {
  /** The bird's vertical velocity. */
  private yVelocity = 0;

  /** The collision bounds of the bird. */
  public get collisionBounds() {
    // The collision shape is a circle around the bird.
    // We need to calculate it based on the bounds (which are squared).
    const bounds = this.getBounds();

    // We derive a radius from the width of the bounds (could also be done from the height, they are equal).
    // The division by 4 is just an arbitrary value, because fits the bird's shape.
    const radius = bounds.width / 4;

    // We want the center to be a bit to the right (so we divide by a smaller value).
    // This is because a the bird is not a perfect circle, but a bit more elongated.
    const centerX = bounds.x + bounds.width / 1.9;
    const centerY = bounds.y + bounds.height / 2;

    return new Circle(centerX, centerY, radius);
  }

  /** Constructs a new entity of the Bird (player). */
  constructor() {
    const animationTextures = Resources.spritesheet.animations.bird;
    super(animationTextures);

    this.anchor.set(0.5);
    this.animationSpeed = 0.1;
    this.play();

    this.x = Application.instance.screen.width / 2;
    this.y = Application.instance.screen.height / 2;
  }

  /** Updates the bird entity. Runs on every frame update. */
  public onUpdate() {
    if (Keyboard.spaceKey.wasPressedThisFrame) {
      // this.yVelocity = -500;
    }
  }

  /** Updates the bird's physics. Should run on every fixed update. */
  public updatePhysics(fixedDeltaTime: number) {
    // this.yVelocity += 1000 * fixedDeltaTime;
    this.y += this.yVelocity * fixedDeltaTime;
  }
}
