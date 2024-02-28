import { clearInterval } from "timers";
// import { GameSession } from "../models/gameSession";
import { GAME_EVENTS } from "src/utils/events";

export class StartGame {
  private game: any;
  private listQuestions: any[];
  private timeLimit: string;

  private currentIndex = 0;
  private intervalId: NodeJS.Timeout;
  private onEmitNextEventCb: Function;

  constructor(game: any, questions: any[], onEmitNextEventCb: Function) {
    this.game = game;
    this.listQuestions = questions;
    this, (timeLimit = timeLimit);
    this.onEmitNextEventCb = onEmitNextEventCb;
    this.startEmittingEvent();
  }

  private startEmittingEvent() {
    this.emitNextEvent();

    this.intervalId = setInterval(() => {
      this.emitNextEvent();
    }, 10000);
  }

  private emitNextEvent() {
    if (this.currentIndex < this.listQuestions.length) {
      this.currentIndex > 0 &&
        this.onEmitNextEventCb(this.currentIndex.toString());
      const quizz = this.listQuestions[this.currentIndex];
      this.game.emit(GAME_EVENTS.QUIZZ_QUESTIONS, quizz);
      this.currentIndex++;
    } else {
      clearInterval(this.intervalId);
      this.game.emit(GAME_EVENTS.TIME_OUT, "Time out");
    }
  }
}

const getTimeLimitInSecond = (timeLimit: string) => {
  const unit = timeLimit.at(-1);
  const value = Number.parseInt(timeLimit.slice(0, -1));
  switch (unit) {
    case "S":
      return value;
    case "M":
      return value * 60;
    case "H":
      return value * 3600;
  }
};
