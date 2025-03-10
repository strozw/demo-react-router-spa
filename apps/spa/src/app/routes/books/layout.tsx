import { BooksPageLayout } from "@/pages/books";
import { Outlet } from "react-router";

export default function BooksRouteLayout() {
  return (
    <BooksPageLayout>
      <Outlet />
    </BooksPageLayout>
  );
}
