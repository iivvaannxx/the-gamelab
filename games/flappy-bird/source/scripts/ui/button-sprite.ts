import { type ObservablePoint, Sprite, type Texture } from "pixi.js";

/** The events that can be triggered by our button implementation. */
type Events = {
  /** Event fired when the button is pressed. */
  onPointerDown?: () => void;

  /** Event fired when the button is released. */
  onPointerUp?: () => void;
};

/** Defines a simple sprite which is intended to be used as a button. */
export class ButtonSprite extends Sprite {
  constructor(texture: Texture, { onPointerDown, onPointerUp }: Events) {
    super({ texture, eventMode: "static" });
    let onBeforeHoverScale: ObservablePoint;

    this.on("mouseover", () => {
      document.body.style.cursor = "pointer";
      onBeforeHoverScale = this.scale.clone();

      this.scale.x *= 1.05;
      this.scale.y *= 1.05;
    });

    this.on("mouseout", () => {
      document.body.style.cursor = "default";
      this.scale = onBeforeHoverScale;
    });

    this.on("pointerdown", () => {
      // Simulate a press effect.
      this.y += this.height / 16;
      onPointerDown?.call(this);
    });

    this.on("pointerup", () => {
      // Reset the button from the "press" state.
      this.y -= this.height / 16;
      onPointerUp?.call(this);
    });
  }
}
