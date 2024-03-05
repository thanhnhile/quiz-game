import { GAME_EVENTS } from "src/utils/events";

export class StartGame {
  private game: any;
  private listQuestions: any[];
  private timeLimitForEachQuestion: number;

  private currentIndex = 0;
  private timeoutId: NodeJS.Timeout;
  private onEmitNextEventCb: Function;

  constructor(
    game: any,
    questions: any[],
    timeLimit: string,
    onEmitNextEventCb: Function
  ) {
    this.game = game;
    this.listQuestions = questions;
    this.timeLimitForEachQuestion = Math.floor(
      getTimeLimitInSecond(timeLimit) / this.listQuestions.length
    );
    this.onEmitNextEventCb = onEmitNextEventCb;
    this.startEmittingEvent();
  }

  private startEmittingEvent() {
    this.emitEvent();
  }

  private emitEvent() {
    clearTimeout(this.timeoutId);
    const quizz = this.listQuestions[this.currentIndex];
    this.game.emit(GAME_EVENTS.QUIZZ_QUESTIONS, quizz);
    this.timeoutId = setTimeout(() => {
      this.handleTimeout();
    }, this.timeLimitForEachQuestion);
  }

  private async handleTimeout() {
    this.game.emit(
      GAME_EVENTS.QUESTION_TIME_OUT,
      `Time out for question ${this.currentIndex.toString()}`
    );
    this.currentIndex++;
    const hasNextQuestion = this.currentIndex < this.listQuestions.length;
    await this.onEmitNextEventCb(hasNextQuestion);
    clearTimeout(this.timeoutId);
    if (hasNextQuestion) {
      this.timeoutId = setTimeout(() => {
        this.emitEvent();
      }, 5000);
    } else {
      this.game.emit(GAME_EVENTS.TIME_OUT, "Time out");
      clearTimeout(this.timeoutId);
    }
  }
}

const getTimeLimitInSecond = (timeLimit: string) => {
  const length = timeLimit.length;
  const unit = timeLimit.at(length - 1);
  const value = Number.parseInt(timeLimit.slice(0, length - 1)) * 1000;
  switch (unit) {
    case "S":
      return value;
    case "M":
      return value * 60;
    case "H":
      return value * 3600;
  }
};
