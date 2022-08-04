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
      list.forEach((callback) => {
        const dispose = callback(...args);

        if (typeof dispose === 'function') {
          dispose();
          this.remove(event, callback);
        }
      });
    }
  }

  protected remove(event: string, callback: Function) {
    const list = this.events[event];
    if (list) {
      this.events[event] = list.filter((cb) => cb != callback);
    }
  }
}

export class StaticEventEmitter {
  private static events: Record<string, Function[]> = {};

  public static on(event: string, callback: Function) {
    if (StaticEventEmitter.events[event] === undefined) {
      StaticEventEmitter.events[event] = [];
    }
    StaticEventEmitter.events[event].push(callback);
  }

  protected static emit(event: string, ...args: any[]) {
    const list = StaticEventEmitter.events[event];
    if (list) {
      list.forEach((callback) => {
        const dispose = callback(...args);

        if (typeof dispose === 'function') {
          dispose();
          StaticEventEmitter.remove(event, callback);
        }
      });
    }
  }

  protected static remove(event: string, callback: Function) {
    const list = StaticEventEmitter.events[event];
    if (list) {
      StaticEventEmitter.events[event] = list.filter((cb) => cb != callback);
    }
  }
}
