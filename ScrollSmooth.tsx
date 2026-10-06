import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ScrollSmooth = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like ease
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Integrate Lenis with GSAP Ticker
    const updatePhysics = (time: number) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(updatePhysics);

    // Disable lag smoothing for GSAP scroll triggering
    gsap.ticker.lagSmoothing(0);

    // Handle scroll position on mount/route change
    if (hash) {
      // If there is a hash target, scroll to it smoothly once the DOM settles
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          lenis.scrollTo(element, { offset: 0, duration: 1.2 });
        }
      }, 350); // Delay slightly to allow entry transition to complete
      
      return () => {
        clearTimeout(timer);
        lenis.destroy();
        gsap.ticker.remove(updatePhysics);
      };
    } else {
      // Force scroll to top immediately
      lenis.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updatePhysics);
    };
  }, [pathname, hash]);

  return null;
};
