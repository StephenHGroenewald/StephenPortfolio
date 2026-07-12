const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/stephengroenewald/",
    path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/stephengroenewald/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/PlurySteveG",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/SAStephenG",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
];

export function Contact() {
  return (
    <footer
      id="contact"
      className="relative flex flex-col items-center justify-center px-6 py-20 text-center md:px-10 md:py-28"
      style={{ backgroundColor: "var(--brand-bg-raised)" }}
    >
      <style>{`
        @keyframes footerFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        .social-float { animation: footerFloat 3.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .social-float { animation: none; }
        }
      `}</style>

      <h2
        className="text-5xl uppercase tracking-wide md:text-8xl"
        style={{ fontFamily: "var(--font-display)", color: "var(--brand-ink)" }}
      >
        Always
        <br />
        building.
      </h2>
      <p className="mt-5 max-w-sm text-sm md:text-base" style={{ color: "var(--brand-ink-dim)" }}>
        A space for my personal projects and creative experiments.
      </p>

      <p
        className="mt-12 text-[11px] tracking-[0.3em] uppercase"
        style={{ fontFamily: "var(--font-mono)", color: "var(--brand-ink-dim)" }}
      >
        Find me on social
      </p>

      <div className="mt-6 flex items-center gap-5 md:gap-7">
        {SOCIALS.map((social, i) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            title={social.label}
            aria-label={social.label}
            className="social-float group flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:border-[var(--brand-accent)]"
            style={{
              borderColor: "var(--brand-hairline)",
              color: "var(--brand-ink)",
              animationDelay: `${i * 0.25}s`,
            }}
          >
            <svg
              className="h-6 w-6 fill-current transition-colors duration-300 group-hover:text-[var(--brand-accent)]"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={social.path} />
            </svg>
          </a>
        ))}
      </div>

      <div
        className="mt-24 w-full max-w-4xl border-t pt-6 text-center text-[11px] tracking-[0.15em] uppercase"
        style={{
          borderColor: "var(--brand-hairline)",
          fontFamily: "var(--font-mono)",
          color: "var(--brand-ink-dim)",
        }}
      >
        <span>© 2026 Stephen Groenewald • v1.0.7</span>
      </div>
    </footer>
  );
}
