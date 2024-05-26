import { Application, Container, Sprite } from "pixi.js";

import { Resources } from "@app/assets/resources";
import { Overlay } from "@app/scripts/ui/overlay";
import type { SpriteButton } from "@app/scripts/ui/sprite-button";
import type { ResponsiveElement } from "@app/types";
import { getResponsiveScale } from "@app/utils/screen";

/** Defines the logic for the UI of the game (buttons, score...) */
export class GameUI extends Container {
  private score: ResponsiveElement<Container>;
  private summary: ResponsiveElement<Container>;

  private gameOverText: ResponsiveElement<Sprite>;
  private restartButton: ResponsiveElement<SpriteButton>;
  private shareButton: ResponsiveElement<SpriteButton>;
  private pauseButton: ResponsiveElement<SpriteButton>;

  constructor() {
    super();

    this.score = this.setupScore();

    // Ensure the UI is always on top.
    this.zIndex = 10;
  }

  /**
   * Resizes the game UI. Runs when the game area is resized.
   *
   * @param newCanvasWidth The new width of the game area.
   * @param newCanvasHeight The new height of the game area.
   */
  public onResize(newCanvasWidth: number, newCanvasHeight: number) {
    this.score.onGameResize(newCanvasWidth, newCanvasHeight);
    /* this.summary.onGameResize(newCanvasWidth, newCanvasHeight);
    this.gameOverText.onGameResize(newCanvasWidth, newCanvasHeight);
    this.restartButton.onGameResize(newCanvasWidth, newCanvasHeight);
    this.shareButton.onGameResize(newCanvasWidth, newCanvasHeight);
    this.pauseButton.onGameResize(newCanvasWidth, newCanvasHeight); */

    const scale = getResponsiveScale(newCanvasWidth, newCanvasHeight);

    for (const child of this.children) {
      child.scale.set(scale);
    }
  }

  /**
   * Flashes a white overlay on the UI.
   * @param duration The duration of the flash in seconds. Default is 0.3 seconds.
   */
  public whiteFlash(duration = 0.3) {
    const overlay = new Overlay({ color: "white" });

    // We add it to the app stage to ensure it displays always on top of everything.
    Application.instance.stage.addChild(overlay);

    // The overlay starts already in, then fades out.
    overlay.alpha = 1;
    overlay.fadeOut(duration, () => {
      Application.instance.stage.removeChild(overlay);
      overlay.destroy();
    });
  }

  /**
   * Sets the score in the game UI.
   * @param score - The score to be displayed.
   */
  public setScore(score: number) {
    const numbers = Resources.numbersTextures;
    const scoreDigits = `${score}`.split("").map(Number);
    const sprites = scoreDigits.map((digit) => new Sprite(numbers[digit]));

    const spacing = 1;
    const totalWidth =
      spacing * (sprites.length - 1) +
      sprites.reduce((acc, sprite) => acc + sprite.width, 0);

    // Calculate the positions so they appear centered.
    let startPosition = sprites.length === 1 ? 0 : -totalWidth / 2;
    for (const sprite of sprites) {
      sprite.x = startPosition;
      startPosition += sprite.width + spacing;
    }

    // biome-ignore lint/complexity/noForEach: one liner is cleaner.
    this.score.element.children.forEach((sprite) => sprite.destroy());
    this.score.element.removeChildren();

    // Add the new sprites to the container.
    this.score.element.addChild(...sprites);
  }

  /** Creates and sets up the score text in the UI. */
  private setupScore() {
    const scoreSprites = new Container();
    this.addChild(scoreSprites);

    return {
      element: scoreSprites,
      onGameResize(newCanvasWidth: number, newCanvasHeight: number) {
        scoreSprites.x = newCanvasWidth / 2;
        scoreSprites.y = newCanvasHeight * 0.075;
      },
    };
  }
}
