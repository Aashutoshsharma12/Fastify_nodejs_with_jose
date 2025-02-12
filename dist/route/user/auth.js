"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authRoute;
// const fastify = FastifyInstance()
const user_1 = __importDefault(require("../../controller/user"));
const middleware_1 = require("../../middleware");
// Define schema for validation
const userSchema = {
    body: {
        type: "object",
        required: ["name", "email"],
        properties: {
            name: { type: "string", minLength: 3 },
            email: { type: "string", format: "email" },
            age: { type: "integer", minimum: 18 },
        },
        // dependencies: {
        //   phone: ["countryCode"], // If phone exists, countryCode is required
        // },
    },
};
// Schema for validating request parameters and query string
const getUserSchema = {
    params: {
        type: "object",
        required: ["id"],
        properties: {
            id: { type: "integer", minimum: 1 }, // id must be a number >= 1
        },
    },
    querystring: {
        type: "object",
        properties: {
            status: { type: "string", enum: ["active", "inactive"] }, // Must be 'active' or 'inactive'
        },
    },
};
async function authRoute(fastify) {
    fastify.post("/add", { schema: userSchema }, user_1.default.add);
    fastify.get("/list", { preHandler: [fastify.authenticate, (0, middleware_1.authorizeRoles)(['user'])] }, user_1.default.list);
}
