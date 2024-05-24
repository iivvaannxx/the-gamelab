import { Resources } from "@app/assets/resources";
import { TilingSprite } from "pixi.js";

export class Ground extends TilingSprite {
  private speed: number;

  constructor(speed: number) {
    super(Resources.spritesheet.textures.ground);

    this.anchor.y = 1;
    this.speed = speed;
  }

  public onUpdate(delta: number) {
    this.tilePosition.x -= this.speed * delta;
  }

  public onResize(newCanvasWidth: number, newCanvasHeight: number) {
    this.y = newCanvasHeight;

    this.scale.set(Math.min(newCanvasWidth, newCanvasHeight) / 150);
  }
}
