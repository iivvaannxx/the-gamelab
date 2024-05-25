import { Application } from "pixi.js";

/** Factor used to scale all the game elements with the screen. */
const RESPONSIVENESS_FACTOR = 150;

/**
 * Retrieves the size of the game area.
 * @returns An object containing the width and height of the game area.
 */
export function getGameAreaSize() {
  const { width, height } = Application.instance.screen;
  return { width, height };
}

/**
 * Calculates the scale used to fit the game elements to the screen.
 *
 * @param newWidth - The new width of the screen.
 * @param newHeight - The new height of the screen.
 * @returns The responsive scale.
 */
export function getResponsiveScale(newWidth: number, newHeight: number) {
  // The responsiveness factor is arbitrary, chosen to make the game look good.
  return Math.min(newWidth, newHeight) / RESPONSIVENESS_FACTOR;
}
