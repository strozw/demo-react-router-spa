import { z } from 'zod';

export const bookStatus = z.enum(['available', 'borrowed', 'lost']);

export const createBookSchema = z.object({
  title: z.string().min(1).max(255),
  author: z.string().min(1).max(255),
  isbn: z.string().regex(/^[\d-]{10,17}$/, 'Invalid ISBN format'),
  publishedYear: z.number().int().min(1000).max(new Date().getFullYear()),
  genre: z.string().min(1).max(100),
  description: z.string().min(1),
  coverUrl: z.string().url().nullable(),
  status: bookStatus.default('available'),
});

export const updateBookSchema = createBookSchema.partial();

export const bookResponseSchema = createBookSchema.extend({
  id: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type CreateBook = z.infer<typeof createBookSchema>;
export type UpdateBook = z.infer<typeof updateBookSchema>;
export type BookResponse = z.infer<typeof bookResponseSchema>;
