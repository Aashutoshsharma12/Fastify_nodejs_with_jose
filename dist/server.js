"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastify = void 0;
const fastify_1 = __importDefault(require("fastify"));
const socket_1 = __importDefault(require("./socket")); // Import socket.ts
exports.fastify = (0, fastify_1.default)({
    logger: true, // Enables logging
});
const fastify_socket_io_1 = __importDefault(require("fastify-socket.io"));
const index_1 = __importDefault(require("./route/index"));
const database_1 = __importDefault(require("./database"));
// import cors from "@fastify/cors";
const jwt_1 = __importDefault(require("@fastify/jwt"));
(0, database_1.default)();
// Register socket.io plugin
// Register Socket.IO plugin
exports.fastify.register(fastify_socket_io_1.default, {
    cors: {
        origin: "*", // Allow all origins (you can restrict it)
    },
}); // Register JWT plugin
exports.fastify.register(jwt_1.default, {
    secret: "your-secret-key", // Change this to a strong secret key
});
// Global error handler
exports.fastify.setErrorHandler((error, request, reply) => {
    // Log the error
    request.log.error(error);
    console.log(error.message, "error");
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
exports.fastify.register(index_1.default, { prefix: "/api/v1" });
// Serve static files from the 'public' folder
// fastify.register(require("@fastify/static"), {
//   root: path.join(__dirname, "public"),
//   prefix: "/",
// });
// Route to serve different HTML files dynamically
exports.fastify.get("/:page", async (req, reply) => {
    const page = req.params.page;
    // Ensure only allowed HTML files are served
    const allowedPages = ["index", "index1"];
    if (allowedPages.includes(page)) {
        return reply.sendFile(`${page}.html`);
    }
    return reply.status(404).send("Page Not Found");
});
exports.fastify.listen({ port: 4000 }, (err, address) => {
    if (err) {
        exports.fastify.log.error(err);
        process.exit(1);
    }
    console.log("🚀 Server running at http://localhost:4000");
    (0, socket_1.default)(exports.fastify);
});
