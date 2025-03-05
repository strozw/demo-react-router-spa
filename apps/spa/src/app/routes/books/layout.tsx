import { Outlet } from "react-router";

export default function BooksLayout() {
  return (
    <div className="px-4 py-4">
      <Outlet />
    </div>
  )
}
