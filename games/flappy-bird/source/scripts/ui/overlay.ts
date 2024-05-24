import gsap from "gsap";
import { Sprite } from "pixi.js";

import { Resources } from "@app/assets/resources";

/** Describes the initialization parameters for the overlay. */
export type OverlayInit = {
  /** The color of the overlay. */
  color: "white" | "black";
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
   * Fades in the overlay element.
   *
   * @param duration - The duration of the fade-in animation in seconds. Default is 0.5 seconds.
   * @param onComplete - An optional callback function to be called when the fade-in animation completes.
   */
  fadeIn(duration = 0.5, onComplete?: () => void) {
    this.alpha = 0;
    gsap.to(this, {
      alpha: 1,
      duration,
      ease: "power2.inOut",
      onComplete,
    });
  }

  /**
   * Fades out the overlay element.
   *
   * @param duration The duration of the fade out animation in seconds. Default is 0.5 seconds.
   * @param onComplete A callback function to be called when the fade out animation is complete.
   */
  fadeOut(duration = 0.5, onComplete?: () => void) {
    this.alpha = 1;
    gsap.to(this, {
      alpha: 0,
      duration,
      ease: "power2.inOut",
      onComplete,
    });
  }
}
