"use client"

import { useBooks } from "@/components/book-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit } from "lucide-react"

interface BookDetailProps {
  bookId: string
  onBack: () => void
  onEdit: () => void
}

export function BookDetail({ bookId, onBack, onEdit }: BookDetailProps) {
  const { getBook } = useBooks()
  const book = getBook(bookId)

  if (!book) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">本が見つかりませんでした</p>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>
      </div>
    )
  }

  const getStatusLabel = (status: typeof book.status) => {
    switch (status) {
      case "available":
        return "利用可能"
      case "borrowed":
        return "貸出中"
      case "lost":
        return "紛失"
      default:
        return status
    }
  }

  const getStatusColor = (status: typeof book.status) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "borrowed":
        return "bg-yellow-500"
      case "lost":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">蔵書詳細</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl || "/placeholder.svg"}
                  alt={`${book.title} cover`}
                  className="w-full h-auto object-cover rounded-md"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-muted flex items-center justify-center rounded-md">
                  <span className="text-muted-foreground">No Cover</span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold">{book.title}</h2>
                <Badge className={getStatusColor(book.status)}>{getStatusLabel(book.status)}</Badge>
              </div>

              <p className="text-lg text-muted-foreground mt-2">{book.author}</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">ISBN</h3>
                  <p>{book.isbn}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">出版年</h3>
                  <p>{book.publishedYear}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">ジャンル</h3>
                  <p>{book.genre}</p>
                </div>
              </div>

              {book.description && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-muted-foreground">説明</h3>
                  <p className="mt-2">{book.description}</p>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <Button onClick={onEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  編集
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

