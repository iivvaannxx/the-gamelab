export type ResponsiveElement<T> = {
  /** The actual underlying element. */
  element: T;

  /** Event fired when the game screen resizes, repositions the element on the screen. */
  onGameResize: (newWidth: number, newHeight: number) => void;
};
