import { BookForm } from "@/components/book-form";
import { href, useNavigate, useParams } from "react-router";

export default function BooksEditPage() {
  const navigate = useNavigate();

  const params = useParams();

  const id = params.id ?? "";

  return <BookForm bookId={id} onCancel={() => navigate(href("/books"))} />;
}
