import { gsap } from "gsap";
import { Container, Sprite } from "pixi.js";

import { Resources } from "@app/assets/resources";
import { Bird } from "@app/scripts/entities/bird";
import { ButtonSprite } from "@app/scripts/ui/button-sprite";

import type { ResponsiveElement } from "@app/types";
import { getGameAreaSize } from "@app/utils/screen";

/** Defines the logic for the UI of the menu (responsiveness, buttons...) */
export class MenuUI extends Container {
  private copyright: ResponsiveElement<Sprite>;
  private startButton: ResponsiveElement<ButtonSprite>;
  private scoreButton: ResponsiveElement<ButtonSprite>;
  private logo: ResponsiveElement<Container>;

  constructor() {
    super();

    this.logo = this.setupLogo();
    this.copyright = this.setupCopyrightNotice();
    this.startButton = this.setupStartButton();
    this.scoreButton = this.setupScoreButton();

    // Ensure the UI is always on top.
    this.zIndex = 100;
  }

  /** Event fired when the game screen gets resized. */
  public onResize(newCanvasWidth: number, newCanvasHeight: number) {
    const scaleFactor = Math.min(newCanvasWidth, newCanvasHeight) / 140;

    this.logo.onGameResize(newCanvasWidth, newCanvasHeight);
    this.startButton.onGameResize(newCanvasWidth, newCanvasHeight);
    this.scoreButton.onGameResize(newCanvasWidth, newCanvasHeight);
    this.copyright.onGameResize(newCanvasWidth, newCanvasHeight);

    for (const child of this.children) {
      child.scale.set(scaleFactor);
    }
  }

  /**
   * Disables the interaction with the buttons.
   * @param enable Whether to enable or disable the interaction.
   */
  public toggleInteraction(enable: boolean) {
    if (!enable) {
      document.body.style.cursor = "default";
    }

    this.startButton.element.interactive = enable;
    this.scoreButton.element.interactive = enable;
  }

  /** Creates and sets up the Flappy Bird logo in the UI. */
  private setupLogo() {
    const logo = new Sprite(Resources.spritesheet.textures.flappyBirdTitle);
    const bird = new Bird();

    // These are arbitrary values, don't need to be responsive.
    // They have been manually adjusted just to look good.
    logo.x -= 12;
    bird.x += 52;
    bird.y -= 1;

    const container = new Container({ children: [logo, bird] });
    this.addChild(container);

    const { height } = getGameAreaSize();
    const tween = gsap.to(container, {
      y: height / 4 + height / 80,

      duration: 0.5,
      ease: "sine.inOut",
      repeat: -1,

      yoyo: true,
    });

    return {
      element: container,
      onGameResize(newCanvasWidth: number, newCanvasHeight: number) {
        container.x = newCanvasWidth / 2;
        container.y = newCanvasHeight * 0.25;

        // The tween also gets updated when the game is resized.
        tween.vars.y = newCanvasHeight / 4 + newCanvasHeight / 80;
        tween.invalidate();
      },
    };
  }

  /** Creates and sets up the copyright notice in the UI. */
  private setupCopyrightNotice() {
    const copyright = new Sprite(Resources.spritesheet.textures.gearsNotice);
    this.addChild(copyright);

    return {
      element: copyright,
      onGameResize(newCanvasWidth: number, newCanvasHeight: number) {
        copyright.x = newCanvasWidth / 2;
        copyright.y = newCanvasHeight * 0.9;
      },
    };
  }

  /** Creates and sets up the "START" button in the UI. */
  private setupStartButton() {
    const startButton = new ButtonSprite(
      Resources.spritesheet.textures.startButton,
      {
        onPointerDown: () => this.emit("start"),
      },
    );

    this.addChild(startButton);
    return {
      element: startButton,
      onGameResize(newCanvasWidth: number, newCanvasHeight: number) {
        startButton.x = newCanvasWidth * 0.25;
        startButton.y = newCanvasHeight * 0.725;
      },
    };
  }

  /** Creates and sets up the "SCORE" button in the UI. */
  private setupScoreButton() {
    const scoreButton = new ButtonSprite(
      Resources.spritesheet.textures.scoreButton,
      {
        onPointerDown: () => {
          // Show score.
        },
      },
    );

    this.addChild(scoreButton);
    return {
      element: scoreButton,
      onGameResize(newCanvasWidth: number, newCanvasHeight: number) {
        scoreButton.x = newCanvasWidth * 0.75;
        scoreButton.y = newCanvasHeight * 0.725;
      },
    };
  }
}
