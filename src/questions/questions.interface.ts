export interface QuestionList extends Document {
  readonly _id: string;
  readonly questionList: [Question];
  readonly createAt: Date;
  readonly updateAt: Date;
}

export interface Question {
  readonly _id: string;
  readonly content: string;
  readonly image: string;
  readonly options: [Option];
  readonly answer: string;
}

export interface Option {
  readonly _id: string;
  readonly id: string;
  readonly content: string;
}
