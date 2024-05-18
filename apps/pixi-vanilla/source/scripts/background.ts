import { type Application, type Texture, TilingSprite } from "pixi.js";

/**
 * Creates the background for the game.
 *
 * @param app The Pixi application instance.
 * @returns The background sprite, ready to use.
 */
export function createBackgroundSprite(
  app: Application,
  backgroundTexture: Texture
) {
  const tiled = new TilingSprite({
    texture: backgroundTexture,
    width: app.screen.width,
    height: app.screen.height
  });

  // The background may not be the same size as the screen.
  // It's tiled horizontally, but repeated vertically.
  // We scale it to fit the screen
  // app.screen.height = backgroundTexture.height * scaleFactor
  const scaleFactor = app.screen.height / backgroundTexture.height;

  tiled.position.set(0, 0);
  tiled.scale.set(scaleFactor, scaleFactor);

  return tiled;
}
