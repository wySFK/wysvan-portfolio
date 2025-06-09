import { TextAnimator } from './TextAnimator';

export class AnimationManager {
  constructor() {
    this.animators = new Map();
  }

  initializeAnimations() {
    // Initialize nav items
    document.querySelectorAll('nav button').forEach((item) => {
      const textSpan = item.firstChild;
      if (textSpan) {
        const animator = new TextAnimator(item);
        this.animators.set(item, [animator]);
        this.#addEventListeners(item);
      }
    });

    // Initialize scroll text
    const scrollText = document.querySelector('[data-scroll-text]');
    if (scrollText) {
      const textContent = scrollText.textContent;
      if (textContent) {
        scrollText.innerHTML = textContent; // Ensure text is directly in the element
        const animator = new TextAnimator(scrollText);
        this.animators.set(scrollText, [animator]);
        this.#addEventListeners(scrollText);
      }
    }

    // Initialize social links
    document.querySelectorAll('.hover-effect').forEach((item) => {
      const textContent = item.textContent;
      if (textContent) {
        item.innerHTML = textContent; // Ensure text is directly in the element
        const animator = new TextAnimator(item);
        this.animators.set(item, [animator]);
        this.#addEventListeners(item);
      }
    });
  }

  #addEventListeners(item) {
    const animators = this.animators.get(item);
    if (!animators) return;

    const handleMouseEnter = this.#debounce(() => {
      animators.forEach((animator) => animator.animate());
    }, 50);

    const handleMouseLeave = this.#debounce(() => {
      animators.forEach((animator) => animator.animateBack());
    }, 50);

    item.addEventListener("mouseenter", handleMouseEnter);
    item.addEventListener("mouseleave", handleMouseLeave);
  }

  #debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
} 