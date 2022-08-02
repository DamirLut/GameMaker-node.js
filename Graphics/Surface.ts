export class Surface {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public width = 0;
  public height = 0;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d')!;
    this.context.imageSmoothingEnabled = false;
    this.context.imageSmoothingQuality = 'high';
    this.resize();
  }

  resize(width = 0, height = 0) {
    this.width = width || this.width;
    this.height = height || this.height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  fill(color: string) {
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.width, this.height);
  }
}
