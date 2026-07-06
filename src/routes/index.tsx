import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "../components/portfolio-page";
import type { HeroVariant } from "../components/hero-scrub";

export const Route = createFileRoute("/")({
  component: Index,
});

function hashVariant(): HeroVariant | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace("#", "");
  return hash === "v1" || hash === "v2" ? hash : null;
}

function Index() {
  const [variant, setVariant] = useState<HeroVariant>("v1");

  useEffect(() => {
    const apply = () => {
      const fromHash = hashVariant();
      if (fromHash) {
        setVariant(fromHash);
      } else {
        window.location.replace("#v1");
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  return <PortfolioPage variant={variant} />;
}
