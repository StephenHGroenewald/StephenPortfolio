export function Nav() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
      <a
        href="/"
        onClick={(e) => {
          if (typeof window !== "undefined" && window.location.pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "instant" });
            if (window.location.hash) {
              window.history.replaceState(
                null,
                "",
                window.location.pathname + window.location.search,
              );
              window.dispatchEvent(new HashChangeEvent("hashchange"));
            }
          }
        }}
        className="flex items-center gap-2"
      >
        <img src="/assets/monogram-mark.png" alt="" className="h-6 w-6" aria-hidden="true" />
        <span
          className="text-xs tracking-[0.2em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--brand-ink-dim)" }}
        >
          Creative Architect
        </span>
      </a>
      <a href="#contact" className="group relative text-xs tracking-[0.15em] uppercase">
        <span
          aria-hidden="true"
          className="mr-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ fontFamily: "var(--font-mono)", color: "var(--brand-accent)" }}
        >
          [
        </span>
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--brand-ink)" }}>
          Get in touch
        </span>
        <span
          aria-hidden="true"
          className="ml-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ fontFamily: "var(--font-mono)", color: "var(--brand-accent)" }}
        >
          ]
        </span>
      </a>
    </div>
  );
}
