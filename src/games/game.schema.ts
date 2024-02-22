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
    questions_list_id: { type: mongoose.Schema.Types.ObjectId },
    participants: { type: Array, default: [] },
  },
  {
    _id: false,
    versionKey: false,
    timestamps: true, //add created_date, updated_date automatically
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
