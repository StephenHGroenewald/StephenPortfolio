const INTERESTS = [
  { label: "Photography", icon: "camera" },
  { label: "Hiking", icon: "hiking" },
  { label: "Coffee", icon: "coffee" },
  { label: "Music", icon: "music" },
  { label: "Film & TV", icon: "play" },
  { label: "Side projects", icon: "terminal" },
];

export function Interests() {
  return (
    <section
      id="interests"
      className="relative px-6 py-24 md:px-10 md:py-32"
      style={{ backgroundColor: "var(--brand-bg)" }}
    >
      <div className="mx-auto max-w-3xl text-center">
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
          Swap these for the things you actually spend your weekends on.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {INTERESTS.map((interest, i) => (
          <div
            key={interest.label}
            className={`flex flex-col items-center justify-center gap-3 rounded-sm border px-4 py-10 text-center ${
              i % 2 === 1 ? "md:translate-y-6" : ""
            }`}
            style={{ backgroundColor: "var(--brand-bg-raised)", borderColor: "var(--brand-hairline)" }}
          >
            <img src={`/assets/icons/${interest.icon}.png`} alt="" aria-hidden="true" className="h-9 w-9" />
            <span
              className="text-xs tracking-[0.1em] uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "var(--brand-ink)" }}
            >
              {interest.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
