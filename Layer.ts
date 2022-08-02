import { Instance } from './Instance';

export class Layer extends Instance {
  childrens: Instance[] = [];
  constructor() {
    super({});
  }

  override update(): void {
    this.childrens.forEach((children) => children.update());
  }
  override render(context: CanvasRenderingContext2D): void {
    this.childrens.forEach((children) => children.render(context));
  }
}
