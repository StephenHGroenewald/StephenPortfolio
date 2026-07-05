const ROLES = [
  {
    title: "Senior Role Title",
    company: "Company Name",
    period: "2022 / PRESENT",
    body: "Describe your responsibilities in this role and the impact you made. Swap this for your real experience.",
  },
  {
    title: "Role Title",
    company: "Company Name",
    period: "2019 / 2022",
    body: "Describe what you built, shipped, or led in this role.",
  },
  {
    title: "Role Title",
    company: "Company Name",
    period: "2016 / 2019",
    body: "Add a sentence about the scope of this role and its outcomes.",
  },
];

export function CareerHistory() {
  return (
    <section id="career" className="relative px-6 py-24 md:px-10 md:py-32" style={{ backgroundColor: "var(--brand-bg)" }}>
      <span
        className="mb-12 block text-[11px] tracking-[0.2em] uppercase md:mb-16"
        style={{ fontFamily: "var(--font-mono)", color: "var(--brand-accent)" }}
      >
        FOLIO 02 / Career History
      </span>

      <div>
        {ROLES.map((role) => (
          <div
            key={role.title + role.period}
            className="grid grid-cols-1 gap-6 border-t py-10 md:grid-cols-[1fr_auto] md:items-start"
            style={{ borderColor: "var(--brand-hairline)" }}
          >
            <div>
              <div className="flex flex-wrap items-baseline gap-3">
                <h3
                  className="text-3xl uppercase tracking-tight md:text-5xl"
                  style={{ fontFamily: "var(--font-display)", color: "var(--brand-accent)" }}
                >
                  {role.title}
                </h3>
                <span
                  className="rounded px-2 py-1 text-xs"
                  style={{
                    fontFamily: "var(--font-mono)",
                    backgroundColor: "var(--brand-bg-raised)",
                    color: "var(--brand-ink)",
                  }}
                >
                  {role.period}
                </span>
              </div>
              <p className="mt-3 max-w-xl text-sm md:text-base" style={{ color: "var(--brand-ink-dim)" }}>
                {role.company}. {role.body}
              </p>
            </div>
            <img
              src="/assets/icons/briefcase.png"
              alt=""
              aria-hidden="true"
              className="hidden h-16 w-16 opacity-80 md:block"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
