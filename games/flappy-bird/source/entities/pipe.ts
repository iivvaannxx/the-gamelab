import {
  Application,
  Container,
  Rectangle,
  Sprite,
  TilingSprite,
} from "pixi.js";

import { Resources } from "@app/assets/resources";
import type { Bird } from "@app/entities/bird";
import { rectangleIntersectsCircle } from "@app/utils";

/** The speed at which the pipe moves. */
const PIPE_MOVE_SPEED = 250;

/** The x position where the pipe should be destroyed. */
const PIPE_DESTROY_X = -200;

/** Describes the creation options for a pipe object.  */
export type PipeInitOptions = {
  /**
   * A float between 0 and 1 indicating the height of the pipe relative to the screen height.
   * 0 would be no height (invisible) and 1 would be the full height of the screen.
   */
  normalizedHeight: number;

  /** Whether the pipe should be placed on the top or bottom of the screen.  */
  type: "top" | "bottom";

  /** The horizontal position of the pipe. */
  xPosition: number;
};

/** Defines the logic of the pipes (obstacles). */
export class Pipe extends Container {
  /** The tiled body component of the pipe. */
  private body: TilingSprite;

  /** The cap of the pipe. */
  private head: Sprite;

  /** The collision shape for the head. */
  private headCollisionBounds: Rectangle;

  /** The collision shape for the body. */
  private bodyCollisionBounds: Rectangle;

  /** Whether the pipe has been scored already or not. */
  public scored = false;

  /**
   * Constructs a new instance of a Pipe (obstacle)
   *
   * @param app The Pixi.js application instance.
   * @param options The options for initializing the pipe.
   */
  constructor({ normalizedHeight, type, xPosition }: PipeInitOptions) {
    super();

    const screenHeight = Application.instance.screen.height;
    const { body, head } = this.createComponents(
      screenHeight,
      normalizedHeight,
      type,
    );

    this.x = xPosition;
    this.body = body;
    this.head = head;

    this.headCollisionBounds = Rectangle.EMPTY;
    this.bodyCollisionBounds = Rectangle.EMPTY;

    this.addChild(this.body);
    this.addChild(this.head);
  }

  /**
   * Updates the pipe entity. Runs once on every frame.
   * @param delta The time in seconds since the last frame.
   */
  public onUpdate(delta: number) {
    this.updateCollisionBounds();
    this.move(delta);
  }

  /**
   * Checks if the pipe collides with the bird.
   *
   * @param bird - The bird object to check collision with.
   * @returns True if the pipe collides with the bird, false otherwise.
   */
  public collidesWithBird(bird: Bird) {
    // The bird collision shape is a Circle.
    const birdCollisionBounds = bird.collisionBounds;

    return (
      rectangleIntersectsCircle(
        this.bodyCollisionBounds,
        birdCollisionBounds,
      ) ||
      rectangleIntersectsCircle(this.headCollisionBounds, birdCollisionBounds)
    );
  }

  /** Moves the pipe at linear constant velocity. */
  private move(delta: number) {
    this.x -= PIPE_MOVE_SPEED * delta;

    // Is offscreen:
    if (this.x < PIPE_DESTROY_X) {
      this.destroy();
    }
  }

  /** Updates the collision bounds of the pipe entity. */
  private updateCollisionBounds() {
    const bodyBounds = this.body.getBounds();
    const headBounds = this.head.getBounds();
    this.headCollisionBounds.copyFromBounds(headBounds);
    this.bodyCollisionBounds.copyFromBounds(bodyBounds);
  }

  /**
   * Creates the components (head and body) for a pipe entity.
   *
   * @param screenHeight The height of the screen.
   * @param options The options for initializing the pipe.
   * @returns An object containing the head and body components of the pipe.
   */
  private createComponents(
    screenHeight: number,
    normalizedHeight: number,
    type: "top" | "bottom",
  ) {
    const bodyTex = Resources.spritesheet2.textures.pipeBody;
    const headTex = Resources.spritesheet2.textures.pipeHead;
    const head = new Sprite(headTex);
    const headBounds = head.getBounds();

    const body = new TilingSprite({
      texture: bodyTex,

      // We want the height to be body.height + head.height (and not just body.height).
      height: Math.max(normalizedHeight * screenHeight - headBounds.height, 0),
    });

    // We want the anchor to be at the bottom-center.
    // Then it will grow from the bottom and not on both ends.
    body.anchor = head.anchor = { x: 0.5, y: 1 };
    body.rotation = head.rotation = 0;
    body.position.y = screenHeight;

    const pipeHeight = body.getBounds().height;
    head.position.y = screenHeight - pipeHeight + 1;

    if (type === "top") {
      // Adjustments to place it on top.
      body.rotation = head.rotation = Math.PI;
      body.position.y = 0;
      head.position.y = pipeHeight - 1;

      // Flip horizontally (this is to match the fake light direction of the sprites).
      head.scale.x *= -1;
      body.scale.x *= -1;
    }

    return { head, body };
  }
}
