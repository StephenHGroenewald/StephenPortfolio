import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export function useReducedMotion() {
  const ref = useRef(false);
  if (typeof window !== "undefined") {
    ref.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return ref.current;
}

/**
 * Lenis drives scroll physics; GSAP ScrollTrigger reads scroll position.
 * Bridging via gsap.ticker (autoRaf: false) keeps scrub-bound animations
 * (the hero frame scrub) from stuttering against Lenis's own rAF loop.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
      gsap.ticker.remove(ScrollTrigger.update);
    };
  }, []);

  return <>{children}</>;
}
