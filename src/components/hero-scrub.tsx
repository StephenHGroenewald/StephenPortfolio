import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 100;

export type HeroVariant = "v1" | "v2";

export function HeroScrub({ variant = "v2" }: { variant?: HeroVariant }) {
  const framePath = (i: number) =>
    `/frames/hero-${variant}/frame_${String(i + 1).padStart(3, "0")}.jpg?v=2`;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chromeRef = useRef<HTMLDivElement | null>(null);
  const frameTagRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    let currentIndex = 0;

    function resizeCanvas() {
      if (!canvas || !container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      drawFrame(currentIndex);
    }

    function drawFrame(index: number) {
      if (!ctx || !canvas) return;
      // Fall back to the nearest already-loaded frame while others stream in.
      let useIndex = index;
      if (!images[useIndex]) {
        let offset = 1;
        while (offset < FRAME_COUNT) {
          if (images[index - offset]) {
            useIndex = index - offset;
            break;
          }
          if (images[index + offset]) {
            useIndex = index + offset;
            break;
          }
          offset += 1;
        }
      }
      const img = images[useIndex];
      if (!img) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      } else {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      }
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    function loadFrame(i: number, onDone?: () => void) {
      if (images[i]) {
        onDone?.();
        return;
      }
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        images[i] = img;
        if (i === currentIndex) drawFrame(currentIndex);
        onDone?.();
      };
      img.onerror = () => {
        onDone?.();
      };
      img.src = framePath(i);
    }

    // First frame loads and paints immediately (screenshot-safe initial state).
    loadFrame(0, () => resizeCanvas());

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      // Static fallback: the composed final frame, no pin, no scrub.
      currentIndex = FRAME_COUNT - 1;
      loadFrame(currentIndex, () => resizeCanvas());
      if (frameTagRef.current) {
        frameTagRef.current.textContent = `FRAME ${FRAME_COUNT}/${FRAME_COUNT}`;
      }
      return () => resizeObserver.disconnect();
    }

    // Stream the rest of the sequence in the background sequentially with concurrency
    const concurrency = 4;
    let nextToLoad = 1;
    function loadNext() {
      if (nextToLoad >= FRAME_COUNT) return;
      const current = nextToLoad;
      nextToLoad += 1;
      loadFrame(current, loadNext);
    }
    for (let i = 0; i < concurrency; i += 1) {
      loadNext();
    }

    const isMobile = window.innerWidth < 768;
    const scrollDistance = isMobile ? window.innerHeight * 1.1 : window.innerHeight * 1.9;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${scrollDistance}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      onUpdate: (self) => {
        currentIndex = Math.round(self.progress * (FRAME_COUNT - 1));
        drawFrame(currentIndex);
        if (frameTagRef.current) {
          frameTagRef.current.textContent = `FRAME ${String(currentIndex + 1).padStart(3, "0")}/${FRAME_COUNT}`;
        }
      },
    });

    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(
      chromeRef.current?.querySelectorAll("[data-reveal]") ?? [],
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.08 },
    );

    const nextSection = container.nextElementSibling || document.getElementById("career");

    const textAnim = gsap.to(chromeRef.current, {
      x: "100vw",
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: nextSection || container,
        start: nextSection ? "top bottom" : () => `top+=${scrollDistance} top`,
        end: nextSection
          ? "top center"
          : () => `top+=${scrollDistance + window.innerHeight * 0.8} top`,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      st.kill();
      textAnim.kill();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative min-h-dvh overflow-hidden"
      style={{ backgroundColor: "var(--brand-bg)" }}
    >
      {/* Static poster: correct on first paint (SSR + before JS), and
          identical to the canvas's first drawn frame, so there is no flash. */}
      <img
        src={`/assets/hero-poster-${variant}.jpg?v=2`}
        alt="Stephen Groenewald, portrait still"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,9,6,0.55) 0%, rgba(11,9,6,0.05) 30%, rgba(11,9,6,0.15) 70%, rgba(11,9,6,0.85) 100%)",
        }}
      />

      <div
        ref={chromeRef}
        className="relative z-10 flex h-full min-h-dvh flex-col justify-end px-6 pb-20 md:px-10 md:pb-28"
      >
        <span ref={frameTagRef} className="hidden" aria-hidden="true" />

        <h1
          data-reveal
          className="max-w-[90vw] text-[15vw] leading-[0.95] tracking-wide uppercase md:max-w-[70vw] md:text-[7rem]"
          style={{ fontFamily: "var(--font-display)", color: "var(--brand-ink)" }}
        >
          Stephen Groenewald
        </h1>
        <p
          data-reveal
          className="mt-4 max-w-md text-base md:text-lg"
          style={{ color: "var(--brand-ink-dim)" }}
        >
          GTM enablement and partnerships leader. 25+ years bridging technical architecture and
          commercial strategy, including 16 years in global FinTech.
        </p>
      </div>
    </section>
  );
}
