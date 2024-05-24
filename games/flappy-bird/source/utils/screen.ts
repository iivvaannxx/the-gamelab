import { Application } from "pixi.js";

/**
 * Retrieves the size of the game area.
 * @returns An object containing the width and height of the game area.
 */
export function getGameAreaSize() {
  const { width, height } = Application.instance.screen;
  return { width, height };
}
