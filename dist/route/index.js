"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userRoutes;
const index_1 = __importDefault(require("./vendor/index"));
const index_2 = __importDefault(require("./user/index"));
async function userRoutes(fastify) {
    fastify.register(index_2.default, { prefix: '/user' });
    fastify.register(index_1.default, { prefix: '/vendor' });
}
