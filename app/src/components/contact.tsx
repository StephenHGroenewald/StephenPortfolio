export function Contact() {
  return (
    <footer
      id="contact"
      className="relative flex flex-col items-center justify-center px-6 py-32 text-center md:px-10 md:py-40"
      style={{ backgroundColor: "var(--brand-bg-raised)" }}
    >
      <h2
        className="text-5xl uppercase tracking-tight md:text-8xl"
        style={{ fontFamily: "var(--font-display)", color: "var(--brand-ink)" }}
      >
        Let&apos;s build
        <br />
        something.
      </h2>
      <p className="mt-5 max-w-sm text-sm md:text-base" style={{ color: "var(--brand-ink-dim)" }}>
        Open to new roles, collaborations, and interesting problems.
      </p>

      <a
        href="mailto:aiautomateme@gmail.com"
        className="mt-10 -rotate-2 rounded-full px-8 py-4 text-sm font-medium tracking-[0.1em] uppercase transition-transform duration-200 hover:rotate-0 hover:scale-105 active:scale-95 active:skew-x-1"
        style={{
          fontFamily: "var(--font-mono)",
          backgroundColor: "var(--brand-accent)",
          color: "var(--brand-bg)",
          boxShadow: "0 0 40px rgba(232,121,42,0.35)",
        }}
      >
        Get in touch
      </a>

      <div
        className="mt-24 flex w-full max-w-4xl flex-col items-center justify-between gap-3 border-t pt-6 text-[11px] tracking-[0.15em] uppercase md:flex-row"
        style={{ borderColor: "var(--brand-hairline)", fontFamily: "var(--font-mono)", color: "var(--brand-ink-dim)" }}
      >
        <span>© 2026 Stephen Groenewald</span>
        <span>Folio 04 / End</span>
      </div>
    </footer>
  );
}
