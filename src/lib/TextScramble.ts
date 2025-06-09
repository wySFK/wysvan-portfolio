const CHARS = '!<>-_\\/[]{}—=+*^?#________';

interface QueueItem {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
}

export class TextScramble {
  private el: HTMLElement;
  private chars: string;
  private queue: QueueItem[];
  private frame: number;
  private frameRequest: number | null;
  private resolve: ((value: void) => void) | null;
  private originalText: string;

  constructor(el: HTMLElement) {
    this.el = el;
    this.chars = CHARS;
    this.originalText = this.el.innerText;
    this.queue = [];
    this.frame = 0;
    this.frameRequest = null;
    this.resolve = null;
  }

  setText(newText: string): Promise<void> {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => (this.resolve = resolve));
    this.queue = [];
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20);
      this.queue.push({ from, to, start, end });
    }
    
    if (this.frameRequest) {
      cancelAnimationFrame(this.frameRequest);
    }
    this.frame = 0;
    this.update();
    return promise;
  }

  private update(): void {
    let output = '';
    let complete = 0;
    
    const n = this.queue.length;
    for (let i = 0; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += char;
      } else {
        output += from;
      }
    }
    
    this.el.innerText = output;
    
    if (complete === this.queue.length) {
      if (this.resolve) this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(() => this.update());
    }
    this.frame++;
  }

  private randomChar(): string {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }

  scramble(): void {
    this.setText(this.originalText);
  }

  reset(): void {
    if (this.frameRequest) {
      cancelAnimationFrame(this.frameRequest);
    }
    this.el.innerText = this.originalText;
  }
} 