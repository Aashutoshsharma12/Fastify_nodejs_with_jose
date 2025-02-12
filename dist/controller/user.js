"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
const jose_1 = require("jose");
const fs_1 = require("fs");
const crypto_1 = require("crypto");
function add(req) {
    return new Promise(async (resolve, reject) => {
        try {
            // Load the public key from file
            const publicKeyPem = (0, fs_1.readFileSync)('public.pem', 'utf-8');
            const publicKey = (0, crypto_1.createPublicKey)(publicKeyPem);
            const add = await model_1.userModel.create(req.body);
            // const token = fastify.jwt.sign({ _id: add._id, role: 'user' }, { expires: '1m' })
            let newObj = add.toObject();
            // Encrypt JWT
            const encryptedJWT = await new jose_1.EncryptJWT({ userId: add._id, role: 'user' })
                .setProtectedHeader({ alg: 'RSA-OAEP', enc: 'A256GCM' })
                .setIssuedAt()
                .setExpirationTime('1h')
                .encrypt(publicKey);
            console.log(publicKey, 'Encrypted JWT:', encryptedJWT);
            newObj.token = encryptedJWT;
            resolve(newObj);
        }
        catch (err) {
            reject(err);
        }
    });
}
function list(req) {
    return new Promise(async (resolve, reject) => {
        try {
            const list = await model_1.userModel.find();
            resolve(list);
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.default = {
    add,
    list
};
