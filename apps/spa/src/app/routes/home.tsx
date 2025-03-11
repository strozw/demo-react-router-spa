import { HomePage } from "@/pages/home";
import type { Route } from "./+types/home";

const title = "React Router SPA Demo";
const desc = "React Router SPA を利用した蔵書管理アプリのデモ";

export function meta() {
  return [{ title }, { name: "description", content: desc }];
}

export default function HomeRoute(props: Route.ComponentProps) {
  return (
    <HomePage
      {...{
        title,
        desc,
      }}
    />
  );
}
