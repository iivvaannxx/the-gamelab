import { Container } from "pixi.js";
import { Overlay } from "./overlay";

/** Defines the logic for the UI of the game (buttons, score...) */
export class GameUI extends Container {
  constructor() {
    super();
    this.zIndex = 10000;
  }

  /**
   * Flashes a white overlay on the UI.
   * @param duration The duration of the flash in seconds. Default is 0.3 seconds.
   */
  public whiteFlash(duration = 0.3) {
    const overlay = new Overlay({ color: "white" });
    this.addChild(overlay);

    // The overlay starts already in, then fades out.
    overlay.alpha = 1;
    overlay.fadeOut(duration, () => {
      this.removeChild(overlay);
      overlay.destroy();
    });
  }
}
