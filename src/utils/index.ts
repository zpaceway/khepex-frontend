export const shuffleItems = <T>(array: T[]) => {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
};

export class Debouncer {
  private delay: number;
  private timeout: number | null;

  constructor(delay: number) {
    this.delay = delay;
    this.timeout = null;
  }

  debounce(callback: () => void) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(callback, this.delay);
  }
}
