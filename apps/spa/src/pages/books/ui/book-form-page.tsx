import { $api } from "@/shared/api";
import type { components } from "@/shared/api";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const bookSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  author: z.string().min(1, "著者は必須です"),
  isbn: z.string().min(1, "ISBNは必須です"),
  publishedYear: z.coerce
    .number()
    .min(1000, "有効な出版年を入力してください")
    .max(new Date().getFullYear(), "未来の年は入力できません"),
  genre: z.string().min(1, "ジャンルは必須です"),
  description: z
    .string()
    .optional()
    .transform((value) => value || ""),
  coverUrl: z
    .string()
    .optional()
    .transform((value) => value || ""),
  status: z.enum(["available", "borrowed", "lost"]),
});

type BookFormValues = z.infer<typeof bookSchema>;

interface BookFormProps {
  bookId?: string;
  onCancel: () => void;
}

export function BookFormPage({ bookId, onCancel }: BookFormProps) {
  const { mutate: mutateToCreated, error: errorAboutCreate } = $api.useMutation(
    "post",
    "/books",
    {
      onSuccess: () => {
        onCancel();
      },
    },
  );
  const { mutate: mutateToUpdated, error: errorAboutUpdate } = $api.useMutation(
    "patch",
    "/books/{id}",
    {
      onSuccess: () => {
        onCancel();
      },
    },
  );

  const { data: book, isLoading: isBookLoading } = $api.useQuery(
    "get",
    "/books/{id}",
    { params: { path: { id: bookId ?? "" } } },
    { enabled: !!bookId },
  );

  const addBook = async (book: components["schemas"]["CreateBook"]) =>
    mutateToCreated({ body: book });

  const updateBook = async (
    id: string,
    book: components["schemas"]["UpdateBook"],
  ) =>
    mutateToUpdated({
      params: { path: { id } },
      body: book,
    });

  const apiErrorMessage =
    errorAboutCreate?.message || errorAboutUpdate?.message;

  const isEditing = !!bookId;

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
  });

  useEffect(() => {
    switch (apiErrorMessage) {
      case "ISBN already exists":
        form.setError("isbn", { message: "このISBNはすでに登録されています" });
        break;
    }
  }, [form.setError, apiErrorMessage]);

  useEffect(() => {
    if (isEditing && book && book) {
      form.reset({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publishedYear: book.publishedYear,
        genre: book.genre,
        description: book.description,
        coverUrl: book.coverUrl || "",
        status: book.status,
      });
    }
  }, [book, isEditing, form]);

  const onSubmit = async (data: BookFormValues) => {
    if (isEditing && bookId) {
      await updateBook(bookId, data);
    } else {
      await addBook(data);
    }
  };

  if (isEditing && isBookLoading) {
    return <div>書籍情報を取得中...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">
          {isEditing ? "蔵書を編集" : "新規蔵書登録"}
        </h1>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                  <FormDescription>
                    画像のURLを入力してください（任意）
                  </FormDescription>
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
                  <Textarea
                    placeholder="本の説明"
                    className="min-h-[120px]"
                    {...field}
                  />
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
  );
}
