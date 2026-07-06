import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  {
    title: "Senior Partner Solution Engineer",
    company: "Adyen, Netherlands",
    period: "2022 / PRESENT",
    years: "4 years",
    body: "Senior partnership manager for Premier and Premier+ accounts, driving GTM objectives through technical excellence and roadmap alignment. Lead consultant for internal AI adoption and architect of streamlined partner integration and verification systems.",
  },
  {
    title: "Channel Enablement Manager",
    company: "Innervation PAN African Payment Solutions",
    period: "2019 / 2022",
    years: "3 years",
    body: "Migrated 50+ key partners to a group-wide platform, replacing legacy ISO 8583 with modern XML and JSON protocols. Conceptualized and prototyped a pioneering C# integration paradigm, projected to cut retail implementation timelines by 86%.",
  },
  {
    title: "IT Manager",
    company: "AfricaWeather, South Africa",
    period: "2016 / 2018",
    years: "2 years",
    body: "Directed the IT division turnaround, migrating 20+ servers to AWS. Stabilized critical forecasting and real-time storm/lightning alert platforms serving mining operations, schools, golf courses, and insurance clients while aligning with Australian board shareholders.",
  },
  {
    title: "Partner Manager & Technology Adviser",
    company: "Innervation",
    period: "2010 / 2016",
    years: "6 years",
    body: "Established the partner channel division and defined partnership models for 50+ strategic channels, enabling loyalty and gift-card retail solutions for SME and corporate retailers.",
  },
];

const EARLIER = [
  { date: "2005-2009", years: "4 years", role: "Business Unit Manager / DVT" },
  { date: "2001-2005", years: "4 years", role: "Co-Founder / Solutional, Radical No Code Framework (CRM, HR, Logistics, etc)" },
  { date: "1999-2001", years: "2 years", role: "Lead Developer / Rufus Leonard, London" },
  { date: "1997-1999", years: "2 years", role: "Senior Analyst Developer / Ixchange" },
  { date: "1993-1997", years: "4 years", role: "Developer / Syntactica" },
];

export function CareerHistory() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".role-card");
    if (!cards.length) return;

    const triggers: any[] = [];

    cards.forEach((card) => {
      const anim = gsap.fromTo(
        card,
        { x: 120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        }
      );
      if (anim.scrollTrigger) {
        triggers.push(anim.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="career"
      ref={containerRef}
      className="relative overflow-hidden px-6 py-16 md:px-10 md:py-24"
      style={{ backgroundColor: "var(--brand-bg)" }}
    >
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
          Career History
        </span>

        <div>
          {ROLES.map((role) => (
            <div
              key={role.title + role.period}
              className="role-card grid grid-cols-1 gap-6 border-t py-10 md:grid-cols-[1fr_auto] md:items-start"
              style={{ borderColor: "var(--brand-hairline)" }}
            >
              <div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3
                    className="text-3xl uppercase tracking-wide md:text-5xl"
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
                    {role.period} <span className="opacity-60">[{role.years}]</span>
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
            {EARLIER.map((item) => (
              <li
                key={item.role}
                className="text-xs tracking-[0.08em] uppercase md:text-sm"
                style={{ fontFamily: "var(--font-mono)", color: "var(--brand-ink-dim)" }}
              >
                <span style={{ color: "var(--brand-accent)" }}>{item.date}</span>{" "}
                <span style={{ opacity: 0.6 }}>[{item.years}]</span>{" "}
                <span>/ {item.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
