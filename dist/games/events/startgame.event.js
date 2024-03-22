"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartGame = void 0;
const events_1 = require("../../utils/events");
const constants_1 = require("../../utils/constants");
class StartGame {
    constructor(game, questions, onEmitNextEventCb) {
        this.game = game;
        this.listQuestions = questions;
        this.onEmitNextEventCb = onEmitNextEventCb;
    }
    emitEvent(currentIndex) {
        this.timeoutId && clearTimeout(this.timeoutId);
        const question = this.listQuestions[currentIndex];
        this.game.emit(events_1.GAME_EVENTS.QUIZZ_QUESTIONS, question);
        console.log("limit: ", question);
        this.timeoutId = setTimeout(() => {
            this.handleTimeout(currentIndex);
        }, (0, constants_1.getTimeLimitInSecond)(question.timeLimit));
    }
    async handleTimeout(currentIndex) {
        this.game.emit(events_1.GAME_EVENTS.QUESTION_TIME_OUT, `Time out for question ${currentIndex.toString()}`);
        const hasNextQuestion = currentIndex < this.listQuestions.length - 1;
        if (hasNextQuestion) {
            await this.onEmitNextEventCb(true);
        }
        else {
            await this.onEmitNextEventCb(false);
            this.game.emit(events_1.GAME_EVENTS.TIME_OUT, "Time out");
            clearTimeout(this.timeoutId);
        }
    }
}
exports.StartGame = StartGame;
//# sourceMappingURL=startgame.event.js.map