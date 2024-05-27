import { Application, Container } from "pixi.js";

import { Resources } from "@app/assets/resources";
import { MenuUI } from "@app/scripts/ui/menu-ui";
import { Overlay } from "@app/scripts/ui/overlay";

import { Ground } from "@app/scripts/entities/ground";

/** Defines all the logic of the menu. */
export class MenuScene extends Container {
  private ui: MenuUI;
  private ground: Ground;

  constructor() {
    super({ isRenderGroup: true });

    this.ui = new MenuUI();
    this.ground = new Ground();
    this.addChild(this.ui, this.ground);

    // When the start button is clicked:
    this.ui.on("start", () => {
      // Disable the interaction with the buttons.
      this.ui.toggleInteraction(false);

      Resources.swooshSound.play();
      this.startGame();
    });
  }

  public onUpdate(delta: number) {
    this.ground.onUpdate(delta);
  }

  /**
   * Event invoked when the game area is resized.
   *
   * @param newCanvasWidth - The new width of the canvas.
   * @param newCanvasHeight - The new height of the canvas.
   */
  public onResize(newCanvasWidth: number, newCanvasHeight: number) {
    this.ground.onResize(newCanvasWidth, newCanvasHeight);
    this.ui.onResize(newCanvasWidth, newCanvasHeight);
  }

  public reset() {
    this.ui.reset();
  }

  /**
   * Fired when the start button is clicked.
   * Bubbles up the event so it's handled on the outside.
   */
  private startGame() {
    // The overlay is a child of the application.
    // Otherwise it would be removed when switching from this scene to the next.
    const overlay = new Overlay({ color: "black" });
    Application.instance.stage.addChild(overlay);

    // Fade the overlay, hide everything.
    overlay.fadeIn(0.4, () => {
      this.visible = false;
      this.emit("game");

      overlay.fadeOut(0.3, () => {
        overlay.removeFromParent();
      });
    });
  }
}
