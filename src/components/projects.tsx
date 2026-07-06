import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    name: "Project Name One",
    body: "Add a one-line description: what it does and who it is for.",
    rotate: "-rotate-1",
    span: "md:col-span-2",
    icon: "monitor",
  },
  {
    name: "Project Name Two",
    body: "Add a one-line description and the stack you built it with.",
    rotate: "rotate-1",
    span: "",
    icon: "database",
  },
  {
    name: "Project Name Three",
    body: "Add a one-line description of the problem this solves.",
    rotate: "rotate-1",
    span: "",
    icon: "globe",
  },
  {
    name: "Project Name Four",
    body: "Add a one-line description and a link to where it lives.",
    rotate: "-rotate-1",
    span: "md:col-span-2",
    icon: "layers",
  },
];

function renderProjectIcon(icon: string) {
  const commonClass = "absolute -top-3.5 right-8 h-7 w-7 rotate-12 opacity-90 text-[var(--brand-accent)]";
  
  switch (icon) {
    case "monitor":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={commonClass}>
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" fill="var(--brand-bg)" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    case "database":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={commonClass}>
          <ellipse cx="12" cy="5" rx="9" ry="3" fill="var(--brand-bg)" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" fill="var(--brand-bg)" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case "globe":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={commonClass}>
          <circle cx="12" cy="12" r="10" fill="var(--brand-bg)" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case "layers":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={commonClass}>
          <polygon points="12 2 2 7 12 12 22 7 12 2" fill="var(--brand-bg)" />
          <polyline points="2 17 12 22 22 17" fill="var(--brand-bg)" />
          <polyline points="2 12 12 17 22 12" fill="var(--brand-bg)" />
        </svg>
      );
    default:
      return null;
  }
}

function ViewProjectLink() {
  return (
    <a href="#" className="group relative mt-6 inline-flex items-center gap-2 py-1">
      <span
        aria-hidden="true"
        className="absolute -top-1.5 -left-1.5 h-3 w-3 border-t transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ borderColor: "var(--brand-accent)", borderLeftWidth: 1.5, borderTopWidth: 1.5 }}
      />
      <span
        aria-hidden="true"
        className="absolute -top-1.5 -right-1.5 h-3 w-3 border-t transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ borderColor: "var(--brand-accent)", borderRightWidth: 1.5, borderTopWidth: 1.5 }}
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-1.5 -left-1.5 h-3 w-3 border-b transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5"
        style={{ borderColor: "var(--brand-accent)", borderLeftWidth: 1.5, borderBottomWidth: 1.5 }}
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-1.5 -right-1.5 h-3 w-3 border-b transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
        style={{ borderColor: "var(--brand-accent)", borderRightWidth: 1.5, borderBottomWidth: 1.5 }}
      />
      <span
        className="px-1 text-xs tracking-[0.15em] uppercase"
        style={{ fontFamily: "var(--font-mono)", color: "var(--brand-accent)" }}
      >
        View project
      </span>
    </a>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".project-card");
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
      id="projects"
      ref={containerRef}
      className="relative px-6 py-16 md:px-10 md:py-24"
      style={{ backgroundColor: "var(--brand-bg-raised)" }}
    >
      <h2
        className="mb-12 text-4xl uppercase tracking-wide md:mb-16 md:text-6xl"
        style={{ fontFamily: "var(--font-display)", color: "var(--brand-ink)" }}
      >
        Current Projects
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <div
            key={project.name}
            className={`project-card relative rounded-sm border p-8 ${project.rotate} ${project.span}`}
            style={{
              backgroundColor: "var(--brand-bg)",
              borderColor: "var(--brand-hairline)",
            }}
          >
            {renderProjectIcon(project.icon)}
            <h3
              className="text-2xl uppercase tracking-wide md:text-3xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--brand-ink)" }}
            >
              {project.name}
            </h3>
            <p className="mt-2 max-w-md text-sm" style={{ color: "var(--brand-ink-dim)" }}>
              {project.body}
            </p>
            <ViewProjectLink />
          </div>
        ))}
      </div>
    </section>
  );
}
