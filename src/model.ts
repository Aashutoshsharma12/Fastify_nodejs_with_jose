import mongoose, { model, Schema } from "mongoose";
interface user {
    name: string;
    email: string;
    role: string;
}

const schema = new Schema<user>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: 'user' }
}, {
    timestamps: true,
    versionKey: false
}
);

export const userModel = model('userModel', schema);