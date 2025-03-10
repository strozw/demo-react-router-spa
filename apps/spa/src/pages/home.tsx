import { Hero } from "@/shared/ui/hero";
import type { ComponentProps } from "react";
import { href, useNavigate } from "react-router";

export function HomePage({
  title,
  desc,
}: Pick<ComponentProps<typeof Hero>, "title" | "desc">) {
  const navigate = useNavigate();

  return (
    <Hero
      {...{
        title,
        desc,
        startText: "蔵書管理へ",
        onClickStart: () => navigate(href("/books")),
      }}
    />
  );
}
