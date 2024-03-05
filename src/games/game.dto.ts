export interface GameCreateDto {
  startDatetime: string | null;
  endDatetime: string | null;
  timeLimit: string; // time limit for a session '1s/1m/1h'
  questionListId: string;
}

export interface GameJoinCreateDto {
  code: string;
  name: string;
}

export interface GameStartCreateDto {
  code: string;
}

export interface GameAnswerDto {
  code: string;
  participantName: string;
  questionId: string;
  score: number;
  timestamp: number;
}

export interface GameRankingDto {
  code: string;
  participants: [{ name: string; score: number; _id: string }];
  currentQuestionId: string;
}
