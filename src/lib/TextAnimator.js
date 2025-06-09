import { gsap } from "gsap";
import SplitType from 'split-type';
import { CONFIG } from './config';

export class TextAnimator {
  #originalChars;
  #splitter;

  constructor(textElement) {
    if (!textElement || !(textElement instanceof HTMLElement)) {
      throw new Error("Invalid text element provided.");
    }
    this.textElement = textElement;
    this.#originalChars = [];
    this.#splitText();
  }

  #splitText() {
    // Store original text
    const originalText = this.textElement.textContent || '';
    
    // Create a new split instance
    this.#splitter = new SplitType(this.textElement, { 
      types: "chars",
      tagName: "span"
    });
    
    // Store original characters
    this.#originalChars = originalText.split('');
  }

  animate() {
    this.reset();
    if (!this.#splitter.chars) return;
    
    this.#splitter.chars.forEach((char, position) => {
      const initialChar = this.#originalChars[position];
      
      gsap.to(char, {
        duration: 0.1,
        repeat: 3,
        repeatDelay: 0.05,
        yoyo: true,
        onRepeat: () => {
          char.textContent = this.#getRandomChar();
        },
        onComplete: () => {
          char.textContent = initialChar;
        },
        delay: position * 0.03
      });
    });

    gsap.fromTo(
      this.textElement,
      { "--anim": 0 },
      { duration: 1, ease: "expo", "--anim": 1 }
    );
  }

  #getRandomChar() {
    return CONFIG.lettersAndSymbols[
      Math.floor(Math.random() * CONFIG.lettersAndSymbols.length)
    ];
  }

  animateBack() {
    if (!this.#splitter.chars) return;
    
    gsap.killTweensOf(this.#splitter.chars);
    this.#splitter.chars.forEach((char, index) => {
      char.textContent = this.#originalChars[index];
    });
    
    gsap.to(this.textElement, {
      duration: 0.6,
      ease: "power4",
      "--anim": 0
    });
  }

  reset() {
    if (!this.#splitter.chars) return;
    
    gsap.killTweensOf(this.#splitter.chars);
    this.#splitter.chars.forEach((char, index) => {
      char.textContent = this.#originalChars[index];
    });
    
    gsap.set(this.textElement, { "--anim": 0 });
  }
} 