/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { EventEmitter2 } from "@nestjs/event-emitter";
import { GameCreateDto, GameJoinCreateDto, GameStartCreateDto } from "./game.dto";
import { Model } from "mongoose";
import { Game, Participant } from "./game.interface";
import { GameAnswerDto } from "./game.dto";
import { JwtService } from "@nestjs/jwt";
export declare class GamesService {
    private eventEmitter;
    private gameModel;
    private jwtService;
    constructor(eventEmitter: EventEmitter2, gameModel: Model<Game>, jwtService: JwtService);
    private generateCode;
    createNewGameSession(gameCreateDto: GameCreateDto): Promise<{
        accessToken: string;
        code: string;
    }>;
    joinGame(gameJoinCreateDto: GameJoinCreateDto): Promise<{
        accessToken: string;
        name: string;
        code: string;
    }>;
    startGame(gameStartDto: GameStartCreateDto): Promise<void>;
    submitAnswer(code: any, participantName: any, gameAnswerDto: GameAnswerDto): Promise<void>;
    findByCode(code: string): Promise<Game>;
    getGameParticipants(code: string): Promise<[Participant]>;
    updateStartDatetime(id: string): Promise<void>;
}
