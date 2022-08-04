export class Random {
  static choose(...array: any[]) {
    return array[Math.floor(Math.random() * array.length)];
  }

  static id() {
    return (Math.random() * 0xfffffff).toString(36).replace('.', '');
  }
}
