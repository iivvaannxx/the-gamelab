import gsap from "gsap";
import { AnimatedSprite, Application, Container, Sprite } from "pixi.js";

import { Resources } from "@app/assets/resources";
import { Overlay } from "@app/scripts/ui/overlay";
import { SpriteButton } from "@app/scripts/ui/sprite-button";

import type { ResponsiveElement } from "@app/types";
import { randomFloatRange } from "@app/utils/random";
import { getResponsiveScale } from "@app/utils/screen";

/** Defines the logic for the UI of the game (buttons, score...) */
export class GameUI extends Container {
  private score: ResponsiveElement<Container>;
  private summary: ResponsiveElement<Container>;
  private backdropOverlay: ResponsiveElement<Overlay>;

  private gameOverText: ResponsiveElement<Sprite>;
  private okButton: ResponsiveElement<SpriteButton>;
  private shareButton: ResponsiveElement<SpriteButton>;
  private pauseButton: ResponsiveElement<SpriteButton>;

  private instructions: ResponsiveElement<Container>;

  constructor() {
    super();

    this.backdropOverlay = this.setupBackdropOverlay();
    this.score = this.setupScore();
    this.pauseButton = this.setupPauseButton();
    this.gameOverText = this.setupGameOverText();
    this.summary = this.setupSummary();
    this.okButton = this.setupOkButton();
    this.shareButton = this.setupShareButton();
    this.instructions = this.setupInstructions();

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
    this.pauseButton.onGameResize(newCanvasWidth, newCanvasHeight);
    this.gameOverText.onGameResize(newCanvasWidth, newCanvasHeight);
    this.summary.onGameResize(newCanvasWidth, newCanvasHeight);
    this.okButton.onGameResize(newCanvasWidth, newCanvasHeight);
    this.shareButton.onGameResize(newCanvasWidth, newCanvasHeight);
    this.instructions.onGameResize(newCanvasWidth, newCanvasHeight);

    const scale = getResponsiveScale(newCanvasWidth, newCanvasHeight);

    for (const child of this.children) {
      child.scale.set(scale);
    }

    // We resize it after scaling, because it has a custom scale.
    this.backdropOverlay.onGameResize(newCanvasWidth, newCanvasHeight);
  }

  /**
   * Sets the score in the game UI.
   * @param score - The score to be displayed.
   */
  public setScore(score: number) {
    const sprites = this.getScoreSprites(score);

    // biome-ignore lint/complexity/noForEach: one liner is cleaner.
    this.score.element.children.forEach((sprite) => sprite.destroy());
    this.score.element.removeChildren();

    // Add the new sprites to the container.
    this.score.element.addChild(...sprites);
  }

