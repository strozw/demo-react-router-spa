import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useBooks } from "@/components/book-context"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { useEffect } from "react"

const bookSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  author: z.string().min(1, "著者は必須です"),
  isbn: z.string().min(1, "ISBNは必須です"),
  publishedYear: z.coerce
    .number()
    .min(1000, "有効な出版年を入力してください")
    .max(new Date().getFullYear(), "未来の年は入力できません"),
  genre: z.string().min(1, "ジャンルは必須です"),
  description: z.string().optional(),
  coverUrl: z.string().optional(),
  status: z.enum(["available", "borrowed", "lost"]),
})

type BookFormValues = z.infer<typeof bookSchema>

interface BookFormProps {
  bookId?: string
  onCancel: () => void
}

export function BookForm({ bookId, onCancel }: BookFormProps) {
  const { addBook, updateBook, getBook } = useBooks()
  const isEditing = !!bookId

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      publishedYear: new Date().getFullYear(),
      genre: "",
      description: "",
      coverUrl: "",
      status: "available",
    },
  })

  useEffect(() => {
    if (isEditing && bookId) {
      const book = getBook(bookId)
      if (book) {
        form.reset({
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          publishedYear: book.publishedYear,
          genre: book.genre,
          description: book.description,
          coverUrl: book.coverUrl || "",
          status: book.status,
        })
      }
    }
  }, [bookId, getBook, isEditing, form])

  const onSubmit = (data: BookFormValues) => {
    if (isEditing && bookId) {
      updateBook(bookId, data)
    } else {
      addBook(data)
    }
    onCancel()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{isEditing ? "蔵書を編集" : "新規蔵書登録"}</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>タイトル</FormLabel>
                  <FormControl>
                    <Input placeholder="本のタイトル" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>著者</FormLabel>
                  <FormControl>
                    <Input placeholder="著者名" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder="ISBN番号" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="publishedYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>出版年</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="出版年" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ジャンル</FormLabel>
                  <FormControl>
                    <Input placeholder="ジャンル" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>状態</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="状態を選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="available">利用可能</SelectItem>
                      <SelectItem value="borrowed">貸出中</SelectItem>
                      <SelectItem value="lost">紛失</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>表紙画像URL</FormLabel>
                  <FormControl>
                    <Input placeholder="表紙画像のURL" {...field} />
                  </FormControl>
                  <FormDescription>画像のURLを入力してください（任意）</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>説明</FormLabel>
                <FormControl>
                  <Textarea placeholder="本の説明" className="min-h-[120px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              キャンセル
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              保存
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

