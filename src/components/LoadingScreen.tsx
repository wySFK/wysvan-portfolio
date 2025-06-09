import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import '../styles/LoadingScreen.css';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [counter, setCounter] = useState(1);
  const loadingRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Counter animation
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    // Fade out animation after counter reaches 100
    const timer = setTimeout(() => {
      if (loadingRef.current && counterRef.current && footerRef.current) {
        // First fade out the footer
        gsap.to(footerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut"
        });

        // Then animate the counter to match the main content position
        gsap.to(counterRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          delay: 0.3
        });

        // Finally fade out the background
        gsap.to(loadingRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          delay: 0.6,
          onComplete: () => {
            if (onLoadingComplete) {
              onLoadingComplete();
            }
          }
        });
      }
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <div ref={loadingRef} className="loading-screen">
      <div ref={counterRef} className="counter">
        {counter.toString().padStart(3, '0')}
      </div>
      <div ref={footerRef} className="loading-footer">
        <div className="footer-text">
          <p>WYSLIE VAN BASA</p>
          <p>INTERACTIVE DEVELOPER_PORTFOLIO</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 