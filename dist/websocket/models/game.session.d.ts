import Client from "./client";
import { StartGame } from "src/games/events/startgame.event";
declare class GameSession {
    private code;
    private clients;
    private currentIndex;
    startEvent: StartGame;
    constructor(code: string);
    getCode: () => string;
    getNumberOfClients: () => number;
    addClient(client: Client): void;
    removeClient(clientId: string): void;
    updateCurrentIndex(): void;
}
export default GameSession;
