const { serve } = require('@hono/node-server');

const port = process.env.PORT || 3000;

let fetchHandler = null;

// Start loading the app immediately but don't wait for it before listening
import('./dist/server/server.js')
  .then(module => {
    fetchHandler = module.default.fetch;
    console.log("App loaded successfully");
  })
  .catch(err => {
    console.error("Failed to load app", err);
  });

serve({
  fetch: async (request, env, ctx) => {
    if (!fetchHandler) {
      return new Response('Server is starting up, please try again in a moment.', { status: 503 });
    }
    return fetchHandler(request, env, ctx);
  },
  port: Number(port)
});

console.log(`Node server listening on port ${port}`);
