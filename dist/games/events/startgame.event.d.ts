export declare class StartGame {
    private game;
    private listQuestions;
    private timeoutId;
    private onEmitNextEventCb;
    constructor(game: any, questions: any[], onEmitNextEventCb: Function);
    emitEvent(currentIndex: any): void;
    private handleTimeout;
}
