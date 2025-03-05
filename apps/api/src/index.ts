import { serve } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import bookRoutes from './routes/book';

const app = new OpenAPIHono();

// Swagger UI
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

app.get('/ui', swaggerUI({ url: '/docs' }));

// Routes
app.route('/books', bookRoutes);

// Start server
const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
