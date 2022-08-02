import { EventEmitter } from './utils/EventEmitter';
import { Layer } from './Layer';
import { Surface } from './Graphics/Surface';
import { Camera } from './Camera';

export interface EngineConfig {
  headless: boolean;
  fps: number;
  gameSize: {
    width: number;
    height: number;
  };
}

export class Engine extends EventEmitter {
  applicationSurface!: Surface;
  root: Layer = new Layer();
  camera!: Camera;
  static current: Engine;

  constructor(public config: EngineConfig) {
    super();
    Engine.current = this;
    setInterval(() => {
      this.update();
    }, 1000 / config.fps);

    if (!config.headless) {
      this.applicationSurface = new Surface(config.gameSize.width, config.gameSize.height);
      this.camera = new Camera(config.gameSize);
      new Mouse();

      requestAnimationFrame(this.render.bind(this));
    }
  }

  update() {
    this.emit('update');

    this.root.update();
  }
  render() {
    this.applicationSurface.clear();
    this.emit('render', this.applicationSurface.context);
    this.camera.set();

    this.root.render(this.applicationSurface.context);
    this.camera.reset();
    requestAnimationFrame(this.render.bind(this));
  }
}

export class Mouse {
  static x = 0;
  static y = 0;

  constructor() {
    const { camera } = Engine.current;

    window.addEventListener('mousemove', (e) => {
      Mouse.x = Math.floor((e.clientX - camera.xoffset) / camera.aspect + camera.x);
      Mouse.y = Math.floor((e.clientY - camera.yoffset) / camera.aspect + camera.y);
    });
  }
}
