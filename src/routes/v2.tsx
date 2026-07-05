import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "../components/portfolio-page";

export const Route = createFileRoute("/v2")({
  component: () => <PortfolioPage variant="v2" />,
});
