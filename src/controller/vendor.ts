import { userModel } from "../model";
import { fastify } from "../server";

function add(req: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            req.body.role = 'vendor'
            const add = await userModel.create(req.body);
            const token = fastify.jwt.sign({ _id: add._id, role: 'vendor' }, { expires: '1m' })
            let newObj: any = add.toObject()
            newObj.token = token
            console.log(token)
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