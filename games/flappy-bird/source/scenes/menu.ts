import { Application, Container } from "pixi.js";

import { Resources } from "@app/assets/resources";
import { MenuUI } from "@app/scripts/ui/menu-ui";
import { Overlay } from "@app/scripts/ui/overlay";

/** Contains all the objects present on the menu screen. */
class MenuScene extends Container {
  /** The user interface container. */
  private ui: MenuUI;

  constructor() {
    super();

    this.ui = new MenuUI();
    this.addChild(this.ui);

    // When the start button is clicked:
    this.ui.on("start", () => {
      // Disable the interaction with the buttons.
      this.ui.toggleInteraction(false);

      Resources.swooshSound.play();
      this.startGame();
    });
  }

  /**
   * Event invoked when the game area is resized.
   *
   * @param newCanvasWidth - The new width of the canvas.
   * @param newCanvasHeight - The new height of the canvas.
   */
  public onResize(newCanvasWidth: number, newCanvasHeight: number) {
    this.ui.onResize(newCanvasWidth, newCanvasHeight);
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

/** The unique instance of our game scene. */
let menuScene: MenuScene;

/**
 * Creates a new menu scene. If one already exists, it will return the existing one.
 * @returns The current or newly created menu scene.
 */
export function getMenuScene() {
  if (menuScene) {
    console.warn("Menu scene already initialized.");
    return menuScene;
  }

  menuScene = new MenuScene();
  return menuScene;
}

export type { MenuScene };
