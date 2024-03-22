import { Question } from "src/questions/questions.interface";
import { GAME_EVENTS } from "src/utils/events";
import { getTimeLimitInSecond } from "src/utils/constants";

export class StartGame {
  private game: any;
  private listQuestions: Question[];

  private timeoutId: NodeJS.Timeout;
  private onEmitNextEventCb: Function;

  constructor(game: any, questions: any[], onEmitNextEventCb: Function) {
    this.game = game;
    this.listQuestions = questions;
    this.onEmitNextEventCb = onEmitNextEventCb;
  }

  emitEvent(currentIndex) {
    this.timeoutId && clearTimeout(this.timeoutId);
    const question = this.listQuestions[currentIndex];
    this.game.emit(GAME_EVENTS.QUIZZ_QUESTIONS, question);
    console.log("limit: ", question);
    this.timeoutId = setTimeout(() => {
      this.handleTimeout(currentIndex);
    }, getTimeLimitInSecond(question.timeLimit));
  }

  private async handleTimeout(currentIndex) {
    this.game.emit(
      GAME_EVENTS.QUESTION_TIME_OUT,
      `Time out for question ${currentIndex.toString()}`
    );
    const hasNextQuestion = currentIndex < this.listQuestions.length - 1;
    if (hasNextQuestion) {
      await this.onEmitNextEventCb(true);
    } else {
      await this.onEmitNextEventCb(false);
      this.game.emit(GAME_EVENTS.TIME_OUT, "Time out");
      clearTimeout(this.timeoutId);
    }
  }
}
