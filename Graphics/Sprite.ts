import { EventEmitter } from './../utils/EventEmitter';
export class Sprite extends EventEmitter {
  width = 0;
  height = 0;

  angle = 0;

  source = '';

  imageIndex = 0;
  images: Frame[] = [];

  frames: Record<string, Frame[]> = {};

  private image!: HTMLImageElement;

  public ready = false;

  constructor(config: Partial<Sprite>) {
    super();
    Object.assign(this, config);
    this.load();
  }
  load() {
    this.image = new Image();
    this.image.src = this.source;
    this.image.style.imageRendering = 'pixelated';
    this.image.onload = () => {
      if (this.width === 0 && this.height === 0) {
        this.width = this.image.width;
        this.height = this.image.height;
        if (this.images.length === 0) {
          this.images.push({
            x: 0,
            y: 0,
            width: this.width,
            height: this.height,
          });
        }
      }
      this.ready = true;
      this.emit('ready');
    };
  }

  draw(context: CanvasRenderingContext2D, x: number, y: number) {
    this.drawExt(context, x, y, 1, 1, this.angle);
  }

  drawExt(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    xscale: number,
    yscale: number,
    rotate: number,
  ) {
    if (!this.ready) return;
    const currentFrame = this.images[~~this.imageIndex];

    this.drawFrame(
      context,
      x,
      y,
      currentFrame.x,
      currentFrame.y,
      currentFrame.width,
      currentFrame.height,
      xscale,
      yscale,
      rotate,
    );
  }

  private drawFrame(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    frameX: number,
    frameY: number,
    frameWidth: number,
    frameHeight: number,
    frameXScale: number,
    frameYScale: number,
    rotate: number,
  ) {
    if (!this.ready) return;
    context.save();
    context.translate(~~x, ~~y);
    context.rotate((rotate * Math.PI) / 180);
    context.scale(frameXScale, frameYScale);
    context.drawImage(
      this.image,
      frameX,
      frameY,
      frameWidth,
      frameHeight,
      -frameWidth / 2,
      -frameHeight / 2,
      frameWidth,
      frameHeight,
    );
    context.restore();
  }
}

export type Frame = {
  x: number;
  y: number;
  width: number;
  height: number;
};
