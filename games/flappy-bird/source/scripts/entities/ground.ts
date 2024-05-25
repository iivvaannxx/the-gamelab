import { Resources } from "@app/assets/resources";
import { getResponsiveScale } from "@app/utils/screen";
import { TilingSprite } from "pixi.js";

/** Defines the logic for the ground entity.  */
export class Ground extends TilingSprite {
  /** The speed at which the ground moves. */
  private speed: number;

  /** The Y coordinate of the ground surface. */
  public get surfaceY() {
    return this.y - this.getBounds().height;
  }

  constructor(speed: number) {
    super(Resources.spritesheet.textures.ground);

    this.anchor.y = 1;
    this.speed = speed;
    this.zIndex = 10;
  }

  /**
   * Updates the ground entity. Runs on every frame update.
   * @param delta The time in seconds since the last frame.
   */
  public onUpdate(delta: number) {
    this.tilePosition.x -= this.speed * delta;
  }

  /**
   * Resizes the ground entity. Runs when the game area is resized.
   *
   * @param newCanvasWidth The new width of the game area.
   * @param newCanvasHeight The new height of the game area.
   */
  public onResize(newCanvasWidth: number, newCanvasHeight: number) {
    this.y = newCanvasHeight;

    const scale = getResponsiveScale(newCanvasWidth, newCanvasHeight);
    this.scale.set(scale);
  }

  /** Stops the ground from moving. */
  public stop() {
    this.speed = 0;
  }
}
