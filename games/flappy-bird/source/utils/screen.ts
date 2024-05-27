/** Factor used to scale all the game elements with the screen. */
const RESPONSIVENESS_FACTOR = 150;

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
