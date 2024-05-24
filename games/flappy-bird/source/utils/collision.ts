import type { Circle, Rectangle } from "pixi.js";

/**
 * Checks if a rectangle intersects a circle.
 *
 * @param rectangle The rectangle to check.
 * @param circle The circle to check.
 * @returns True if the rectangle intersects the circle, false otherwise.
 */
export function rectangleIntersectsCircle(
  rectangle: Rectangle,
  circle: Circle,
) {
  if (
    circle.x + circle.radius < rectangle.x ||
    circle.x - circle.radius > rectangle.x + rectangle.width ||
    circle.y + circle.radius < rectangle.y ||
    circle.y - circle.radius > rectangle.y + rectangle.height
  ) {
    // There's no intersection possible, early return.
    return false;
  }

  // The x position of the closest rectangle corner to the circle's center.
  const closestX = Math.max(
    rectangle.x,
    Math.min(circle.x, rectangle.x + rectangle.width),
  );

  // The y position of the closest rectangle corner to the circle's center.
  const closestY = Math.max(
    rectangle.y,
    Math.min(circle.y, rectangle.y + rectangle.height),
  );

  const distanceX = circle.x - closestX;
  const distanceY = circle.y - closestY;
  const distanceSquared = distanceX ** 2 + distanceY ** 2;

  // We compare the squared distance as it's faster to compute than the square root.
  return distanceSquared < circle.radius ** 2;
}
