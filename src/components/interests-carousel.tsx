import { useEffect, useRef, useState } from "react";

const SLIDES = [
  { src: "sky-diving", label: "Sky Diving" },
  { src: "africa", label: "Africa" },
  { src: "pilot-plane", label: "Pilot Life" },
  { src: "iceland-2", label: "Iceland" },
  { src: "golf", label: "Golf" },
  { src: "adrenaline-1", label: "Adrenaline" },
  { src: "spain", label: "Spain" },
  { src: "army", label: "Army Days" },
  { src: "ski-2000", label: "Ski 2000" },
  { src: "ai-film-certificate", label: "AI Filmmaker" },
  { src: "iceland-3", label: "Glacier Days" },
  { src: "solo-flight", label: "Solo Flight" },
  { src: "travel-1", label: "On the Road" },
  { src: "adrenaline-2", label: "Full Send" },
  { src: "icelnad-1", label: "Iceland" },
  { src: "sky-diving-2", label: "Freefall" },
  { src: "africa-3", label: "Safari" },
  { src: "face-swap2", label: "AI Playground" },
];

const STEP = 360 / SLIDES.length;
const AUTO_DEG_PER_MS = 360 / 70000; // one revolution per 70s
const DRAG_DEG_PER_PX = 0.3;
const CLICK_DRAG_TOLERANCE_PX = 8;

// Optional long-form text per slide: drop a `<slug>.md` into src/content/interests/.
const MD_FILES = import.meta.glob("../content/interests/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function mdForSlug(slug: string): string | null {
  const entry = Object.entries(MD_FILES).find(([path]) => path.endsWith(`/${slug}.md`));
  return entry ? entry[1] : null;
}

function MdText({ text }: { text: string }) {
  const blocks = text
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);
  return (
    <div className="carousel-lightbox-text">
      {blocks.map((block, i) =>
        block.startsWith("#") ? (
          <h3 key={i}>{block.replace(/^#+\s*/, "")}</h3>
        ) : (
          <p key={i}>{block}</p>
        ),
      )}
    </div>
  );
}

type Slide = (typeof SLIDES)[number];

export function InterestsCarousel() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const angleRef = useRef(0);
  const draggingRef = useRef(false);
  const dragDistanceRef = useRef(0);
  const lastXRef = useRef(0);
  const pausedRef = useRef(false);
  const [expanded, setExpanded] = useState<Slide | null>(null);

  useEffect(() => {
    pausedRef.current = expanded !== null;
  }, [expanded]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!draggingRef.current && !pausedRef.current && !reduced) {
        angleRef.current = (angleRef.current + dt * AUTO_DEG_PER_MS) % 360;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    dragDistanceRef.current = 0;
    lastXRef.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    dragDistanceRef.current += Math.abs(dx);
    angleRef.current = (angleRef.current + dx * DRAG_DEG_PER_PX) % 360;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onPanelClick = (slide: Slide) => {
    if (dragDistanceRef.current > CLICK_DRAG_TOLERANCE_PX) return;
    setExpanded(slide);
  };

  const expandedMd = expanded ? mdForSlug(expanded.src) : null;

  return (
    <>
      <div
        className="carousel-stage relative mx-auto mt-16 w-full max-w-5xl"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="carousel-tilt">
          <div ref={ringRef} className="carousel-ring">
            {SLIDES.map((slide, i) => (
              <figure
                key={slide.src}
                className="carousel-panel"
                style={{
                  transform: `rotateY(${i * STEP}deg) translateZ(var(--car-radius))`,
                }}
                onClick={() => onPanelClick(slide)}
              >
                <div className="carousel-panel-media">
                  <img src={`/assets/carousel/${slide.src}.jpg`} alt={slide.label} loading="lazy" />
                </div>
                <span className="carousel-label carousel-label--front">{slide.label}</span>
                <span className="carousel-label carousel-label--back" aria-hidden="true">
                  {slide.label}
                </span>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {expanded && (
        <div
          className="carousel-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={expanded.label}
          onClick={() => setExpanded(null)}
        >
          <div
            className={`carousel-lightbox-card ${expandedMd ? "carousel-lightbox-card--with-text" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="carousel-lightbox-close"
              onClick={() => setExpanded(null)}
              aria-label="Close"
            >
              [ CLOSE ]
            </button>
            <img src={`/assets/carousel/${expanded.src}.jpg`} alt={expanded.label} />
            <div className="carousel-lightbox-body">
              <span className="carousel-lightbox-label">{expanded.label}</span>
              {expandedMd && <MdText text={expandedMd} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
