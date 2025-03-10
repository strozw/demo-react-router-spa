import { BooksPageLayout } from "@/widgets/books-page-layout";
import { Outlet } from "react-router";

export default function BooksRouteLayout() {
  return (
    <BooksPageLayout>
      <Outlet />
    </BooksPageLayout>
  );
}
