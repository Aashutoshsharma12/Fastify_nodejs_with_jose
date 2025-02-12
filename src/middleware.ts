
import { jwtDecrypt } from 'jose';
import { fastify } from "./server";
import { readFileSync } from 'fs';
import { createPrivateKey } from 'crypto';
// Middleware: Verify Token
fastify.decorate("authenticate", async (req: any, reply: any) => {
    try {
        // Load the private key from file
        const privateKeyPem = readFileSync('private.pem', 'utf-8');
        const privateKey = createPrivateKey(privateKeyPem);
        // Decrypt JWT
        const { payload } = await jwtDecrypt(req.headers.authorization, privateKey);
        console.log('Decrypted Payload:', payload);
        return req.user = payload;
    } catch (err) {
        reply.code(401).send({ message: err });
    }
});
export function authorizeRoles(allowedRoles: string[]) {
    return async (req: any, reply: any) => {
        try {
            const user = req.user as { role: string }; // Extract user role from JWT
            console.log(req.user, "dkdkdkkd")
            if (!user || !allowedRoles.includes(user.role)) {
                return reply.code(403).send({ code: 403, message: "Forbidden - Access Denied" });
            }
        } catch (err) {
            console.log(err);
        }
    };
}