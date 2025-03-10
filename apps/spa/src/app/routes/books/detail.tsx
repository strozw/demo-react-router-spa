import { BookDetailPage } from "@/pages/books";
import { href, useNavigate } from "react-router";
import type { Route } from "./+types/detail";

export default function BooksDetailRoute({ params }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <BookDetailPage
      bookId={params.id}
      onBack={() => navigate(href("/books"))}
      onEdit={() => navigate(href("/books/:id/edit", { id: params.id }))}
    />
  );
}
