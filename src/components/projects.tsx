const PROJECTS = [
  {
    name: "Project Name One",
    body: "Add a one-line description: what it does and who it is for.",
    rotate: "-rotate-1",
    span: "md:col-span-2",
  },
  {
    name: "Project Name Two",
    body: "Add a one-line description and the stack you built it with.",
    rotate: "rotate-1",
    span: "",
  },
  {
    name: "Project Name Three",
    body: "Add a one-line description of the problem this solves.",
    rotate: "rotate-1",
    span: "",
  },
  {
    name: "Project Name Four",
    body: "Add a one-line description and a link to where it lives.",
    rotate: "-rotate-1",
    span: "md:col-span-2",
  },
];

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
  return (
    <section
      id="projects"
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
            className={`relative rounded-sm border p-8 ${project.rotate} ${project.span}`}
            style={{
              backgroundColor: "var(--brand-bg)",
              borderColor: "var(--brand-hairline)",
            }}
          >
            <img
              src="/assets/icons/paperclip.png"
              alt=""
              aria-hidden="true"
              className="absolute -top-3 right-8 h-7 w-7 rotate-12 opacity-90"
            />
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
