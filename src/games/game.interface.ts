import mongoose from "mongoose";
import { QuestionList } from "src/questions/questions.interface";

export type Participant = {
  name: string;
  score: number;
};

export interface Game extends Document {
  readonly _id: string;
  readonly code: string;
  readonly questionList: QuestionList;
  readonly participants: [Participant];
  readonly startDatetime: Date;
  readonly endDatetime: Date;
}
