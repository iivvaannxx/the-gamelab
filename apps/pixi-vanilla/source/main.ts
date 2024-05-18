import { Application, Assets } from "pixi.js";
import "./styles/reset.css";

import { manifest } from "./assets/manifest";
import { loadSpritesheet } from "./assets/spritesheet";
import { createBackgroundSprite } from "./scripts/background";

const app = new Application();

/** Initializes the application and starts loading the used assets. */
async function setup() {
  await app.init({ resizeTo: window });
  document.body.appendChild(app.canvas);

  await Assets.init({ manifest });
  Assets.backgroundLoadBundle("game");
}

/** Entrypoint for the game. The game is started here. */
async function start() {
  const spritesheet = await loadSpritesheet();

  const background = createBackgroundSprite(
    app,
    spritesheet.textures.background
  );

  app.stage.addChild(background);
}

// Start entrypoint.
setup().then(start);
