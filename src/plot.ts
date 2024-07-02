export class PlotWindow {
  private dataCache: Map<number, any>;
  private windowSize: number = 10;

  // TODO: read from stream later
  public curT: number = 50;

  constructor() {
    this.dataCache = new Map();
    setInterval(() => this.update(), 1000);
  }

  private async update() {
    // const oldTimestamp = this.curT;
    const minT = this.curT - this.windowSize;
    const maxT = this.curT + this.windowSize;

    Array.from(this.dataCache.keys()).forEach((timestamp) => {
      if (timestamp < minT || timestamp > maxT) {
        console.log(`Removing data for timestamp ${timestamp}`);
        this.dataCache.delete(timestamp);
      }
    });

    for (let i = minT; i <= maxT; i++) {
      if (this.dataCache.has(i)) continue;

      // 10% chance that data is not available
      if (Math.floor(Math.random() * 10) == 0) {
        console.log(`Not available data for timestamp ${i}`);
        continue;
      }

      console.log(`Adding data for timestamp ${i}`);
      this.dataCache.set(i, 1);
    }
  }
}
