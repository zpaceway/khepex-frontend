export const delay = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, timeout);
  });
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
