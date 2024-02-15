import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@quizz-game.9fhpjwe.mongodb.net/`,
      ),
  },
];
