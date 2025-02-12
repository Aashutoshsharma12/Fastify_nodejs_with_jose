"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: 'user' }
}, {
    timestamps: true,
    versionKey: false
});
exports.userModel = (0, mongoose_1.model)('userModel', schema);
