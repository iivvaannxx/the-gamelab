import type {
  MouseButton,
  MouseButtonControl,
  MouseButtonEvent,
} from "./types";

// The buttons that respond to mouse events.
// The order is IMPORTANT, each button is in the position of its corresponding MouseEvent.button value.
const buttons = ["left", "middle", "right", "back", "forward"] as const;

let initialized = false;
let controls = {} as Record<MouseButton, MouseButtonControl>;
let events: MouseButtonEvent[] = [];
let resetControls: MouseButtonControl[] = [];
const prevPosition = { x: 0, y: 0 };

/** The current position of the mouse. */
export const position = { x: 0, y: 0 };

/** How much the mouse has scrolled since the last frame. */
export const scroll = { x: 0, y: 0 };

/** How much the mouse has moved since the last frame. */
export const delta = { x: 0, y: 0 };

/** Resets the mouse state (called automatically if explicitly reinitializing). */
function reset() {
  window.removeEventListener("mousedown", onMouseDown);
  window.removeEventListener("mouseup", onMouseUp);
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("wheel", onWheel);

  initialized = false;
  events = [];
  resetControls = [];
  controls = {} as Record<MouseButton, MouseButtonControl>;

  prevPosition.x = prevPosition.y = 0;
  position.x = position.y = 0;
  scroll.x = scroll.y = 0;
  delta.x = delta.y = 0;
}

/**
 * Checks if the specified button is a valid button control.
 *
 * @param button - The button to check.
 * @returns A boolean indicating whether the button is a valid button control.
 */
function hasButtonControl(button: string): button is keyof typeof controls {
  return button in controls;
}

/**
 * Handles the mousedown event and updates the state of the corresponding mouse button control.
 * @param event - The MouseEvent object representing the mousedown event.
 */
function onMouseDown(event: MouseEvent) {
  event.preventDefault();

  const { button } = event;
  const mouseButton = buttons[button];

  if (hasButtonControl(mouseButton) && !controls[mouseButton].isPressed) {
    events.push({
      type: "mousedown",
      control: controls[mouseButton],
    });
  }
}

/**
 * Handles the mouseup event and updates the state of the corresponding mouse button control.
 * @param event - The MouseEvent object representing the mouseup event.
 */
function onMouseUp(event: MouseEvent) {
  event.preventDefault();

  const { button } = event;
  const mouseButton = buttons[button];

  if (hasButtonControl(mouseButton) && controls[mouseButton].isPressed) {
    events.push({
      type: "mouseup",
      control: controls[mouseButton],
    });
  }
}

/**
 * Handles the mousemove event and updates the position of the mouse.
 * @param event - The MouseEvent object representing the mousemove event.
 */
function onMouseMove(event: MouseEvent) {
  // The position on the window.
  const { clientX, clientY } = event;
  position.x = clientX;
  position.y = clientY;
}

/**
 * Handles the wheel event and updates the scroll amount.
 * @param event - The WheelEvent object representing the wheel event.
 */
function onWheel(event: WheelEvent) {
  // The scroll amount.
  const { deltaX, deltaY } = event;
  scroll.x = deltaX;
  scroll.y = deltaY;
}

/**
 * Processes a mouse event and updates the control state accordingly.
 * @param event The mouse event to process.
 */
function processEvent({ type, control }: MouseButtonEvent) {
  switch (type) {
    case "mousedown": {
      control.isPressed = true;
      control.wasPressedThisFrame = true;
      control.wasReleasedThisFrame = false;

      resetControls.push(control);
      break;
    }

    case "mouseup": {
      control.isPressed = false;
      control.wasPressedThisFrame = false;
      control.wasReleasedThisFrame = true;

      resetControls.push(control);
      break;
    }
  }
}

/**
 * Initializes the mouse input module.
 * @param reinitialize  Whether to reinitialize the mouse input system if it's already initialized. Defaults to `false`.
 */
export function init({ reinitialize = false } = {}) {
  if (reinitialize) {
    reset();
  }

  window.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mouseup", onMouseUp);
  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("wheel", onWheel, { passive: true });

  initialized = true;
}

/** Whether the mouse input module is initialized. */
export function isInitialized() {
  return initialized;
}

/** Updates the mouse state. Must be called once per frame. */
export function update() {
  // Update the global state of the mouse.
  delta.x = position.x - prevPosition.x;
  delta.y = position.y - prevPosition.y;
  scroll.x = 0;
  scroll.y = 0;

  while (resetControls.length > 0) {
    const control = resetControls.pop();

    if (control) {
      control.wasPressedThisFrame = false;
      control.wasReleasedThisFrame = false;
    }
  }

  while (events.length > 0) {
    const event = events.shift();

    if (event) {
      processEvent(event);
    }
  }

  prevPosition.x = position.x;
  prevPosition.y = position.y;
}

/**
 * Creates a mouse control from the specified mouse button.
 *
 * @param button The mouse button for the control.
 * @returns The created mouse button control.
 */

/* @__NO_SIDE_EFFECTS__ */ export function registerButton<
  T extends MouseButton,
>(button: T) {
  /* 
    About the above "NO_SIDE_EFFECTS" annotation:

    Read the same notice at: /source/keyboard/state.ts
    The reasons are the same.
  */

  if (button in controls) {
    return controls[button] as MouseButtonControl<T>;
  }

  const control: MouseButtonControl<T> = {
    value: button,
    isPressed: false,
    wasPressedThisFrame: false,
    wasReleasedThisFrame: false,
  };

  controls[button] = control;
  return control;
}
