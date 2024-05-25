import { getGameAreaSize } from "@app/utils/screen";
import { type Application, EventEmitter } from "pixi.js";

type Events = {
  /** The update event is fired every frame. */
  update: (deltaTime: number) => void;

  /** The fixed update event is fired every fixed time step. */
  fixedUpdate: (fixedDeltaTime: number) => void;

  /** The resize event is fired when the game area is resized. */
  resize: (width: number, height: number) => void;
};

/** Helper abstraction of the general game loop. */
export class EventLoop extends EventEmitter<Events> {
  /** The rate at which we run our fixed-step loop (60 times a second). */
  private static readonly FIXED_UPDATE_RATE = 1 / 60;

  /** The maximum frames per second we allow. */
  private static readonly MAX_FPS = 144;

  /** The maximum delta time we allow. */
  private static readonly MAX_DELTA_TIME = 1 / 3;

  private fixedTime = 0;
  private totalTime = 0;
  private lastWidth = 0;
  private lastHeight = 0;

  /**
   * Constructs a new instance of an event loop.
   * @param app The instance of the Pixi.js application.
   */
  public constructor(app: Application) {
    super();

    app.ticker.maxFPS = EventLoop.MAX_FPS;
    app.ticker.add(({ deltaMS }) => {
      // We don't allow the delta time to be too high.
      // It can happen if tab is switched for example.
      const deltaTime = Math.min(deltaMS / 1000, EventLoop.MAX_DELTA_TIME);
      this.onTick(deltaTime);
    });
  }

  /**
   * Handles the tick event of the game loop.
   * @param delta - The time elapsed since the last tick, in milliseconds.
   */
  private onTick(delta: number) {
    this.totalTime += delta;
    const { width, height } = getGameAreaSize();

    // Check if the game area has been resized every frame.
    // Probably better than window event listeners.
    if (this.lastWidth !== width || this.lastHeight !== height) {
      this.lastWidth = width;
      this.lastHeight = height;

      this.emit("resize", width, height);
    }

    // See: https://docs.unity3d.com/uploads/Main/time-flowchart.png
    while (this.totalTime - this.fixedTime >= EventLoop.FIXED_UPDATE_RATE) {
      this.fixedTime += EventLoop.FIXED_UPDATE_RATE;
      this.emit("fixedUpdate", EventLoop.FIXED_UPDATE_RATE);
    }

    this.emit("update", delta);
  }
}
