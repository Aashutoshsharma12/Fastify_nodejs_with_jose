import { FastifyInstance } from "fastify";
// const fastify = FastifyInstance()
import controller from "../../controller/user";
import { authorizeRoles } from "../../middleware";

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

export default async function authRoute(fastify: any) {
  fastify.post("/add", { schema: userSchema }, controller.add);
  fastify.get("/list", { preHandler: [fastify.authenticate, authorizeRoles(['user'])] }, controller.list);
}