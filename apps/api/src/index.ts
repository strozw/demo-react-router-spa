import { serve } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import bookRoutes from './routes/book';

const app = new OpenAPIHono();

app.use(logger())

app.use("/*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PATCH", "DELETE", "HEAD"],
  credentials: true,
}))

// OpenAPI Docs
app.doc('/docs', {
  openapi: '3.0.0',
  info: {
    title: 'Book Management API',
    version: '1.0.0',
    description: 'API for managing books in a library system',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
});

// Swagger UI
app.get('/ui', swaggerUI({ url: '/docs' }));

// Routes
app.route('/books', bookRoutes);

// Start server
const port = 3000;

console.log(`Server is running: http://localhost:${port}`);
console.log(`OpenAPI Docs: http://localhost:${port}/docs`);
console.log(`Swagger UI: http://localhost:${port}/ui`);

serve({
  fetch: app.fetch,
  port,
});
