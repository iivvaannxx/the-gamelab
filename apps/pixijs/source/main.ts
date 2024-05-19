import { Application } from "pixi.js";

import "@app/styles/main.css";
import { Resources } from "@app/assets/resources";
import { Keyboard } from "@app/utils/input/keyboard";
import { Time } from "@app/utils/time";

/**
 * Initializes the Flappy Bird game.
 * @returns The instance of the application.
 */
async function init() {
  const app = new Application();
  const container = document.querySelector("#app") as HTMLDivElement;

  // Initialize the Pixi.js application.
  await app.init({
    resizeTo: container,
    antialias: true,

    // We use a transparent background. The gradient is set from CSS.
    backgroundAlpha: 0,
  });

  container.appendChild(app.canvas);

  // Initialize all the game modules.
  await Resources.init();
  Keyboard.init();

  return app;
}

// Entrypoint of the game.
init().then(async (app) => {
  const { gameScene } = await import("./scenes/game");
  gameScene.init(app);

  app.ticker.add((ticker) => {
    // Update the necessary game modules (order is important).
    Time.update(ticker);
    Keyboard.update();

    // And finally update the scene.
    gameScene.update();

    if (Keyboard.escapeKey.wasPressedThisFrame) {
      console.log("Escape key was pressed!");
    }
  });
});
