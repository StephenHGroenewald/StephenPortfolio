import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "../components/smooth-scroll";
import { Nav } from "../components/nav";
import { HeroScrub } from "../components/hero-scrub";
import { CareerHistory } from "../components/career-history";
import { Projects } from "../components/projects";
import { Interests } from "../components/interests";
import { Contact } from "../components/contact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <HeroScrub />
        <CareerHistory />
        <Projects />
        <Interests />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
