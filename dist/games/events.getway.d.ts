import { IGatewaySessionManager } from "./gateway.session";
import Client from "../websocket/models/client";
import { Server } from "socket.io";
import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets/interfaces/hooks";
import { GamesService } from "src/games/games.service";
import { Game, Participant } from "src/games/game.interface";
import { GameAnswerDto } from "./game.dto";
export declare class EventGetway implements OnGatewayConnection, OnGatewayDisconnect {
    private sessionManager;
    private gameService;
    io: Server;
    constructor(sessionManager: IGatewaySessionManager, gameService: GamesService);
    handleDisconnect(client: Client): void;
    handleConnection(client: Client, ...args: any[]): void;
    handleNewJoinGame(newJoinData: {
        code: string;
        newParticipant: Participant;
    }): Promise<void>;
    handleNewGame(code: string): void;
    handleReceiveAnswer(answerDto: GameAnswerDto, client: Client): void;
    sendRankingBoard(code: string, hasNextQuestion: boolean): Promise<void>;
    handleStartGame(gameModel: Game): Promise<void>;
    handleNextQuestion(client: Client): void;
    countDown(code: any, second: number, afterCb: Function): void;
}
