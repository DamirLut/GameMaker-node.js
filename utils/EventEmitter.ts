export class EventEmitter {
  private events: Record<string, Function[]> = {};

  public on(event: string, callback: Function) {
    if (this.events[event] === undefined) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  protected emit(event: string, ...args: any[]) {
    const list = this.events[event];
    if (list) {
      list.forEach((callback) => callback(...args));
    }
  }
}
