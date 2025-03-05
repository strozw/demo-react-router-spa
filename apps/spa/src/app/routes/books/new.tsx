import { BookForm } from "@/components/book-form";
import { href, useNavigate } from "react-router";

export default function BooksNewPage() {
  const navigate = useNavigate();

  return <BookForm onCancel={() => navigate(href("/books"))} />
}
