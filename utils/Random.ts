export class Random {
  static choose(...array: any[]) {
    return array[Math.floor(Math.random() * array.length)];
  }
}
