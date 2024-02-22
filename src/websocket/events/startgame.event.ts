import { clearInterval } from 'timers';
import { GameSession } from '../models/gameSession';

export class StartGame {
  private game: GameSession;
  private listQuestions: any[];

  private currentIndex = 0;
  private intervalId: NodeJS.Timeout;
  private onEmitNextEventCb: Function;

  constructor(
    game: GameSession,
    questions: any[],
    onEmitNextEventCb: Function,
  ) {
    this.game = game;
    this.listQuestions = questions;
    this.onEmitNextEventCb = onEmitNextEventCb;
    this.startEmittingEvent();
  }

  private startEmittingEvent() {
    this.emitNextEvent();

    const intervalId = setInterval(() => {
      this.emitNextEvent();
    }, 10000);
  }

  private emitNextEvent() {
    if (this.currentIndex < this.listQuestions.length) {
      this.currentIndex > 0 &&
        this.onEmitNextEventCb(this.currentIndex.toString());
      const quizz = this.listQuestions[this.currentIndex];
      this.game.emitEvent('quizzQuestion', quizz);
      this.currentIndex++;
    } else {
      clearInterval(this.intervalId);
    }
  }
}
