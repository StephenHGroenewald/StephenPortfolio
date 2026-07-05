async function start() {
  try {
    const { serve } = await import('@hono/node-server');
    const app = await import('./dist/server/server.js');

    const port = process.env.PORT || 3000;

    serve({
      fetch: app.default.fetch,
      port: Number(port)
    });

    console.log(`Node server listening on port ${port}`);
  } catch (err) {
    console.error("Error starting server:", err);
  }
}

start();
