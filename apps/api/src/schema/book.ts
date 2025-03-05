import { z } from "zod";

export const bookStatus = z
  .enum(["available", "borrowed", "lost"])
  .openapi("BookStatus");

export const createBookSchema = z
  .object({
    title: z.string().min(1).max(255),
    author: z.string().min(1).max(255),
    isbn: z.string(),
    publishedYear: z.number().int().min(1000).max(new Date().getFullYear()),
    genre: z.string().min(1).max(100),
    description: z.string(),
    coverUrl: z.string(),
    status: bookStatus.default("available"),
  })
  .openapi("CreateBook");

export const updateBookSchema = createBookSchema
  .partial()
  .openapi("UpdateBook");

export const bookResponseSchema = createBookSchema
  .extend({
    id: z.string(),
    createdAt: z.number(),
    updatedAt: z.number(),
  })
  .openapi("Book");

export type CreateBook = z.infer<typeof createBookSchema>;
export type UpdateBook = z.infer<typeof updateBookSchema>;
export type BookResponse = z.infer<typeof bookResponseSchema>;
