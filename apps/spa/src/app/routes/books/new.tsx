import { BookFormPage } from "@/pages/books";
import { href, useNavigate } from "react-router";

export default function BooksNewRoute() {
  const navigate = useNavigate();

  return <BookFormPage onCancel={() => navigate(href("/books"))} />;
}
