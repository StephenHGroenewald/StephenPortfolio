import { InterestsCarousel } from "./interests-carousel";

export function Interests() {
  return (
    <section
      id="interests"
      className="relative overflow-hidden px-6 pt-10 pb-36 md:px-10 md:pt-14 md:pb-48"
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
        <h2
          className="text-4xl uppercase tracking-wide md:text-6xl"
          style={{ fontFamily: "var(--font-display)", color: "var(--brand-ink)" }}
        >
          Interests
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm md:text-base" style={{ color: "var(--brand-ink-dim)" }}>
          Off the clock: spending time with my kids, canoeing, video editing,
          building vibe engineering apps, community building and mentorship,
          generating music videos, and reading.
        </p>
      </div>

      <InterestsCarousel />
    </section>
  );
}
