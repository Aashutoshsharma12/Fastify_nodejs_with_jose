"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = async () => {
    try {
        await mongoose_1.default.connect('mongodb+srv://aashutosh2021:Aashu12122@cluster1.ik1zz.mongodb.net/Fastify_Nodejs?retryWrites=true&w=majority&appName=Cluster1');
        console.log('DB connected ---');
    }
    catch (err) {
        console.log(err);
        return err;
    }
};
exports.default = connectDb;
