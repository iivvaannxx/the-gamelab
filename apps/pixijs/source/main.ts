import { Application, Assets } from "pixi.js";
import "./styles/main.css";

import { manifest } from "./assets/manifest";
import { Resources } from "./assets/resources";

const app = new Application();

/** Initializes the application and starts loading the used assets. */
async function init() {
  const container = document.getElementById("app")!;
  await app.init({
    backgroundAlpha: 0,
    resizeTo: container,
    antialias: true,
  });

  container?.appendChild(app.canvas);

  await Assets.init({ manifest });
  Assets.backgroundLoadBundle("game");

  await Resources.init();
}

/** Entrypoint for the game. The game is started here. */
async function start() {
  const { gameScene } = await import("./scenes/game");
  gameScene.init(app);
}

// Start entrypoint.
init().then(start);
