import { Application } from "pixi.js";

import "@app/styles/main.css";
import { Resources } from "@app/assets/resources";
import { Ground } from "@app/scripts/entities/ground";
import { EventLoop } from "@app/scripts/event-loop";

import * as Keyboard from "@gamelab/input-system/keyboard";

/**
 * Initializes the Flappy Bird game.
 * @returns The instance of the application.
 */
async function init() {
  const container = document.querySelector("#app") as HTMLDivElement;

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

  globalThis.__PIXI_APP__ = app;
  Object.assign(Application, { instance: app });
  return app;
}

/**
 * Starts the game.
 * @param app - The application instance.
 */
async function start(app: Application) {
  const { MenuScene } = await import("./scenes/menu");
  const { GameScene } = await import("./scenes/game");

  // The ground is always on screen. We can create it here.
  const ground = new Ground();
  const menuScene = new MenuScene();
  const gameScene = new GameScene(ground);

  app.stage.addChild(menuScene, gameScene);
  gameScene.addChild(ground);

  menuScene.visible = false;
  gameScene.visible = true;

  menuScene.on("game", () => {
    menuScene.removeChild(ground);
    menuScene.visible = false;

    gameScene.visible = true;
    gameScene.addChild(ground);
  });

  const eventLoop = new EventLoop(app);
  eventLoop.on("update", (delta) => {
    Keyboard.update();
    ground.onUpdate(delta);

    if (gameScene.visible) {
      gameScene.onUpdate(delta);
    }
  });

  eventLoop.on("fixedUpdate", (fixedDelta) => {
    if (gameScene.visible) {
      gameScene.onFixedUpdate(fixedDelta);
    }
  });

  eventLoop.on("resize", (width, height) => {
    ground.onResize(width, height);
    menuScene.onResize(width, height);
    gameScene.onResize(width, height);
  });
}

// Entrypoint of the game.
init().then(start);
