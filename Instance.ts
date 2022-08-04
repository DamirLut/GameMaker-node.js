import { Sprite } from './Graphics/Sprite';
import { EventEmitter } from './utils/EventEmitter';
export class Instance extends EventEmitter {
  x = 0;
  y = 0;
  z = 0;
  xscale = 1;
  yscale = 1;

  sprite!: Sprite;
  animationSpeed = 0.1;
  loopAnimation = true;

  constructor(props: Partial<Instance>) {
    super();
    Object.assign(this, props);
  }

  update() {
    if (this.sprite) {
      const length = this.sprite.images.length;

      this.sprite.imageIndex = this.sprite.imageIndex + this.animationSpeed;

      if (~~this.sprite.imageIndex === length - 1) {
        this.emit('animationEnd');
      }

      if (this.loopAnimation) {
        this.sprite.imageIndex = this.sprite.imageIndex % length;
      } else {
        this.sprite.imageIndex = Math.max(0, Math.min(this.sprite.imageIndex, length - 1));
      }
    }
  }
  render(ctx: CanvasRenderingContext2D) {
    this.drawSelf(ctx);
  }

  drawSelf(ctx: CanvasRenderingContext2D) {
    this.sprite?.drawExt(ctx, this.x, this.y, this.xscale, this.yscale, this.sprite.angle);
  }
}
