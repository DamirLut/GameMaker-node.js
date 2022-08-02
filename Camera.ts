import { Engine } from './Engine';
export class Camera {
  static current: Camera;
  x = 0;
  y = 0;
  width = window.innerWidth;
  height = window.innerHeight;

  aspect = 1;
  xoffset = 0;
  yoffset = 0;
  view_width = 0;
  view_height = 0;

  constructor(props: Partial<Camera>) {
    Camera.current = this;
    Object.assign(this, props);
    this.fitScreen();
    window.addEventListener('resize', () => this.fitScreen());
  }
  fitScreen() {
    const applicationSurface = Engine.current.applicationSurface;
    this.aspect = window.innerWidth / applicationSurface.width;

    this.view_width = applicationSurface.width * this.aspect;
    this.view_height = applicationSurface.height * this.aspect;

    this.yoffset = (window.innerHeight - this.view_height) * 0.5;

    applicationSurface.canvas.style.width = ~~this.view_width + 'px';
    applicationSurface.canvas.style.height = ~~this.view_height + 'px';

    applicationSurface.canvas.style.top = ~~this.yoffset + 'px';
    applicationSurface.canvas.style.left = ~~this.xoffset + 'px';
    applicationSurface.canvas.style.position = 'fixed';
  }
  set() {
    Engine.current.applicationSurface.context.save();
    Engine.current.applicationSurface.context.translate(-this.x, -this.y);
  }
  reset() {
    Engine.current.applicationSurface.context.restore();
  }
}
