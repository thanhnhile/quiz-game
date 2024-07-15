import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';

export const GameSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      readonly: true,
      require: true,
      unique: true,
      length: 6,
    },
    questionList: {
      type: mongoose.Types.ObjectId,
      ref: 'QuestionList',
    },
    participants: [
      {
        name: { type: String, require: true },
        totalScore: { type: Number, default: 0 },
        lastestScore: { type: Number, default: 0 },
      },
    ],
    startDatetime: { type: Date },
    endDatetime: { type: Date },
  },
  {
    versionKey: false,
    timestamps: true, //add createdAt, updatedAt automatically
  },
);

export const GameProviders = [
  {
    provide: 'GAME_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Game', GameSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
