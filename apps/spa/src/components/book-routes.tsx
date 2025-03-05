import { useState } from "react"
import { BookList } from "@/components/book-list"
import { BookForm } from "@/components/book-form"
import { BookDetail } from "@/components/book-detail"

type Route = "list" | "add" | "edit" | "detail"

export function BookRoutes() {
  const [route, setRoute] = useState<Route>("list")
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null)

  const navigateTo = (route: Route, bookId?: string) => {
    setRoute(route)
    if (bookId) {
      setSelectedBookId(bookId)
    }
  }

  return (
    <div>
      {route === "list" && (
        <BookList
          onAddBook={() => navigateTo("add")}
          onEditBook={(id) => navigateTo("edit", id)}
          onViewBook={(id) => navigateTo("detail", id)}
        />
      )}
      {route === "add" && <BookForm onCancel={() => navigateTo("list")} />}
      {route === "edit" && selectedBookId && <BookForm bookId={selectedBookId} onCancel={() => navigateTo("list")} />}
      {route === "detail" && selectedBookId && (
        <BookDetail
          bookId={selectedBookId}
          onBack={() => navigateTo("list")}
          onEdit={() => navigateTo("edit", selectedBookId)}
        />
      )}
    </div>
  )
}

