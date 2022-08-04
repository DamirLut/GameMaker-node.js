import { Instance } from './Instance';

export class Layer extends Instance {
  childrens: Instance[] = [];
  constructor() {
    super({});
  }

  sortOrder() {
    this.childrens.sort((prev, next) => next.z - prev.z);
  }

  override update(): void {
    this.sortOrder();
    this.childrens.forEach((children) => children.update());
  }
  override render(context: CanvasRenderingContext2D): void {
    this.childrens.forEach((children) => children.render(context));
  }
}
