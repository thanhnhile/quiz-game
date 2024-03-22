export interface GameCreateDto {
    startDatetime: string | null;
    endDatetime: string | null;
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
    questionId: string;
    answerId: string;
    responeTimestamp: number;
}
export interface GameRankingDto {
    code: string;
    participants: [{
        name: string;
        score: number;
        _id: string;
    }];
    currentQuestionId: string;
}
export interface RequestNextQuestionDto {
    currentIndex: number;
}
