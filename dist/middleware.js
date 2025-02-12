"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = authorizeRoles;
const jose_1 = require("jose");
const server_1 = require("./server");
const fs_1 = require("fs");
const crypto_1 = require("crypto");
// Middleware: Verify Token
server_1.fastify.decorate("authenticate", async (req, reply) => {
    try {
        // Load the private key from file
        const privateKeyPem = (0, fs_1.readFileSync)('private.pem', 'utf-8');
        const privateKey = (0, crypto_1.createPrivateKey)(privateKeyPem);
        // Decrypt JWT
        const { payload } = await (0, jose_1.jwtDecrypt)(req.headers.authorization, privateKey);
        console.log('Decrypted Payload:', payload);
        return req.user = payload;
    }
    catch (err) {
        reply.code(401).send({ message: err });
    }
});
function authorizeRoles(allowedRoles) {
    return async (req, reply) => {
        try {
            const user = req.user; // Extract user role from JWT
            console.log(req.user, "dkdkdkkd");
            if (!user || !allowedRoles.includes(user.role)) {
                return reply.code(403).send({ code: 403, message: "Forbidden - Access Denied" });
            }
        }
        catch (err) {
            console.log(err);
        }
    };
}
