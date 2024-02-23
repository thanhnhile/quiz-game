export interface GameCreateDto {
  startDatetime: string | null;
  endDatetime: string | null;
  timeLimit: string; // time limit for a session '1s/1m/1h'
  questionListId: string;
}
