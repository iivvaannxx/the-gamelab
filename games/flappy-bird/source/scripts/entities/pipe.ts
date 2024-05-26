import { Application, Point, Rectangle, Sprite } from "pixi.js";

import { Resources } from "@app/assets/resources";
import { getResponsiveScale } from "@app/utils/screen";

/** Whether the pipe points up or down. */
export type PipeDirection = "up" | "down";

/** Describes the initialization parameters for the pipe. */
type PipeInit = {
  /** The direction of the overlay. */
  direction: PipeDirection;
};

/** Defines the logic for a single pipe in the game (obstacle). */
export class Pipe extends Sprite {
  private screenRelativePosition: Point;
  private colliderShape: Rectangle;
  private direction: PipeDirection;

  /** Whether the player has scored a point by passing this pipe. */
  public scored = false;

  /** Defines the collider of the pipe entity. */
  public get collider() {
    return this.colliderShape;
  }

  constructor({ direction }: PipeInit) {
    super(
      direction === "up"
        ? Resources.spritesheet.textures.pipeUp
        : Resources.spritesheet.textures.pipeDown,
    );

    this.direction = direction;
    this.anchor.x = 0.5;

    this.screenRelativePosition = new Point();
    this.colliderShape = new Rectangle();
  }

  /**
   * Updates the pipe's position based on the elapsed time since the last update.
   * @param delta - The elapsed time since the last update, in seconds.
   */
  public onUpdate(delta: number) {
    const { width, height } = Application.instance.screen;
    this.x -= (width / 3) * delta;

    // Pipes move on X only, so we only need to update the X coordinate.
    this.colliderShape.x = this.x - this.colliderShape.width / 2;
    this.screenRelativePosition.set(this.x / width, this.y / height);
  }

  /**
   * Resizes the pipe entity. Runs when the game area is resized.
   *
   * @param newCanvasWidth The new width of the game area.
   * @param newCanvasHeight The new height of the game area.
   */
  public onResize(newCanvasWidth: number, newCanvasHeight: number) {
    const scale = getResponsiveScale(newCanvasWidth, newCanvasHeight);
    this.scale.set(scale);

    this.x = this.screenRelativePosition.x * newCanvasWidth;
    this.y = this.screenRelativePosition.y * newCanvasHeight;
    this.adjustCollider();
  }

  /** Adjusts the collider shape of the pipe entity, ensuring it matches the current position. */
  public adjustCollider() {
    // Pipes have anchor on X of 0.5.
    // This is straightforward for the width.
    // The padding is to inset the collider a bit.
    const xPadding = 0.925;
    this.colliderShape.width = this.width * xPadding;
    this.colliderShape.x = this.x - (this.width * xPadding) / 2;

    // But, for the pipe to be positioned, the anchor on Y is dynamically set.
    // To calculate the origin and the height we need to consider the anchor.
    const anchor = this.anchor.y;
    const yOrigin = this.direction === "up" ? this.y - this.height * anchor : 0;
    const visibleRatio = this.direction === "up" ? anchor : 1 - anchor;

    this.colliderShape.y = yOrigin;
    this.colliderShape.height = this.height * visibleRatio;
  }
}
