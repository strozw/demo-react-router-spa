import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '../utils';

export const books = sqliteTable('books', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  title: text('title').notNull(),
  author: text('author').notNull(),
  isbn: text('isbn').notNull().unique(),
  publishedYear: integer('published_year').notNull(),
  genre: text('genre').notNull(),
  description: text('description').notNull(),
  coverUrl: text('cover_url').notNull(),
  status: text('status', { enum: ['available', 'borrowed', 'lost'] }).notNull().default('available'),
  createdAt: integer('created_at')
    .notNull()
    .$defaultFn(() => Date.now()),
  updatedAt: integer('updated_at')
    .notNull()
    .$defaultFn(() => Date.now()),
});

export type Book = typeof books.$inferSelect;
export type NewBook = typeof books.$inferInsert;
