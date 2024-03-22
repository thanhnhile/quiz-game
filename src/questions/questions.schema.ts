import * as mongoose from "mongoose";
import { Connection } from "mongoose";

export const QuestionListSchema = new mongoose.Schema(
  {
    questionList: [
      {
        content: { type: String, require: true },
        image: {
          type: String,
          default: "", // You can set a default value if needed
        },
        options: [
          {
            id: {
              type: String,
              required: true,
            },
            content: {
              type: String,
              required: true,
            },
          },
        ],
        timeLimit: { type: String, required: true },
        answerId: {
          type: String,
          required: true,
        },
        score: { type: Number, default: 1000 },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const QuestionProviders = [
  {
    provide: "QUESTINON_LIST_MODEL",
    useFactory: (connection: Connection) =>
      connection.model("QuestionList", QuestionListSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];
