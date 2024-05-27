import type { KeyEvent, KeyboardKeyCode, KeyboardKeyControl } from "./types";

let initialized = false;
let controls = {} as Record<KeyboardKeyCode, KeyboardKeyControl>;
let events: KeyEvent[] = [];
let resetControls: KeyboardKeyControl[] = [];

/** Resets the keyboard state (called automatically if explicitly reinitializing). */
function reset() {
  // Remove the event listeners.
  window.removeEventListener("keydown", onKeyDown);
  window.removeEventListener("keyup", onKeyUp);

  initialized = false;
  events = [];
  resetControls = [];
  controls = {} as Record<KeyboardKeyCode, KeyboardKeyControl>;
}

/**
 * Handles the keydown event and updates the state of the corresponding key control.
 * @param event - The KeyboardEvent object representing the keydown event.
 */
function onKeyDown({ code }: KeyboardEvent) {
  if (hasControl(code) && !controls[code].isPressed) {
    events.push({
      type: "keydown",
      control: controls[code],
    });
  }
}

/**
 * Handles the keyup event and updates the state of the corresponding key control.
 * @param event - The KeyboardEvent object representing the keydown event.
 */
function onKeyUp({ code }: KeyboardEvent) {
  if (hasControl(code) && controls[code].isPressed) {
    events.push({
      type: "keyup",
      control: controls[code],
    });
  }
}

/**
 * Checks if the provided code is a valid control key.
 *
 * @param code - The code to check.
 * @returns A boolean indicating whether the code is a valid control key.
 */
function hasControl(code: string): code is keyof typeof controls {
  return code in controls;
}

/**
 * Processes a key event and updates the control state accordingly.
 * @param event The key event to process.
 */
function processEvent({ type, control }: KeyEvent) {
  switch (type) {
    case "keydown": {
      control.isPressed = true;
      control.wasPressedThisFrame = true;
      control.wasReleasedThisFrame = false;

      resetControls.push(control);
      break;
    }

    case "keyup": {
      control.isPressed = false;
      control.wasPressedThisFrame = false;
      control.wasReleasedThisFrame = true;

      resetControls.push(control);
      break;
    }
  }
}

/**
 * Initializes the keyboard input module.
 * @param reinitialize  Whether to reinitialize the keyboard input system if it's already initialized. Defaults to `false`.
 */
export function init(reinitialize = false) {
  if (reinitialize) {
    reset();
  }

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  initialized = true;
}

/** Whether the keyboard input module is initialized. */
export function isInitialized() {
  return initialized;
}

/** Updates the keyboard state. Must be called once per frame. */
export function update() {
  // Controls on manager list were pressed/released in the previous frame.
  // We reset their ephemeral state after that specific frame.
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
}

/**
 * Creates a keyboard control from the specified key code.
 *
 * @param code The key code for the control.
 * @returns The created keyboard control.
 */

/* @__NO_SIDE_EFFECTS__ */ export function registerKey<
  T extends KeyboardKeyCode,
>(code: T) {
  /* 
    About the above "NO_SIDE_EFFECTS" annotation:

    Although the function is not technically 100% pure (it has the 
    side effect of modifying the manager state), we can safely annotate 
    it because the side effect does not break the code in any way.

    Bundlers can't assume this and thus all the usages of the function 
    would not be treeshaken. The annontation allows all the non-used keys 
    of the `keys.ts` file to be removed from the final bundle.
  */

  if (code in controls) {
    return controls[code] as KeyboardKeyControl<T>;
  }

  const control: KeyboardKeyControl<T> = {
    value: code,
    isPressed: false,
    wasPressedThisFrame: false,
    wasReleasedThisFrame: false,
  };

  controls[code] = control;
  return control;
}
