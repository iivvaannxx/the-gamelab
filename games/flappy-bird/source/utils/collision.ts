import type { Ellipse, Rectangle } from "pixi.js";

/**
 * Checks if a point is inside a rotated ellipse.
 *
 * @param px - The x-coordinate of the point.
 * @param py - The y-coordinate of the point.
 * @param cx - The x-coordinate of the center of the ellipse.
 * @param cy - The y-coordinate of the center of the ellipse.
 * @param rx - The radius of the ellipse along the x-axis.
 * @param ry - The radius of the ellipse along the y-axis.
 * @param angle - The rotation angle of the ellipse in degrees.
 *
 * @returns A boolean indicating whether the point is inside the rotated ellipse.
 */
function pointInRotatedEllipse(
  px: number,
  py: number,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  angle: number,
) {
  const radians = -angle * (Math.PI / 180);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  // Translate point to ellipse's local coordinates
  const localX = cos * (px - cx) - sin * (py - cy) + cx;
  const localY = sin * (px - cx) + cos * (py - cy) + cy;

  // This is based on the ellipse equation:
  // For all points (x, y) in an ellipse centered at (cx, cy) with radii `rx` and `ry`:
  // ((x - cx) / rx)^2 + ((y - cy) / ry)^2 <= 1
  const dx = (localX - cx) / rx;
  const dy = (localY - cy) / ry;
  return dx * dx + dy * dy <= 1;
}

/**
 * Checks for collision between an ellipse and a rectangle with rotation.
 *
 * @param ellipse - An object defining the ellipse.
 * @param rect - An object defining the rectangle.
 * @param angle - The rotation angle in degrees.
 * @returns True if there is a collision, false otherwise.
 */
export function ellipseRectCollisionWithRotation(
  ellipse: Ellipse,
  rect: Rectangle,
  angle: number,
) {
  // Calculate the closest point of the rectangle to the ellipse center.
  const { x, y, halfWidth, halfHeight } = ellipse;
  const closestX = Math.max(rect.x, Math.min(rect.x + rect.width, x));
  const closestY = Math.max(rect.y, Math.min(rect.y + rect.height, y));

  if (
    pointInRotatedEllipse(
      closestX,
      closestY,
      x,
      y,
      halfWidth,
      halfHeight,
      angle,
    )
  ) {
    return true;
  }

  return false;
}
