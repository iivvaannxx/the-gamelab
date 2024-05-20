/**
 * The key codes present in most common keyboards.
 * Note that country-specific keys or non-standard keys are not included.
 *
 * Examples of these may be: WakeUp, Power, Eject, etc.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values
 */
export type KeyboardKeyCode =
  | "AltLeft"
  | "AltRight"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "ArrowUp"
  | "Backquote"
  | "Backslash"
  | "Backspace"
  | "BracketLeft"
  | "BracketRight"
  | "CapsLock"
  | "Comma"
  | "ContextMenu"
  | "ControlLeft"
  | "ControlRight"
  | "Copy"
  | "Cut"
  | "Delete"
  | "Digit0"
  | "Digit1"
  | "Digit2"
  | "Digit3"
  | "Digit4"
  | "Digit5"
  | "Digit6"
  | "Digit7"
  | "Digit8"
  | "Digit9"
  | "End"
  | "Enter"
  | "Equal"
  | "Escape"
  | "F1"
  | "F2"
  | "F3"
  | "F4"
  | "F5"
  | "F6"
  | "F7"
  | "F8"
  | "F9"
  | "F10"
  | "F11"
  | "F12"
  | "F13"
  | "F14"
  | "F15"
  | "F16"
  | "F17"
  | "F18"
  | "F19"
  | "F20"
  | "F21"
  | "F22"
  | "F23"
  | "F24"
  | "Find"
  | "Fn"
  | "Help"
  | "Home"
  | "Insert"
  | "KeyA"
  | "KeyB"
  | "KeyC"
  | "KeyD"
  | "KeyE"
  | "KeyF"
  | "KeyG"
  | "KeyH"
  | "KeyI"
  | "KeyJ"
  | "KeyK"
  | "KeyL"
  | "KeyM"
  | "KeyN"
  | "KeyO"
  | "KeyP"
  | "KeyQ"
  | "KeyR"
  | "KeyS"
  | "KeyT"
  | "KeyU"
  | "KeyV"
  | "KeyW"
  | "KeyX"
  | "KeyY"
  | "KeyZ"
  | "MetaLeft"
  | "MetaRight"
  | "Minus"
  | "NumLock"
  | "Numpad0"
  | "Numpad1"
  | "Numpad2"
  | "Numpad3"
  | "Numpad4"
  | "Numpad5"
  | "Numpad6"
  | "Numpad7"
  | "Numpad8"
  | "Numpad9"
  | "NumpadAdd"
  | "NumpadDecimal"
  | "NumpadDivide"
  | "NumpadEnter"
  | "NumpadEqual"
  | "NumpadMultiply"
  | "NumpadSubtract"
  | "OSLeft"
  | "OSRight"
  | "PageDown"
  | "PageUp"
  | "Paste"
  | "Pause"
  | "Period"
  | "PrintScreen"
  | "Props"
  | "Quote"
  | "ScrollLock"
  | "Semicolon"
  | "ShiftLeft"
  | "ShiftRight"
  | "Slash"
  | "Space"
  | "Tab"
  | "Undo"
  | "VolumeDown"
  | "VolumeMute"
  | "VolumeUp";

/** Defines the API of a KeyControl, which stores the state of a specific key. */
export type KeyboardKeyControl<T extends KeyboardKeyCode = KeyboardKeyCode> = {
  /** The code associated to the control. */
  value: T;

  /** Whether the key is currently pressed. */
  isPressed: boolean;

  /** Whether the key was pressed this frame. */
  wasPressedThisFrame: boolean;

  /** Whether the key was released this frame. */
  wasReleasedThisFrame: boolean;
};

/** Defines a simple keyboard event (press or release) which contains the associated control. */
export type KeyEvent<T extends KeyboardKeyCode = KeyboardKeyCode> = {
  /** The type of event that occurred. */
  type: "keydown" | "keyup";

  /** The control associated to the event. */
  control: KeyboardKeyControl<T>;
};
