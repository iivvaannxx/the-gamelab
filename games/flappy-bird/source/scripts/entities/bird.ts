import { AnimatedSprite, Circle } from "pixi.js";

import { Resources } from "@app/assets/resources";
import { getGameAreaSize, getResponsiveScale } from "@app/utils/screen";

import * as Keyboard from "@gamelab/input-system/keyboard";

/** Defines the logic for the Bird (player). */
export class Bird extends AnimatedSprite {
  /** The velocity at which the bird tilts. */
  private static readonly ANGULAR_VELOCITY = 8;

  private collisionShape = new Circle();
  private dead = false;
  private screenRelativeY = 0;
  private yVelocity = 0;

  /** The collision bounds of the bird. */
  public get collider() {
    return this.collisionShape;
  }

  /** The lowest Y coordinate of the bird. */
  public get bottomY() {
    return this.y + this.getBounds().height / 2;
  }

  constructor() {
    const animationTextures = Resources.spritesheet.animations.bird;
    super(animationTextures);

    this.animationSpeed = 0.1;
    this.play();

    // The bird starts at the middle of the screen.
    this.screenRelativeY = 0.5;
  }

  /**
   * Updates the bird entity. Runs on every frame update.
   * @param delta The time in seconds since the last frame.
   */
  public onUpdate(delta: number) {
    if (this.yVelocity > 0 || this.dead) {
      // Point down when falling.
      this.rotation += delta * Bird.ANGULAR_VELOCITY;
      this.rotation = Math.min(Math.PI / 2, this.rotation);
    }

    if (Keyboard.spaceKey.wasPressedThisFrame) {
      this.jump();
    }

    const { height } = getGameAreaSize();
    this.screenRelativeY = this.y / height;
  }

  /**
   * Updates the bird's physics. Should run on every fixed update.
   * @param fixedDeltaTime The fixed time step.
   */
  public onFixedUpdate(fixedDeltaTime: number) {
    this.yVelocity += 4000 * fixedDeltaTime;
    this.y += this.yVelocity * fixedDeltaTime;

    if (this.y - this.height / 2 < 0) {
      this.y = this.height / 2;
      this.yVelocity = 0;
    }
  }

  /**
   * Resizes the bird entity. Runs when the game area is resized.
   *
   * @param newCanvasWidth The new width of the game area.
   * @param newCanvasHeight The new height of the game area.
   */
  public onResize(newCanvasWidth: number, newCanvasHeight: number) {
    this.x = newCanvasWidth / 3;
    this.y = this.screenRelativeY * newCanvasHeight;

    const scale = getResponsiveScale(newCanvasWidth, newCanvasHeight);
    this.scale.set(scale);

    this.updateCollisionShape();
  }

  /** Sets the bird state to be dead. */
  public die() {
    this.dead = true;

    // Stop the animated sprite.
    this.stop();
    Resources.hitSound.play();
  }

  /** Makes the bird stop falling and do a little jump.  */
  private jump() {
    if (this.dead) {
      return;
    }

    // Tilt the bird up to -20 degrees.
    this.rotation = -20 * (Math.PI / 180);
    this.yVelocity = -1500;

    Resources.wingSound.play();
  }

  /** Updates the collision shape of the bird entity based on the current bounds. */
  private updateCollisionShape() {
    // The collision shape is a circle around the bird.
    // We need to calculate it based on the bounds (which are squared).
    const bounds = this.getBounds();

    // We derive a radius from the width of the bounds.
    // The division by 4 is just an arbitrary value, because fits the bird's shape.
    // We want the center to be a bit to the right,
    // This is because a the bird is not a perfect circle, but a bit more elongated (ellipse).
    const radius = bounds.width / 2.9;
    const centerX = bounds.x + bounds.width / 2 + 10;
    const centerY = bounds.y + bounds.height / 2;

    this.collisionShape.radius = radius;
    this.collisionShape.x = centerX;
    this.collisionShape.y = centerY;
  }
}
