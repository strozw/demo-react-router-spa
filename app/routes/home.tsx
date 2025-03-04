import Hero from "~/components/ui/hero";
import type { Route } from "./+types/home";

const title = "New React Router SPA";
const desc = "Welcome to React Router with TailwindCSS v4 SPA!";

export function meta({ }: Route.MetaArgs) {
  return [
    { title },
    { name: "description", content: desc },
  ];
}

export default function Home() {
  return <Hero {...({ title, desc })} />;
}
