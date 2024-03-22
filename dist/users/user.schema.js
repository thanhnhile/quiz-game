"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersProviders = exports.UserSchema = void 0;
const mongoose = require("mongoose");
const enums_1 = require("../utils/enums");
exports.UserSchema = new mongoose.Schema({
    name: { type: String, require: true },
    role: { type: String, enum: Object.values(enums_1.Role) },
}, {
    versionKey: false,
});
exports.usersProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection) => connection.model('User', exports.UserSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=user.schema.js.map