"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameProviders = exports.GameSchema = void 0;
const mongoose = require("mongoose");
exports.GameSchema = new mongoose.Schema({
    code: {
        type: String,
        readonly: true,
        require: true,
        unique: true,
        length: 6,
    },
    questionList: {
        type: mongoose.Types.ObjectId,
        ref: "QuestionList",
    },
    participants: [
        {
            name: { type: String, require: true },
            score: { type: Number, default: 0 },
        },
    ],
    startDatetime: { type: Date },
    endDatetime: { type: Date },
}, {
    versionKey: false,
    timestamps: true,
});
exports.GameProviders = [
    {
        provide: "GAME_MODEL",
        useFactory: (connection) => connection.model("Game", exports.GameSchema),
        inject: ["DATABASE_CONNECTION"],
    },
];
//# sourceMappingURL=game.schema.js.map