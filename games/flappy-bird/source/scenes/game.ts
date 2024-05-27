import { Application, Container } from "pixi.js";

import { Resources } from "@app/assets/resources";
import { Level } from "@app/scripts/level";
import { Score } from "@app/scripts/score";
import { GameUI } from "@app/scripts/ui/game-ui";

import { Ground } from "@app/scripts/entities/ground";
import { Overlay } from "@app/scripts/ui/overlay";

import * as Keyboard from "@gamelab/input-system/keyboard";
import * as Mouse from "@gamelab/input-system/mouse";
import * as Touch from "@gamelab/input-system/touch";

/** Defines all the possible states of the game. */
enum GameState {
  PENDING_START = 0,
  PLAYING = 1,
  PAUSED = 2,
  GAME_OVER = 3,
}

/** Coordinates the game state. */
export class GameScene extends Container {
  private ground: Ground;
  private level: Level;
  private score: Score;
  private ui: GameUI;

  private state: GameState;
  private statePreviousToPause: GameState;
  private shareWindow: Window | null;

  constructor() {
    super({ isRenderGroup: true, zIndex: 1 });

    this.state = this.statePreviousToPause = GameState.PENDING_START;
    this.score = new Score();
    this.shareWindow = null;
    this.ground = new Ground();

    this.level = new Level(this.ground);
    this.level.on("point", this.onPoint.bind(this));
    this.level.on("gameover", this.onGameOver.bind(this));

    this.ui = new GameUI();
    this.ui.setScore(0);
    this.ui.on("togglepause", this.togglePause.bind(this));
    this.ui.on("ok", this.returnToMenu.bind(this));
    this.ui.on("share", this.shareScore.bind(this));

    this.addChild(this.ui, this.level, this.ground);
  }

  public onUpdate(delta: number) {
    if (Keyboard.escapeKey.wasPressedThisFrame) {
      this.togglePause();
    }

    // Paused stops any further updates.
    if (this.state === GameState.PAUSED) {
      return;
    }

    // The ground moves even before the game starts.
    this.ground.onUpdate(delta);

    if (
      this.state === GameState.PENDING_START &&
      (Keyboard.spaceKey.wasPressedThisFrame ||
        Mouse.leftButton.wasPressedThisFrame ||
        Touch.receivedTouchThisFrame)
    ) {
      this.ui.hideInstructions();
      this.state = GameState.PLAYING;
    }

    // While not started, we don't update the level.
    if (this.state === GameState.PENDING_START) {
      return;
    }

    this.level.onUpdate(delta);
  }

  public onFixedUpdate(fixedDeltaTime: number) {
    if (
      this.state === GameState.PAUSED ||
      this.state === GameState.PENDING_START
    ) {
      return;
    }

    this.level.onFixedUpdate(fixedDeltaTime);
  }

  public onResize(newCanvasWidth: number, newCanvasHeight: number) {
    this.ui.onResize(newCanvasWidth, newCanvasHeight);
    this.ground.onResize(newCanvasWidth, newCanvasHeight);
    this.level.onResize(newCanvasWidth, newCanvasHeight);
  }

  /** Toggles the game state between paused and the previous state. */
  private togglePause() {
    if (this.state !== GameState.PAUSED) {
      // We can't pause the game if it's over.
      if (this.state === GameState.GAME_OVER) {
        return;
      }

      this.statePreviousToPause = this.state;

      this.state = GameState.PAUSED;
      this.ground.toggleStop(true);
      this.level.onPause(true);
      this.ui.togglePauseSprite(true);

      return;
    }

    this.state = this.statePreviousToPause;
    this.ui.togglePauseSprite(false);
    this.level.onPause(false);

    // The ground moves on all states excep on play and on pending start.
    this.ground.toggleStop(
      this.state !== GameState.PENDING_START &&
        this.state !== GameState.PLAYING,
    );
  }

  /** Returns to the main menu. */
  private returnToMenu() {
    const overlay = new Overlay({ color: "black" });

    Resources.swooshSound.play();
    Application.instance.stage.addChild(overlay);

    overlay.fadeIn(0.5, () => {
      this.emit("menu");
      overlay.fadeOut(0.5, () => {
        overlay.destroy();
        overlay.removeFromParent();
      });
    });
  }

  /** Starts a Tweet intent to share the current score. */
  private shareScore() {
    if (this.shareWindow) {
      this.shareWindow.close();
    }

    const url = "https://thegamelab.dev";
    const score = this.score.currentScore;
    const lines = [
      `I scored ${score} ${
        score === 1 ? "point" : "points"
      } in Flappy Bird! Can you beat me?`,

      `Try it on ${url}`,
      "\nPowered by @PixiJS",
    ];

    const tweetIntent = new URL("https://twitter.com/intent/tweet");
    tweetIntent.searchParams.set("text", lines.join("\n"));
    tweetIntent.searchParams.set("hashtags", "pixijs,webgl,webgpu");

    const [left, top] = [
      window.screen.width / 2 - 300,
      window.screen.height / 2 - 175,
    ];

    const features = `popup=yes,left=${left},top=${top},height=350,width=600`;
    this.shareWindow = window.open(tweetIntent, "", features);
  }

  /** Event fired when the player dies. */
  private onGameOver() {
    const score = this.score.currentScore;
    const isHighscore = this.score.tryUpdateHighScore();

    this.ui.gameOver();
    this.ui.showSummary(score, this.score.currentHighScore, isHighscore);
    this.ui.showActions();

    this.state = GameState.GAME_OVER;
  }

  /** Event fired when the player scores a point. */
  private onPoint() {
    this.score.increase();
    this.ui.setScore(this.score.currentScore);

    Resources.pointSound.play();
  }
}
