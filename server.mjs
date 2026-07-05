import { serve } from '@hono/node-server';
import app from './dist/server/server.js';

const port = process.env.PORT || 3000;

serve({
  fetch: app.fetch,
  port: Number(port)
});

console.log(`Node server listening on port ${port}`);
