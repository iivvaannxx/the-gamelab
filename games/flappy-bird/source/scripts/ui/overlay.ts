import gsap from "gsap";
import { Sprite } from "pixi.js";

import { Resources } from "@app/assets/resources";

/** Describes the initialization parameters for the overlay. */
export type OverlayInit = {
  /** The color of the overlay. */
  color: "white" | "black";
};

/** Describes the options for fading an overlay. */
type OverlayFadeOptions = {
  /** The initial opacity. */
  from: number;

  /** The target opacity to fade to. */
  to: number;

  /** The duration of the fade-in animation in seconds. Default is 0.5 seconds. */
  duration?: number;

  /** An optional callback function to be called when the fade-in animation completes. */
  onComplete?: () => void;
};

/** A simple overlay used to manipulate the game in a more user-friendly way. */
export class Overlay extends Sprite {
  constructor({ color }: OverlayInit) {
    super(
      color === "white"
        ? Resources.spritesheet.textures.whiteTex
        : Resources.spritesheet.textures.blackTex,
    );

    this.alpha = 0;
    this.eventMode = "none";

    // Make it cover the whole screen.
    this.scale.set(100000);
    this.zIndex = 10000;
  }

  /**
   * Fades the overlay from one alpha value to another over a specified duration.
   *
   * @param options - The options for fading the overlay.
   * @param options.from - The starting alpha value.
   * @param options.to - The ending alpha value.
   * @param options.duration - The duration of the fade animation in seconds. Default is 0.5 seconds.
   * @param options.onComplete - A callback function to be called when the fade animation completes.
   */
  public fade({ from, to, duration = 0.5, onComplete }: OverlayFadeOptions) {
    this.alpha = from;
    gsap.to(this, {
      alpha: to,
      duration,
      ease: "power2.inOut",
      onComplete,
    });
  }

  /**
   * Fades in the overlay with the specified duration.
   *
   * @param duration - The duration of the fade animation in seconds. Default is 0.3 seconds.
   * @param onComplete - An optional callback function to be called when the fade animation completes.
   */
  public fadeIn(duration = 0.3, onComplete?: () => void) {
    this.fade({ from: 0, to: 1, duration, onComplete });
  }

  /**
   * Fades out the overlay.
   *
   * @param duration The duration of the fade animation in seconds. Default is 0.3.
   * @param onComplete A callback function to be called when the fade animation is complete.
   */
  public fadeOut(duration = 0.3, onComplete?: () => void) {
    this.fade({ from: 1, to: 0, duration, onComplete });
  }
}
