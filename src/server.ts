import Fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import path, { join } from "path";
import socketHandler from "./socket"; // Import socket.ts
export const fastify = Fastify({
  logger: true, // Enables logging
})
import fastifyIO from 'fastify-socket.io';
import routes from './route/index'
import connectDb from './database';
// import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
connectDb();
// Register socket.io plugin
// Register Socket.IO plugin
fastify.register(fastifyIO, {
  cors: {
    origin: "*", // Allow all origins (you can restrict it)
  },
});// Register JWT plugin
// fastify.register(fastifyJwt, {
//   secret: "your-secret-key", // Change this to a strong secret key
// });
// Global error handler
fastify.setErrorHandler((error: FastifyError, request: any, reply: any) => {
  // Log the error
  request.log.error(error);
  console.log(error.message, "error")
  // Custom error response
  reply.status(error.statusCode || 500).send({
    success: false,
    message: error.message || 'Internal Server Error',
    code: error.code || 'INTERNAL_ERROR',
  });
});

// Global Authentication Hook (Runs before every route)
// fastify.addHook("preHandler", async (req: any, reply: any) => {
//   if (req.url !== "/login" && req.url !== "/add") {
//     const data = await req.jwtVerify(); // Verify token for protected routes
//   }
// });

// Register CORS as a plugin (Recommended way)
// fastify.register(cors, {
//   origin: "*", // Allow all origins
// });
// Register a global hook (like middleware)
// fastify.addHook("onRequest", async (request: any, reply: any) => {
//   console.log(`Incoming request: ${request.method} ${request.url}`);
// });
fastify.register(routes, { prefix: "/api/v1" });
// Serve static files from the 'public' folder
// fastify.register(require("@fastify/static"), {
//   root: path.join(__dirname, "public"),
//   prefix: "/",
// });
// Route to serve different HTML files dynamically
fastify.get("/:page", async (req: any, reply: any) => {
  const page = req.params.page;
  // Ensure only allowed HTML files are served
  const allowedPages = ["index", "index1"];
  if (allowedPages.includes(page)) {
    return reply.sendFile(`${page}.html`);
  }
  return reply.status(404).send("Page Not Found");
});

fastify.listen({ port: 4000 }, (err: any, address: any) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("🚀 Server running at http://localhost:4000");
  socketHandler(fastify);

})