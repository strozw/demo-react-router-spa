import { BookListPage } from "@/pages/book-list-page";
import { href, useNavigate } from "react-router";

export default function BooksListRoute() {
  const navigate = useNavigate();

  return (
    <BookListPage
      onAddBook={() => navigate(href("/books/new"))}
      onViewBook={(id) => navigate(href("/books/:id", { id }))}
      onEditBook={(id) => navigate(href("/books/:id/edit", { id }))}
    />
  );
}
