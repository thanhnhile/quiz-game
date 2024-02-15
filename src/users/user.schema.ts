import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { Role } from 'src/utils/enums';

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    role: { type: String, enum: Object.values(Role) },
  },
  {
    versionKey: false,
  },
);

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
