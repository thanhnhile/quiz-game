import { ObjectId } from 'mongoose';
import { QuestionList } from 'src/questions/questions.interface';

export interface Participant {
  _id: string;
  name: string;
  score: number;
}

export interface Game extends Document {
  readonly _id: string;
  readonly code: string;
  readonly questionList: QuestionList;
  readonly participants: [Participant];
  readonly timeLimit: string;
  readonly startDatetime: Date;
  readonly endDatetime: Date;
}
