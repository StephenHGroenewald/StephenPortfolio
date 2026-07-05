const ROLES = [
  {
    title: "Senior Partner Solution Engineer",
    company: "Adyen, Netherlands",
    period: "2022 / PRESENT",
    body: "Senior partnership manager for Premier and Premier+ accounts, driving GTM objectives through technical excellence and roadmap alignment. Lead consultant for internal AI adoption and architect of the scalable low-touch partner framework.",
  },
  {
    title: "Channel Enablement Manager",
    company: "Innervation PAN African Payment Solutions",
    period: "2019 / 2022",
    body: "Migrated 50+ key partners to a group-wide platform, replacing legacy ISO 8583 with modern XML and JSON protocols. Conceptualized a world-first C# integration paradigm that cut retail implementation timelines by 86%.",
  },
  {
    title: "IT Manager",
    company: "AfricaWeather, South Africa",
    period: "2016 / 2018",
    body: "Directed the IT division turnaround, migrating 20+ servers to AWS and stabilizing weather platforms serving aviation, mining, and insurance clients, working alongside the Australian shareholders on the board.",
  },
  {
    title: "Partner Manager & Technology Adviser",
    company: "Innervation",
    period: "2010 / 2016",
    body: "Established the channel division and defined partnership models for 50+ strategic channels, enabling loyalty and gift-card retail solutions for SME and corporate retailers.",
  },
];

const EARLIER = [
  "Business Unit Manager / DVT / 2005-2009",
  "Co-Founder / Solutional, Radical CRM / 2001-2005",
  "Lead Developer / Rufus Leonard, London / 1999-2001",
  "Senior Analyst Developer / Ixchange / 1997-1999",
  "Developer / Syntactica / 1993-1997",
];

export function CareerHistory() {
  return (
    <section id="career" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32" style={{ backgroundColor: "var(--brand-bg)" }}>
      <video
        className="ambient-video absolute inset-0 h-full w-full object-cover opacity-30"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/videos/career-loop-poster.jpg"
        aria-hidden="true"
      >
        <source src="/assets/videos/career-loop.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,9,6,0.92) 0%, rgba(11,9,6,0.55) 35%, rgba(11,9,6,0.55) 70%, rgba(11,9,6,0.95) 100%)",
        }}
      />

      <div className="relative">
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

        <div className="mt-14 border-t pt-8" style={{ borderColor: "var(--brand-hairline)" }}>
          <span
            className="mb-4 block text-[11px] tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-mono)", color: "var(--brand-accent)" }}
          >
            Earlier
          </span>
          <ul className="flex flex-col gap-2">
            {EARLIER.map((line) => (
              <li
                key={line}
                className="text-xs tracking-[0.08em] uppercase md:text-sm"
                style={{ fontFamily: "var(--font-mono)", color: "var(--brand-ink-dim)" }}
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
