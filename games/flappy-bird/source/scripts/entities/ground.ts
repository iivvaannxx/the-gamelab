import { Resources } from "@app/assets/resources";
import { getResponsiveScale } from "@app/utils/screen";
import { Application, TilingSprite } from "pixi.js";

/** Defines the logic for the ground entity.  */
export class Ground extends TilingSprite {
  private stop = false;

  /** The Y coordinate of the ground surface. */
  public get surfaceY() {
    return this.y - this.getBounds(true).height;
  }

  constructor() {
    super({
      texture: Resources.spritesheet.textures.ground,
      eventMode: "none",
      interactiveChildren: false,
      zIndex: 1,
    });

    // Double the width of the ground to make it "infinite".
    this.width = this.texture.width * 2;
    this.anchor.y = 1;
  }

  /**
   * Updates the ground entity. Runs on every frame update.
   * @param delta The time in seconds since the last frame.
   */
  public onUpdate(delta: number) {
    if (this.stop) {
      return;
    }

    const { width } = Application.instance.screen;
    this.x -= (width / 3) * delta;

    // Half of the ground is offscreen.
    // Move it back to the right to create an "infinite" ground.
    if (this.x < -this.getBounds(true).width / 2) {
      this.x += this.getBounds(true).width / 2;
    }
  }

  /**
   * Resizes the ground entity. Runs when the game area is resized.
   *
   * @param newCanvasWidth The new width of the game area.
   * @param newCanvasHeight The new height of the game area.
   */
  public onResize(newCanvasWidth: number, newCanvasHeight: number) {
    this.y = newCanvasHeight;
    this.x = 0;

    const scale = getResponsiveScale(newCanvasWidth, newCanvasHeight);
    this.scale.set(scale * 1.05);
  }

  /**
   * Toggles the stop state of the ground entity.
   * @param stop - A boolean value indicating whether to stop or resume the ground entity.
   */
  public toggleStop(stop: boolean) {
    this.stop = stop;
  }
}
