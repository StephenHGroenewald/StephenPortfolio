import { useEffect, useRef, useState } from "react";

// Each image in src/assets/carousel/ becomes a panel. The FILENAME (without
// extension) is the on-screen title, verbatim — so renaming "Fast Cars.jpg"
// renames the panel with no code change. Add/remove an image = add/remove a
// panel. Optional order below; anything not listed is appended alphabetically.
const IMAGES = import.meta.glob("../assets/carousel/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const SLIDES = Object.entries(IMAGES)
  .map(([path, url]) => {
    const file = path.split("/").pop() ?? "";
    const label = file
      .replace(/\.[^.]+$/, "")
      .replace(/\s+/g, " ")
      .trim();
    return { url, label, slug: slugify(label), file };
  })
  .sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true, sensitivity: "base" }));

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

// Render inline markdown links [text](url) as real anchors; leave the rest as text.
function renderInline(text: string) {
  const parts: React.ReactNode[] = [];
  const linkRe = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = linkRe.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a key={key++} href={m[2]} target="_blank" rel="noopener noreferrer">
        {m[1]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
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
          <h3 key={i}>{renderInline(block.replace(/^#+\s*/, ""))}</h3>
        ) : (
          <p key={i}>{renderInline(block)}</p>
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
    let writtenAngle = Number.NaN;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!draggingRef.current && !pausedRef.current && !reduced) {
        angleRef.current = (angleRef.current + dt * AUTO_DEG_PER_MS) % 360;
      }
      if (ringRef.current && angleRef.current !== writtenAngle) {
        writtenAngle = angleRef.current;
        ringRef.current.style.transform = `rotateY(${writtenAngle}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpanded(null);
      } else if (e.key === "ArrowLeft") {
        const idx = SLIDES.findIndex((s) => s.slug === expanded.slug);
        const prevIdx = (idx - 1 + SLIDES.length) % SLIDES.length;
        setExpanded(SLIDES[prevIdx]);
      } else if (e.key === "ArrowRight") {
        const idx = SLIDES.findIndex((s) => s.slug === expanded.slug);
        const nextIdx = (idx + 1) % SLIDES.length;
        setExpanded(SLIDES[nextIdx]);
      }
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
    // Only capture the pointer once this is clearly a drag, so a plain tap is
    // never captured and its click/hit-test stays reliable.
    if (
      dragDistanceRef.current > CLICK_DRAG_TOLERANCE_PX &&
      !e.currentTarget.hasPointerCapture(e.pointerId)
    ) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    angleRef.current = (angleRef.current + dx * DRAG_DEG_PER_PX) % 360;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const wasDragging = draggingRef.current;
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    // A tap (negligible movement): hit-test the panel under the pointer and
    // open it. Done here rather than via each figure's onClick so it fires
    // reliably regardless of pointer capture.
    if (wasDragging && dragDistanceRef.current <= CLICK_DRAG_TOLERANCE_PX) {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const panel = el?.closest<HTMLElement>(".carousel-panel");
      const idx = panel?.dataset.idx ? Number(panel.dataset.idx) : -1;
      if (idx >= 0 && idx < SLIDES.length) setExpanded(SLIDES[idx]);
    }
  };

  const expandedMd = expanded ? mdForSlug(expanded.slug) : null;
  const currentIndex = expanded ? SLIDES.findIndex((s) => s.slug === expanded.slug) : -1;

  const onPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex >= 0) {
      const prevIdx = (currentIndex - 1 + SLIDES.length) % SLIDES.length;
      setExpanded(SLIDES[prevIdx]);
    }
  };

  const onNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex >= 0) {
      const nextIdx = (currentIndex + 1) % SLIDES.length;
      setExpanded(SLIDES[nextIdx]);
    }
  };

  return (
    <>
      <div
        className="carousel-stage relative mx-auto mt-8 w-full max-w-5xl"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className="carousel-tilt">
          <div className="carousel-center-disc">
            <span>
              Click
              <br />
              image for
              <br />
              info
            </span>
          </div>
          <div ref={ringRef} className="carousel-ring">
            {SLIDES.map((slide, i) => (
              <figure
                key={slide.slug}
                className="carousel-panel"
                data-idx={i}
                style={{
                  transform: `rotateY(${i * STEP}deg) translateZ(var(--car-radius))`,
                }}
              >
                <div className="carousel-panel-media">
                  <img src={slide.url} alt={slide.label} loading="lazy" />
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
          <button
            type="button"
            className="carousel-lightbox-nav carousel-lightbox-nav--prev"
            onClick={onPrev}
            aria-label="Previous image"
          >
            &lt;&lt;
          </button>

          <div
            className="relative flex flex-col items-end"
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
            <div
              className={`carousel-lightbox-card ${expandedMd ? "carousel-lightbox-card--with-text" : ""}`}
            >
              <img src={expanded.url} alt={expanded.label} />
              <div className="carousel-lightbox-body">
                <span className="carousel-lightbox-label">{expanded.label}</span>
                {expandedMd && <MdText text={expandedMd} />}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="carousel-lightbox-nav carousel-lightbox-nav--next"
            onClick={onNext}
            aria-label="Next image"
          >
            &gt;&gt;
          </button>
        </div>
      )}
    </>
  );
}
