import type { Ticker } from "pixi.js";

// Contains the game time data.
const timeData = {
  deltaSeconds: 0,
  currentFrame: 0,
};

/** A helper class to easily access the game time. */
export abstract class Time {
  /**
   * Gets the delta time between the current frame and the last one (in seconds).
   * @returns The delta time in seconds.
   */
  public static get deltaSeconds() {
    return timeData.deltaSeconds;
  }

  /**
   * Returns the currently rendered frame.
   * @returns The current frame.
   */
  public static get currentFrame() {
    return timeData.currentFrame;
  }

  /**
   * Updates the time data based on the provided ticker.
   * @param ticker - The PIXI Ticker object (should be `Application.ticker`).
   */
  public static update(ticker: Ticker) {
    timeData.deltaSeconds = ticker.deltaMS / 1000;
    timeData.currentFrame += 1;
  }
}
