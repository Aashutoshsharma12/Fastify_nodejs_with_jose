"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userRoutes;
const auth_1 = __importDefault(require("./auth"));
async function userRoutes(fastify) {
    fastify.register(auth_1.default, { prefix: '/auth' });
}
