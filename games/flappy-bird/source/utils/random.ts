/**
 * Generates a random floating-point number within the specified range.
 *
 * @param min - The minimum value of the range (inclusive).
 * @param max - The maximum value of the range (inclusive).
 * @returns A random floating-point number within the specified range.
 */
export function randomFloatRange(min: number, max: number) {
  return Math.random() * (max - min + Number.EPSILON) + min;
}
