import camelCase from "just-camel-case";
import type { CamelCase } from "type-fest";

/**
 * All the keyboard keys we want to listen to.
 * Extend this array with the keys you want to listen to.
 *
 * @see https://www.toptal.com/developers/keycode To find the `event.code` of a key.
 */
const KEYBOARD_KEYS = ["Space", "Escape", "ControlLeft"] as const;

/** A union of all the keys in the keyboard we want to listen */
type KeyboardKey = (typeof KEYBOARD_KEYS)[number];

/** The accessor for each key in the state. */
type KeyboardKeyAccessor = `${CamelCase<KeyboardKey>}Key`;

/** The API exposed for every key we want to listen. */
type KeyControl = {
  value: KeyboardKey;

  isPressed: boolean;
  wasPressedThisFrame: boolean;
  wasReleasedThisFrame: boolean;
};

/** Defines the record which stores the current state of the keyboard. */
type KeyboardState = Record<KeyboardKeyAccessor, KeyControl>;

/** Represents a keyboard event with custom data. */
type KeyEvent = {
  type: "keydown" | "keyup";
  control: KeyControl;
};

/**
 * Checks if the given key is a valid keyboard key.
 *
 * @param key - The key to check.
 * @returns True if the key is a valid keyboard key we want to listen, false otherwise.
 */
function isKeyboardKey(key: string): key is KeyboardKey {
  return KEYBOARD_KEYS.includes(key as KeyboardKey);
}

/**
 * Returns the key accessor for the specified keyboard key.
 *
 * @param key - The keyboard key.
 * @returns The key accessor name.
 */
function getKeyAccessor(key: KeyboardKey) {
  return `${camelCase(key)}Key` as KeyboardKeyAccessor;
}

/**
 * Creates a key control pair.
 *
 * @param key - The keyboard key.
 * @returns A tuple containing the keyboard key accessor and the key control object.
 */
function createKeyControlPair(key: KeyboardKey) {
  return [
    getKeyAccessor(key),
    {
      value: key,

      isPressed: false,
      wasPressedThisFrame: false,
      wasReleasedThisFrame: false,
    },
  ];
}

// Initialize the state from the keys we want to listen.
const KEYBOARD_STATE = Object.fromEntries(
  KEYBOARD_KEYS.map(createKeyControlPair),
) as KeyboardState;

/** Coordinates the received keyboard events to track the state of each key we want to listen. */
class KeyboardInternal {
  private static _events: KeyEvent[] = [];

  /** Initializes the keyboard input module. */
  public static init() {
    window.addEventListener("keydown", KeyboardInternal.onKeyDown);
    window.addEventListener("keyup", KeyboardInternal.onKeyUp);
  }

  /** Updates the Keyboard input module. */
  public static update() {
    for (const key in KEYBOARD_STATE) {
      // Reset the ephemeral state of the keys.
      const keyControl = KEYBOARD_STATE[key as KeyboardKeyAccessor];
      keyControl.wasPressedThisFrame = false;
      keyControl.wasReleasedThisFrame = false;
    }

    // Process all the pending events.
    while (KeyboardInternal._events.length > 0) {
      const event = KeyboardInternal._events.shift();

      if (event) {
        KeyboardInternal.processEvent(event);
      }
    }
  }

  /**
   * Processes the key event and updates the state of the corresponding key control.
   * @param event - The key event to process.
   */
  private static processEvent({ type, control }: KeyEvent) {
    // Update the control state.
    if (type === "keydown") {
      control.isPressed = true;
      control.wasPressedThisFrame = true;
      control.wasReleasedThisFrame = false;
    } else {
      control.isPressed = false;
      control.wasPressedThisFrame = false;
      control.wasReleasedThisFrame = true;
    }
  }

  /**
   * Handles the keydown event and updates the state of the corresponding key control.
   * @param event - The KeyboardEvent object representing the keydown event.
   */
  private static onKeyDown(event: KeyboardEvent) {
    if (!isKeyboardKey(event.code)) {
      return;
    }

    const key = getKeyAccessor(event.code);
    const control = KEYBOARD_STATE[key];

    if (control.isPressed) {
      return;
    }

    KeyboardInternal._events.push({
      type: "keydown",
      control,
    });
  }

  /**
   * Handles the keyup event and updates the state of the corresponding key control.
   * @param event - The KeyboardEvent object representing the keydown event.
   */
  private static onKeyUp(event: KeyboardEvent) {
    if (!isKeyboardKey(event.code)) {
      return;
    }

    const key = getKeyAccessor(event.code);
    const control = KEYBOARD_STATE[key];

    if (!control.isPressed) {
      return;
    }

    KeyboardInternal._events.push({
      type: "keyup",
      control,
    });
  }
}

// We want to expose the state of the keyboard, so we merge the internal API with the state.
export const Keyboard = Object.assign(KeyboardInternal, KEYBOARD_STATE);
