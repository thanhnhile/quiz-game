import { clearInterval } from 'timers';
import { GameSession } from '../models/gameSession';
import { GAME_EVENTS } from 'src/utils/events';
import { Question } from 'src/questions/questions.interface';

export class StartGame {
  private game: GameSession;
  private listQuestions: Question[];

  private currentIndex = 0;
  private intervalId: NodeJS.Timeout;
  private onEmitNextEventCb: Function;

  constructor(
    game: GameSession,
    questions: Question[],
    onEmitNextEventCb: Function,
  ) {
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
      this.game.emitEvent(GAME_EVENTS.QUIZZ_QUESTIONS, quizz);
      this.currentIndex++;
    } else {
      clearInterval(this.intervalId);
      this.game.emitEvent(GAME_EVENTS.TIME_OUT, 'Time out');
    }
  }
}
