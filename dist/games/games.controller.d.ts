import { GamesService } from './games.service';
import { GameCreateDto, GameJoinCreateDto, GameStartCreateDto } from './game.dto';
export declare class GamesController {
    private gameService;
    constructor(gameService: GamesService);
    createNewGameSession(gameCreateDto: GameCreateDto): Promise<{
        accessToken: string;
        code: string;
    }>;
    joinGame(gameJoinDto: GameJoinCreateDto): Promise<{
        accessToken: string;
        name: string;
        code: string;
    }>;
    startGame(gameStartDto: GameStartCreateDto): Promise<void>;
    getParticipants(code: string): Promise<[import("./game.interface").Participant]>;
}
