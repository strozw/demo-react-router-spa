import { BookFormPage } from "@/pages/book-form-page";
import { href, useNavigate } from "react-router";

export default function BooksNewRoute() {
  const navigate = useNavigate();

  return <BookFormPage onCancel={() => navigate(href("/books"))} />;
}