  /** Shows the game over UI. */
  public gameOver() {
    const overlay = new Overlay({ color: "white" });
    this.addChild(overlay);

    // The overlay starts already in, then fades out.
    overlay.alpha = 1;
    this.score.element.visible = false;
    this.pauseButton.element.visible = false;

    overlay.fadeOut(0.3, () => {
      this.removeChild(overlay);
      overlay.destroy();

      this.backdropOverlay.element.fade({
        from: 0,
        to: 0.5,

        onComplete: () => {
          // Fade in the game over text.
          Resources.swooshSound.play();
          gsap.to(this.gameOverText.element, {
            alpha: 1,
            y:
              Application.instance.screen.height / 6 +
              Application.instance.screen.height / 15,

            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    });
  }

  /**
   * Shows the final game summary with the given score and highscore.
   *
   * @param score The player's score.
   * @param highscore The current highscore.
   * @param isNewHighscore Whether the player has set a new highscore.
   */
  public showSummary(
    score: number,
    highscore: number,
    isNewHighscore: boolean,
  ) {
    const { element } = this.summary;

    const scoreContainer = element.getChildByName("score") as Container;
    const highscoreContainer = element.getChildByName("highscore") as Container;
    const newLabel = element.getChildByName("new") as Sprite;
    const medal = element.getChildByName("medal") as Sprite;
    const plus = element.getChildByName("plus") as Sprite;
    const sparkles = element.getChildByName("sparkles") as AnimatedSprite;

    // Show the "NEW" label if it's a new highscore.
    newLabel.visible = isNewHighscore;
    scoreContainer.addChild(...this.getScoreSprites(score, "right"));

    const truncatedHighscore = Math.min(9999, highscore);
    plus.visible = highscore > truncatedHighscore;
    highscoreContainer.addChild(
      ...this.getScoreSprites(truncatedHighscore, "right"),
    );

    // Give a medal based on the score.
    medal.visible = sparkles.visible = score >= 10;
    medal.texture =
      score >= 10
        ? Resources.spritesheet.textures.bronzeMedal
        : score >= 20
          ? Resources.spritesheet.textures.silverMedal
          : score >= 30
            ? Resources.spritesheet.textures.goldMedal
            : Resources.spritesheet.textures.platinumMedal;

    gsap.to(element, {
      alpha: 1,
      delay: 1,
      duration: 1,
      ease: "power2.out",
    });
  }

  /** Shows the action buttons on the UI. */
  public showActions() {
    this.okButton.element.interactive = true;
    gsap.to(this.okButton.element, {
      alpha: 1,
      delay: 1.25,
      duration: 1,
      ease: "power2.out",
    });

    this.shareButton.element.interactive = true;
    gsap.to(this.shareButton.element, {
      alpha: 1,
      delay: 1.25,
      duration: 1,
      ease: "power2.out",
    });
  }

  /** Hides the instructions on the UI. */
  public hideInstructions() {
    gsap.to(this.instructions.element, {
      alpha: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  }

  /**
   * Generates an array of Sprite objects representing the score digits.
   *
   * @param score - The score value.
   * @param align - The alignment of the score. Default is "center".
   * @returns An array of Sprite objects representing the score digits.
   */
  private getScoreSprites(score: number, align: "center" | "right" = "center") {
    const sprites = `${score}`.split("").map((digit) => {
      const index = Number(digit);
      return new Sprite(Resources.numbersTextures[index]);
    });

    const spacing = 1;
    const totalWidth =
      spacing * (sprites.length - 1) +
      sprites.reduce((acc, sprite) => acc + sprite.width, 0);

    // Calculate the positions so they appear centered.
    let startPosition =
      align === "center"
        ? sprites.length === 1
          ? 0
          : -totalWidth / 2
        : -totalWidth;

    for (const sprite of sprites) {
      sprite.x = startPosition;
      startPosition += sprite.width + spacing;
    }

    return sprites;
  }

  /** Creates and sets up the "PAUSE" button in the UI. */
  private setupPauseButton() {
    const pauseButton = new SpriteButton(
      Resources.spritesheet.textures.pauseButton,
      {
        onPointerDown: () => {
          this.emit("togglepause");
        },
      },
    );

    this.addChild(pauseButton);
    return {
      element: pauseButton,
      onGameResize(newCanvasWidth: number, newCanvasHeight: number) {
        pauseButton.x = newCanvasWidth * 0.125;
        pauseButton.y = newCanvasHeight * 0.075;
      },
    };
  }

  /** Creates and sets up the game over text in the UI. */
  private setupGameOverText() {
    const gameOverText = new Sprite(
      Resources.spritesheet.textures.gameOverTitle,
    );

    gameOverText.alpha = 0;
    this.addChild(gameOverText);

    return {
      element: gameOverText,
      onGameResize(newCanvasWidth: number, newCanvasHeight: number) {
        gameOverText.x = newCanvasWidth / 2;

        // When we show the text, we animate it down a bit.
        // If it hasn't been shown yet, we don't apply the offset.
        // Otherwise we apply it to set the same "final" position of the animation.
        const offset = gameOverText.alpha === 0 ? 0 : newCanvasHeight / 15;
        gameOverText.y = newCanvasHeight / 6 + offset;
      },
    };
  }

  /** Creates and sets up the instructions in the UI. */
  private setupInstructions() {
    const { textures } = Resources.spritesheet;

    const instructions = new Container();
    const getReadyText = new Sprite(textures.getReadyTitle);
    const tapInstructions = new Sprite(textures.instructions);

    instructions.addChild(getReadyText, tapInstructions);
    this.addChild(instructions);

    return {
      element: instructions,
      onGameResize(newCanvasWidth: number, newCanvasHeight: number) {
        instructions.x = newCanvasWidth / 2;
        instructions.y = newCanvasHeight / 3.5;

        tapInstructions.y = 75;
      },
    };
  }

  /** Creates and sets up the backdrop on the UI. */
  private setupBackdropOverlay() {
    const blackOverlay = new Overlay({ color: "black" });
    blackOverlay.zIndex = -1;

    this.addChild(blackOverlay);
    return {
      element: blackOverlay,
      onGameResize(newCanvasWidth: number, newCanvasHeight: number) {
        blackOverlay.scale.set(100000);
        blackOverlay.x = newCanvasWidth / 2;
        blackOverlay.y = newCanvasHeight / 2;
      },
    };
  }

  /** Creates and sets up the summary in the UI. */
  private setupSummary() {
    const scoreboard = new Sprite(Resources.spritesheet.textures.scoreboard);
    const sparkles = new AnimatedSprite(
      Resources.spritesheet.animations.sparkles,
    );

    const randomizeSparklesPosition = () => {
      sparkles.x = randomFloatRange(-38, -27);
      sparkles.y = randomFloatRange(-3, 8);
    };

    // Initial random position.
    randomizeSparklesPosition();
    sparkles.onLoop = randomizeSparklesPosition;
    sparkles.label = "sparkles";
    sparkles.visible = false;

    const scoreContainer = new Container({
      label: "score",
      x: 48,
      y: -7,
      scale: 0.75,
    });

    const highscoreContainer = new Container({
      label: "highscore",
      x: 48,
      y: 14,
      scale: 0.75,
    });

    // The "new" label that appears when the player gets a new highscore.
    const newLabel = new Sprite({
      texture: Resources.spritesheet.textures.newLabel,
      label: "new",
      x: 20,
      y: 4,
      scale: 0.6,
      visible: false,
    });

    // A medal given to the player based on their score.
    const medal = new Sprite({
      texture: Resources.spritesheet.textures.bronzeMedal,
      label: "medal",
      x: -32.5,
      y: 3,
      visible: false,
    });

    const plus = new Sprite({
      texture: Resources.spritesheet.textures.plus,
      label: "plus",
      x: 18,
      y: 14,
      scale: 0.75,
      visible: false,
    });

    const summary = new Container();
    summary.addChild(
      scoreboard,
      scoreContainer,
      highscoreContainer,
      newLabel,
      medal,
      sparkles,
      plus,
    );

    sparkles.play();
    sparkles.animationSpeed = 0.125;

    summary.alpha = 0;
    this.addChild(summary);

    return {
      element: summary,
      onGameResize(newCanvasWidth: number, newCanvasHeight: number) {
        summary.x = newCanvasWidth / 2;
        summary.y = newCanvasHeight / 2.1;
      },
    };
  }

  /** Creates and sets up the "OK" button in the UI. */
  private setupOkButton() {
    const okButton = new SpriteButton(Resources.spritesheet.textures.okButton, {
      onPointerDown: () => {
        this.emit("ok");
      },
    });

    okButton.alpha = 0;
    okButton.interactive = false;
    this.addChild(okButton);

    return {
      element: okButton,
      onGameResize(newCanvasWidth: number, newCanvasHeight: number) {
        okButton.x = newCanvasWidth * 0.25;
        okButton.y = newCanvasHeight * 0.725;
      },
    };
  }

  /** Creates and sets up the share button on the UI. */
  private setupShareButton() {
    const shareButton = new SpriteButton(
      Resources.spritesheet.textures.shareButton,
      {
        onPointerDown: () => {
          this.emit("share");
        },
      },
    );

    shareButton.alpha = 0;
    shareButton.interactive = false;
    this.addChild(shareButton);

    return {
      element: shareButton,
      onGameResize(newCanvasWidth: number, newCanvasHeight: number) {
        shareButton.x = newCanvasWidth * 0.75;
        shareButton.y = newCanvasHeight * 0.725;
      },
    };
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
