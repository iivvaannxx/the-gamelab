/**
 * The buttons that respond to mouse events.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
 */
export type MouseButton = "left" | "middle" | "right" | "back" | "forward";

/** Defines the API of a MouseButtonControl, which stores the state of a specific button. */
export type MouseButtonControl<T extends MouseButton = MouseButton> = {
  /** The associated button. */
  value: T;

  /** Whether the button is currently pressed. */
  isPressed: boolean;

  /** Whether the button was pressed this frame. */
  wasPressedThisFrame: boolean;

  /** Whether the button was released this frame. */
  wasReleasedThisFrame: boolean;
};

/** Defines a simple mouse event (press or release) which contains the associated control. */
export type MouseButtonEvent<T extends MouseButton = MouseButton> = {
  /** The type of event that occurred. */
  type: "mousedown" | "mouseup";

  /** The control associated to the event. */
  control: MouseButtonControl<T>;
};
