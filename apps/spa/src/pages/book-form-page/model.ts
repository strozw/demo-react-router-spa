import * as z from "zod";

export const bookFormSchema = z.object({
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

export type BookFormValues = z.infer<typeof bookFormSchema>;
