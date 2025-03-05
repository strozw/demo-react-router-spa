import { Hero } from "@/components/ui/hero";
import type { Route } from "./+types/home";
import { href, useNavigate } from "react-router";

const title = "React Router SPA Demo";
const desc = "React Router SPA を利用した蔵書管理アプリのデモ";

export function meta({ }: Route.MetaArgs) {
  return [
    { title },
    { name: "description", content: desc },
  ];
}

export default function Home() {
  const navigate = useNavigate();

  return <Hero {...({ title, desc, startText: "蔵書管理へ", onClickStart: () => navigate(href("/books")) })} />;
}
