"use client";

import { $api } from "@/shared/api";
import type { Book } from "@/shared/api/";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { Edit, Eye, PlusCircle, Trash2 } from "lucide-react";

interface BookListProps {
  onAddBook: () => void;
  onEditBook: (id: string) => void;
  onViewBook: (id: string) => void;
}

export function BookListPage({
  onAddBook,
  onEditBook,
  onViewBook,
}: BookListProps) {
  const queryClient = useQueryClient();

  const { data: books = [], isLoading: isBooksLoading } = $api.useQuery(
    "get",
    "/books",
  );

  const { mutate: mutateToDeleted } = $api.useMutation(
    "delete",
    "/books/{id}",
    {
      onSuccess: async (_, args) => {
        queryClient.setQueryData<typeof books>(
          $api.queryOptions("get", "/books").queryKey,
          (old) => {
            return old?.filter((book) => book.id !== args.params.path.id);
          },
        );
      },
    },
  );

  const deleteBook = async (id: string) => {
    mutateToDeleted({ params: { path: { id } } });
  };

  const getStatusColor = (status?: Book["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "borrowed":
        return "bg-yellow-500";
      case "lost":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isBooksLoading) {
    return <div>書籍一覧を取得中...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">蔵書管理</h1>
        <Button onClick={onAddBook}>
          <PlusCircle className="mr-2 h-4 w-4" />
          新規登録
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <Card key={book.id} className="overflow-hidden">
            <div className="flex h-full">
              <div className="w-1/3 bg-muted flex items-center justify-center">
                {book.coverUrl ? (
                  <img
                    src={book.coverUrl || "/placeholder.svg"}
                    alt={`${book.title} cover`}
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <div className="text-muted-foreground">No Cover</div>
                )}
              </div>
              <CardContent className="w-2/3 p-4 flex flex-col">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold truncate">{book.title}</h3>
                    <Badge className={getStatusColor(book.status)}>
                      {book.status === "available" && "利用可能"}
                      {book.status === "borrowed" && "貸出中"}
                      {book.status === "lost" && "紛失"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  <p className="text-xs mt-2">ISBN: {book.isbn}</p>
                  <p className="text-xs">出版年: {book.publishedYear}</p>
                  <p className="text-xs">ジャンル: {book.genre}</p>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewBook(book.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditBook(book.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteBook(book.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            蔵書がありません。新しい本を追加してください。
          </p>
          <Button onClick={onAddBook} className="mt-4">
            <PlusCircle className="mr-2 h-4 w-4" />
            新規登録
          </Button>
        </div>
      )}
    </div>
  );
}
