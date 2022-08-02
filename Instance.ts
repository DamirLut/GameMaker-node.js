import { Sprite } from './Graphics/Sprite';
export class Instance {
  x = 0;
  y = 0;
  xscale = 1;
  yscale = 1;

  sprite!: Sprite;
  animationSpeed = 0.1;

  constructor(props: Partial<Instance>) {
    Object.assign(this, props);
  }

  update() {
    if (this.sprite) {
      this.sprite.imageIndex =
        (this.sprite.imageIndex + this.animationSpeed) % this.sprite.images.length;
    }
  }
  render(ctx: CanvasRenderingContext2D) {
    this.sprite?.drawExt(ctx, this.x, this.y, this.xscale, this.yscale, this.sprite.angle);
  }
}
