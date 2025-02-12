import authRoute from "./auth";

export default async function userRoutes(fastify: any) {
    fastify.register(authRoute, { prefix: '/auth' });
}