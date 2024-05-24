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

  Object.assign(Application, { instance: app });
  return app;
}

/**
 * Starts the game.
 * @param app - The application instance.
 */
async function start(app: Application) {
  const { getMenuScene } = await import("./scenes/menu");
  const { getGameScene } = await import("./scenes/game");

  const menuScene = getMenuScene();
  const gameScene = getGameScene({ app });
  gameScene.visible = false;

  menuScene.on("game", () => {
    menuScene.visible = false;
    gameScene.visible = true;
  });

  // The ground is always on screen. We can create it here.
  const ground = new Ground(50);
  app.stage.addChild(ground, menuScene, gameScene);

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
