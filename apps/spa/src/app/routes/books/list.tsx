import { BookList } from "@/components/book-list";
import { href, useNavigate } from "react-router";

export default function BooksListPage() {
  const navigate = useNavigate();

  return <BookList
    onAddBook={() => navigate(href("/books/new"))}
    onViewBook={(id) => navigate(href("/books/:id", { id }))}
    onEditBook={(id) => navigate(href("/books/:id/edit", { id }))}
  />;
}
