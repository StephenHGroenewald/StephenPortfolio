import { InterestsCarousel } from "./interests-carousel";

const INTERESTS = [
  "Golf",
  "Flying",
  "Prototyping",
  "YouTubing",
  "Reading & learning",
  "Adrenaline sports",
];

export function Interests() {
  return (
    <section
      id="interests"
      className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32"
      style={{ backgroundColor: "var(--brand-bg)" }}
    >
      <video
        className="ambient-video absolute inset-0 h-full w-full object-cover opacity-45"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/videos/interests-loop-poster.jpg"
        aria-hidden="true"
      >
        <source src="/assets/videos/interests-loop.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,9,6,0.94) 0%, rgba(11,9,6,0.45) 40%, rgba(11,9,6,0.45) 70%, rgba(11,9,6,0.95) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <span
          className="mb-4 block text-[11px] tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "var(--brand-accent)" }}
        >
          FOLIO 03
        </span>
        <h2
          className="text-4xl uppercase tracking-tight md:text-6xl"
          style={{ fontFamily: "var(--font-display)", color: "var(--brand-ink)" }}
        >
          Interests
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm md:text-base" style={{ color: "var(--brand-ink-dim)" }}>
          Off the clock: making things, chasing adrenaline, and giving time to
          AI champions, church groups, and mentorship.
        </p>
      </div>

      <InterestsCarousel />

      <div className="relative mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {INTERESTS.map((interest, i) => (
          <div
            key={interest}
            className={`flex items-center justify-center rounded-sm border px-4 py-10 text-center ${
              i % 2 === 1 ? "md:translate-y-6" : ""
            }`}
            style={{
              backgroundColor: "rgba(23,19,16,0.72)",
              borderColor: "var(--brand-hairline)",
              backdropFilter: "blur(2px)",
            }}
          >
            <span
              className="text-xs tracking-[0.1em] uppercase md:text-sm"
              style={{ fontFamily: "var(--font-mono)", color: "var(--brand-ink)" }}
            >
              {interest}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
