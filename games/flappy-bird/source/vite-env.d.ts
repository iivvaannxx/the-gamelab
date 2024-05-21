/// <reference types="vite/client" />

import type { Application } from "pixi.js";

declare module "pixi.js" {
  namespace Application {
    // For comfortable access to the application instance.
    // The correct alternative to this singleton could probably be to use DI.
    // But its too much for a simple game.

    // It's only used to access the dimensions of the screen
    // without the need to pass around the app instance.

    /** The current instance of the application. */
    const instance: Application;
  }
}
