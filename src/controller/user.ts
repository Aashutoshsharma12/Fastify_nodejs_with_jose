import fastifyJwt from "@fastify/jwt";
import { userModel } from "../model";
import { fastify } from "../server";
import { EncryptJWT } from 'jose';
import { readFileSync } from 'fs';
import { createPublicKey } from 'crypto';
function add(req: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {


            // Load the public key from file
            const publicKeyPem = readFileSync('public.pem', 'utf-8');
            const publicKey = createPublicKey(publicKeyPem);

            const add = await userModel.create(req.body);
            // const token = fastify.jwt.sign({ _id: add._id, role: 'user' }, { expires: '1m' })
            let newObj: any = add.toObject()
            // Encrypt JWT
            const encryptedJWT = await new EncryptJWT({ userId: add._id, role: 'user' })
                .setProtectedHeader({ alg: 'RSA-OAEP', enc: 'A256GCM' })
                .setIssuedAt()
                .setExpirationTime('1m')
                .encrypt(publicKey);
            console.log(publicKey, 'Encrypted JWT:', encryptedJWT);
            newObj.token = encryptedJWT
            resolve(newObj);
        } catch (err) {
            reject(err)
        }
    });
}
function list(req: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const list = await userModel.find();
            resolve(list);
        } catch (err) {
            reject(err)
        }
    });
}

export default {
    add,
    list
} as const;