"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
const server_1 = require("../server");
function add(req) {
    return new Promise(async (resolve, reject) => {
        try {
            req.body.role = 'vendor';
            const add = await model_1.userModel.create(req.body);
            const token = server_1.fastify.jwt.sign({ _id: add._id, role: 'vendor' }, { expires: '1m' });
            let newObj = add.toObject();
            newObj.token = token;
            console.log(token);
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
