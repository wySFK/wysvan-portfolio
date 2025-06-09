import { CONFIG } from './config';
import gsap from 'gsap';

export class TextAnimator {
  private element: HTMLElement;
  private originalText: string;
  private isAnimating: boolean;
  private animationInterval: number | null;

  constructor(element: HTMLElement) {
    if (!element) {
      throw new Error("Invalid text element provided.");
    }
    this.element = element;
    this.originalText = element.innerText;
    this.isAnimating = false;
    this.animationInterval = null;
  }

  private getRandomChar(): string {
    return CONFIG.lettersAndSymbols[
      Math.floor(Math.random() * CONFIG.lettersAndSymbols.length)
    ];
  }

  private async animateChar(char: string, position: number): Promise<void> {
    if (char === ' ' || char === '[' || char === ']') return; // Skip spaces and brackets
    
    const iterations = 2;
    const chars = this.element.innerText.split('');
    
    for (let i = 0; i < iterations; i++) {
      if (!this.isAnimating) break;
      chars[position] = this.getRandomChar();
      this.element.innerText = chars.join('');
      await new Promise(resolve => setTimeout(resolve, 30));
    }

    if (this.isAnimating) {
      chars[position] = char;
      this.element.innerText = chars.join('');
    }
  }

  async animate(): Promise<void> {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const text = this.originalText;
    const promises = [];

    for (let i = 0; i < text.length; i++) {
      if (this.isAnimating) {
        const promise = this.animateChar(text[i], i);
        promises.push(promise);
        await new Promise(resolve => setTimeout(resolve, 20));
      }
    }
  }

  startContinuousAnimation(interval: number = 3000): void {
    this.animate();
    this.animationInterval = window.setInterval(() => {
      this.animate();
    }, interval);
  }

  stopContinuousAnimation(): void {
    if (this.animationInterval) {
      window.clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
    this.reset();
  }

  reset(): void {
    this.isAnimating = false;
    if (this.animationInterval) {
      window.clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
    this.element.innerText = this.originalText;
  }

  cleanup(): void {
    this.stopContinuousAnimation();
    this.reset();
  }
} 
} 