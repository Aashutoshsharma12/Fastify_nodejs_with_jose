import vendorRoute from "./vendor/index";
import userRoute from "./user/index";

export default async function userRoutes(fastify: any) {
    fastify.register(userRoute, { prefix: '/user' });
    fastify.register(vendorRoute, { prefix: '/vendor' });
}