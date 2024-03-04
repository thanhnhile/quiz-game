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
