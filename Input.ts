import { Engine } from './Engine';
import { StaticEventEmitter } from './utils/EventEmitter';
export class Mouse extends StaticEventEmitter {
  static x = 0;
  static y = 0;

  constructor(engine: Engine) {
    super();
    const { camera } = engine;

    window.addEventListener('mousemove', (e) => {
      Mouse.x = Math.floor((e.clientX - camera.xoffset) / camera.aspect + camera.x);
      Mouse.y = Math.floor((e.clientY - camera.yoffset) / camera.aspect + camera.y);
    });

    window.addEventListener('mousedown', () => Mouse.emit('mousedown'));
    window.addEventListener('mouseup', () => Mouse.emit('mouseup'));
  }
}

export class Keyboard {
  static pressed: Record<string, number> = {};
  constructor(engine: Engine) {
    window.addEventListener('keydown', (event) => {
      Keyboard.pressed[event.code] = 1;
    });
    window.addEventListener('keyup', (event) => {
      Keyboard.pressed[event.code] = 0;
    });
  }
  static check(key: string) {
    return Keyboard.pressed[key] || 0;
  }
}
