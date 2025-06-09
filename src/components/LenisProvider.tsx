import { ReactNode, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.2,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchInertiaMultiplier: 2,
    })

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Override default GSAP ScrollTrigger scroll function
    gsap.ticker.lagSmoothing(0)

    // Initialize ScrollTrigger
    const initScrollTrigger = () => {
      // Example scroll animations
      gsap.to('.hero-name-shimmer', {
        scrollTrigger: {
          trigger: '.hero-name-shimmer',
          start: 'top center',
          end: 'bottom center',
          scrub: true,
          markers: true, // Remove this in production
        },
        opacity: 0,
        y: 100,
        duration: 1,
      })

      // Add more scroll trigger animations here
    }

    initScrollTrigger()

    // Handle smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        const targetId = anchor.getAttribute('href') || ''
        const target = document.querySelector(targetId) as HTMLElement
        if (target) {
          lenis.scrollTo(target, {
            offset: 0,
            duration: 2,
          })
        }
      })
    })

    return () => {
      // Cleanup
      gsap.ticker.remove(lenis.raf)
      lenis.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return <>{children}</>
} 