import { clearInterval } from "timers";
// import { GameSession } from "../models/gameSession";
import { GAME_EVENTS } from "src/utils/events";

export class StartGame {
  private game: any;
  private listQuestions: any[];

  private currentIndex = 0;
  private intervalId: NodeJS.Timeout;
  private onEmitNextEventCb: Function;

  constructor(game: any, questions: any[], onEmitNextEventCb: Function) {
    this.game = game;
    this.listQuestions = questions;
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
