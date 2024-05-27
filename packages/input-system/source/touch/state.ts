// TODO: End implementation. Right now it only detects how many touches are on the screen.

type TouchInputEvent = {
  type: "touchstart" | "touchend";
};

let initialized = false;
let events: TouchInputEvent[] = [];

/** The number of active touches. */
export let touchCount = 0;

/** Whether a touch was received in the last frame. */
export let receivedTouchLastFrame = false;

/** Resets the touch state (called automatically if explicitly reinitializing). */
function reset() {
  window.removeEventListener("touchstart", onTouchStart);
  window.removeEventListener("touchend", onTouchEnd);

  touchCount = 0;
  receivedTouchLastFrame = false;

  events = [];
  initialized = false;
}

/**
 * Handles the touchstart event and updates the current state.
 * @param event - The TouchEvent object representing the touchdown event.
 */
function onTouchStart(_event: TouchEvent) {
  events.push({
    type: "touchstart",
  });
}

/**
 * Handles the touchend event and updates the current state.
 * @param event - The TouchEvent object representing the touchup event.
 */
function onTouchEnd(_event: TouchEvent) {
  events.push({
    type: "touchend",
  });
}

function processEvent(event: TouchInputEvent) {
  switch (event.type) {
    case "touchstart": {
      touchCount++;
      receivedTouchLastFrame = true;
      break;
    }

    case "touchend": {
      touchCount--;
      break;
    }
  }
}

/**
 * Initializes the touch input module.
 * @param reinitialize  Whether to reinitialize the touch input system if it's already initialized. Defaults to `false`.
 */
export function init({ reinitialize = false } = {}) {
  if (reinitialize) {
    reset();
  }

  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchend", onTouchEnd, { passive: true });

  initialized = true;
}

/** Whether the touch input module is initialized. */
export function isInitialized() {
  return initialized;
}

/** Updates the touch state. Must be called once per frame. */
export function update() {
  receivedTouchLastFrame = false;

  while (events.length > 0) {
    const event = events.shift();

    if (event) {
      processEvent(event);
    }
  }
}
