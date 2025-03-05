import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { z } from 'zod';
import {
  createBookSchema,
  updateBookSchema,
  bookResponseSchema,
  BookResponse,
} from '../schema/book';
import { db } from '../db';
import { books } from '../db/schema';
import { eq } from 'drizzle-orm';

const app = new OpenAPIHono();

const errorResponse = z.object({
  message: z.string(),
});

// List all books
app.openapi(
  createRoute({
    method: 'get',
    path: '/',
    tags: ['Books'],
    summary: 'List all books',
    responses: {
      200: {
        description: 'List of books',
        content: {
          'application/json': {
            schema: z.array(bookResponseSchema),
          },
        },
      },
    },
  }),
  async (c) => {
    const result = await db.select().from(books);

    return c.json(result, 200);
  }
);

// Get a book by ID
app.openapi(
  createRoute({
    method: 'get',
    path: '/{id}',
    tags: ['Books'],
    summary: 'Get a book by ID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' },
      },
    ],
    responses: {
      200: {
        description: 'Book details',
        content: {
          'application/json': {
            schema: bookResponseSchema,
          },
        },
      },
      404: {
        description: 'Book not found',
        content: {
          'application/json': {
            schema: errorResponse,
          },
        },
      },
    },
  }),
  async (c) => {
    const id = c.req.param('id') ?? '';
    const result = await db
      .select()
      .from(books)
      .where(eq(books.id, id))
      .limit(1);

    if (result.length === 0) {
      return c.json({ message: 'Book not found' }, 404);
    }

    const book: BookResponse = result[0]

    return c.json(book, 200);
  }
);

// Create a new book
app.openapi(
  {
    method: 'post',
    path: '/',
    tags: ['Books'],
    summary: 'Create a new book',
    request: {
      body: {
        content: {
          'application/json': {
            schema: createBookSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Book created successfully',
        content: {
          'application/json': {
            schema: bookResponseSchema,
          },
        },
      },
      400: {
        description: 'Invalid request',
        content: {
          'application/json': {
            schema: errorResponse,
          },
        },
      },
    },
  },
  async (c) => {
    const data = c.req.valid('json');
    const now = Date.now();

    try {
      const result = await db
        .insert(books)
        .values({
          ...data,
          createdAt: now,
          updatedAt: now,
        })
        .returning();

      return c.json(result[0], 201);
    } catch (error) {
      if (typeof error === 'object' && error && ('code' in error) && error.code === 'SQLITE_CONSTRAINT') {
        return c.json({ message: 'ISBN already exists' }, 400);
      }
      throw error;
    }
  }
);

// Update a book
app.openapi(
  {
    method: 'patch',
    path: '/{id}',
    tags: ['Books'],
    summary: 'Update a book',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' },
      },
    ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: updateBookSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Book updated successfully',
        content: {
          'application/json': {
            schema: bookResponseSchema,
          },
        },
      },
      404: {
        description: 'Book not found',
        content: {
          'application/json': {
            schema: errorResponse,
          },
        },
      },
    },
  },
  async (c) => {
    const id = c.req.param('id') ?? '';
    const data = c.req.valid('json');

    const result = await db
      .update(books)
      .set({ ...data, updatedAt: Date.now() })
      .where(eq(books.id, id))
      .returning();

    if (result.length === 0) {
      return c.json({ message: 'Book not found' }, 404);
    }

    return c.json(result[0], 200);
  }
);

// Delete a book
app.openapi(
  {
    method: 'delete',
    path: '/{id}',
    tags: ['Books'],
    summary: 'Delete a book',
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' },
      },
    ],
    responses: {
      204: {
        description: 'Book deleted successfully',
      },
      404: {
        description: 'Book not found',
        content: {
          'application/json': {
            schema: errorResponse,
          },
        },
      },
    },
  },
  async (c) => {
    const id = c.req.param('id') ?? '';

    const result = await db.delete(books).where(eq(books.id, id)).returning();

    if (result.length === 0) {
      return c.json({ message: 'Book not found' }, 404);
    }

    return new Response(null, { status: 204 });
  }
);

export default app;
