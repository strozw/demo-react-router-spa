import { BookFormPage } from "@/pages/book-form-page";
import { href, useNavigate } from "react-router";
import type { Route } from "./+types/edit";

export default function BooksEditRoute({ params }: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <BookFormPage
      bookId={params.id}
      onCancel={() => navigate(href("/books"))}
    />
  );
}
