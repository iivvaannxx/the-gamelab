import { AnimatedSprite, Application, Ellipse } from "pixi.js";

import { Resources } from "@app/assets/resources";
import { getResponsiveScale } from "@app/utils/screen";

import * as Keyboard from "@gamelab/input-system/keyboard";

/** Defines the logic for the Bird (player). */
export class Bird extends AnimatedSprite {
  /** The velocity at which the bird tilts. */
  private static readonly ANGULAR_VELOCITY = 6;

  /** The multiplier for the gravity effect. */
  private static readonly GRAVITY_MULTIPLIER = 2;

  private dead = false;
  private screenRelativeY = 0;
  private yVelocity = 0;
  private colliderShape: Ellipse;

  /** The lowest Y coordinate of the bird. */
  public get bottomY() {
    return this.y + this.getBounds().height / 2;
  }

  /** The collider shape of the bird. */
  public get collider() {
    return this.colliderShape;
  }

  constructor() {
    const animationTextures = Resources.spritesheet.animations.bird;
    super(animationTextures);

    this.animationSpeed /= 10;
    this.play();

    // The bird starts at the middle of the screen.
    this.screenRelativeY = 0.5;
    this.colliderShape = new Ellipse();
    this.zIndex = 1;
  }

  /**
   * Updates the bird entity. Runs on every frame update.
   * @param delta The time in seconds since the last frame.
   */
  public onUpdate(delta: number) {
    const { height } = Application.instance.screen;

    if (this.yVelocity > 0 || this.dead) {
      // Point down when falling.
      this.rotation += delta * Bird.ANGULAR_VELOCITY;
      this.rotation = Math.min(Math.PI / 2, this.rotation);
    }

    if (Keyboard.spaceKey.wasPressedThisFrame) {
      // This can be interpreted as 0.31 times the force of gravity.
      // It feels pretty balanced. The 0.31 is arbitrary.
      this.jump(height * Bird.GRAVITY_MULTIPLIER * 0.31);
    }

    this.screenRelativeY = this.y / height;
    this.colliderShape.y = this.y;
  }

  /**
   * Updates the bird's physics. Should run on every fixed update.
   * @param fixedDeltaTime The fixed time step.
   */
  public onFixedUpdate(fixedDeltaTime: number) {
    const { height } = Application.instance.screen;

    this.yVelocity += height * Bird.GRAVITY_MULTIPLIER * fixedDeltaTime;
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

    const colliderPadding = 0.9;
    this.colliderShape.x = this.x;
    this.colliderShape.y = this.y;
    this.colliderShape.halfWidth = (this.width * colliderPadding) / 2;
    this.colliderShape.halfHeight = (this.height * colliderPadding) / 2;
  }

  /** Sets the bird state to be dead. */
  public die() {
    this.dead = true;

    // Stop the animated sprite.
    this.stop();
    Resources.hitSound.play();
  }

  /** Makes the bird stop falling and do a little jump.  */
  private jump(amount: number) {
    if (this.dead) {
      return;
    }

    // Tilt the bird up to -20 degrees.
    this.rotation = -20 * (Math.PI / 180);
    this.yVelocity = -amount;

    Resources.wingSound.play();
  }
}
