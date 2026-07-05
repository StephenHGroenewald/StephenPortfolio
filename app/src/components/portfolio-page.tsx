import { SmoothScroll } from "./smooth-scroll";
import { Nav } from "./nav";
import { HeroScrub, type HeroVariant } from "./hero-scrub";
import { CareerHistory } from "./career-history";
import { Projects } from "./projects";
import { Interests } from "./interests";
import { Contact } from "./contact";

export function PortfolioPage({ variant }: { variant: HeroVariant }) {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <HeroScrub key={variant} variant={variant} />
        <CareerHistory />
        <Projects />
        <Interests />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
