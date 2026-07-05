import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "../components/portfolio-page";

export const Route = createFileRoute("/v1")({
  component: () => <PortfolioPage variant="v1" />,
});
