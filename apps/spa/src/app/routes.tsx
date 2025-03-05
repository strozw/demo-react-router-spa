import { BookProvider } from "#/components/book-context"
import { BookRoutes } from "#/components/book-routes"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <BookProvider>
        <BookRoutes />
      </BookProvider>
    </main>
  )
}

