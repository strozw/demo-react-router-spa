import { BookDetail } from "@/components/book-detail";
import { href, useNavigate, useParams } from "react-router";

export default function BooksDetailPage() {
  const navigate = useNavigate();

  const params = useParams();

  const id = params.id ?? ""

  return <BookDetail
    bookId={id}
    onBack={() => navigate(href("/books"))}
    onEdit={() => navigate(href("/books/:id/edit", { id }))}
  />
}
