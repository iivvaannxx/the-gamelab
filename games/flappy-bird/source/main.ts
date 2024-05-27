import { Application } from "pixi.js";

import "@app/styles/main.css";
import "ldrs/bouncy";

import { Resources } from "@app/assets/resources";
import { EventLoop } from "@app/scripts/event-loop";

import * as Keyboard from "@gamelab/input-system/keyboard";
import * as Mouse from "@gamelab/input-system/mouse";
import * as Touch from "@gamelab/input-system/touch";

import type { GameScene } from "./scenes/game";

/**
 * Initializes the Flappy Bird game.
 * @returns The instance of the application.
 */
async function init() {
  const container = document.querySelector("#app") as HTMLElement;
  const loader = document.querySelector(".loader") as HTMLElement;

  // For some reason the loader comes with a weird pre-defined padding.
  loader.shadowRoot
    ?.querySelector(".container")
    ?.setAttribute("style", "padding-bottom: 0;");

  // Initialize the Pixi.js application.
  const app = new Application();
  await app.init({
    resizeTo: container,
    resolution: Math.min(3, window.devicePixelRatio),
    autoDensity: true,

    // We use a transparent background. The background is set from CSS.
    backgroundAlpha: 0,
  });

  container.appendChild(app.canvas);

  // Initialize all the game modules.
  await Resources.init();
  Keyboard.init();
  Mouse.init();
  Touch.init();

  Object.assign(Application, { instance: app });
  loader.classList.add("animate-out");
  container.classList.add("animate-in");

  return app;
}

/**
 * Starts the game.
 * @param app - The application instance.
 */
async function start(app: Application) {
  const { MenuScene } = await import("./scenes/menu");
  const { GameScene } = await import("./scenes/game");

  const eventLoop = new EventLoop(app);
  const menuScene = new MenuScene();
  let gameScene: GameScene | null = null;

  // First scene is the menu.
  app.stage.addChild(menuScene);

  const switchToMenu = () => {
    if (gameScene) {
      gameScene.removeFromParent();
      gameScene.destroy();

      gameScene = null;
    }

    menuScene.visible = true;
    menuScene.reset();
  };

  const switchToGame = () => {
    menuScene.visible = false;

    gameScene = new GameScene();
    gameScene.on("menu", switchToMenu);
    app.stage.addChild(gameScene);

    // Trigger an initial resize to ensure everything is in place.
    gameScene.onResize(app.screen.width, app.screen.height);
  };

  menuScene.on("game", switchToGame);

  eventLoop.on("onUpdate", (delta) => {
    Keyboard.update();
    Mouse.update();
    Touch.update();

    menuScene.onUpdate(delta);
    gameScene?.onUpdate(delta);
  });

  eventLoop.on("onFixedUpdate", (delta) => {
    gameScene?.onFixedUpdate(delta);
  });

  eventLoop.on("onResize", (width, height) => {
    menuScene.onResize(width, height);
    gameScene?.onResize(width, height);
  });
}

// Entrypoint of the game.
init().then(start);

// Disable the context menu.
window.addEventListener("contextmenu", (e) => e.preventDefault());
