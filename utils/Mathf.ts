export class Mathf {
  static lerp(value: number, target: number, delta: number) {
    return value + (target - value) * delta;
  }

  static angle = (x1: number, y1: number, x2: number, y2: number) => Math.atan2(y2 - y1, x2 - x1);
  static distance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
