import { Application } from "pixi.js";

import "@app/styles/main.css";
import { Resources } from "@app/assets/resources";

import * as Keyboard from "@gamelab/input-system/keyboard";
import {
  ASPECT_RATIO,
  FIXED_UPDATE_RATE,
  MAX_DELTA_TIME,
  MAX_FPS,
} from "./constants";

/**
 * Initializes the Flappy Bird game.
 * @returns The instance of the application.
 */
async function initGame() {
  const container = document.querySelector("#app") as HTMLDivElement;
  document.documentElement.style.setProperty(
    "--aspect-ratio",
    `${ASPECT_RATIO}`,
  );

  // Initialize the Pixi.js application.
  const app = new Application();
  await app.init({
    resizeTo: container,
    resolution: Math.min(3, window.devicePixelRatio),
    autoDensity: true,
    eventMode: "none",

    // We use a transparent background. The gradient is set from CSS.
    backgroundAlpha: 0,
  });

  container.appendChild(app.canvas);

  // Initialize all the game modules.
  await Resources.init();
  Keyboard.init();

  Object.assign(Application, {
    instance: app,
    initialHeight: app.screen.height,
  });

  return app;
}

// Entrypoint of the game.
initGame().then(async (app) => {
  const { getGameScene } = await import("./scenes/game");
  const gameScene = getGameScene({ app });

  let totalTime = 0;
  let fixedTime = 0;
  let lastWidth = app.screen.width;
  let lastHeight = app.screen.height;
  gameScene.onResize(lastWidth, lastHeight);

  app.ticker.maxFPS = MAX_FPS;
  app.ticker.add((ticker) => {
    // Update input modules.
    Keyboard.update();

    if (lastWidth !== app.screen.width || lastHeight !== app.screen.height) {
      lastWidth = app.screen.width;
      lastHeight = app.screen.height;

      gameScene.onResize(lastWidth, lastHeight);
    }

    const deltaTime = Math.min(ticker.deltaMS / 1000, MAX_DELTA_TIME);
    totalTime += deltaTime;

    // See: https://docs.unity3d.com/uploads/Main/time-flowchart.png
    while (totalTime - fixedTime >= FIXED_UPDATE_RATE) {
      fixedTime += FIXED_UPDATE_RATE;
      gameScene.onFixedUpdate(FIXED_UPDATE_RATE);
    }

    gameScene.onUpdate(deltaTime);
  });
});
