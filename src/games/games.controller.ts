import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { GamesService } from "./games.service";
import {
  GameCreateDto,
  GameJoinCreateDto,
  GameStartCreateDto,
} from "./dto/game.create.dto";
@Controller("/")
export class GamesController {
  constructor(private gameService: GamesService) {}

  @Post("games")
  createNewGameSession(@Body() gameCreateDto: GameCreateDto) {
    return this.gameService.createNewGameSession(gameCreateDto);
  }

  @Post("game/join")
  joinGame(@Body() gameJoinDto: GameJoinCreateDto) {
    return this.gameService.joinGame(gameJoinDto);
  }

  @Post("game/start")
  startGame(@Body() gameStartDto: GameStartCreateDto) {
    return this.gameService.startGame(gameStartDto);
  }

  @Get("game/:code/participants")
  getParticipants(@Param("code") code: string) {
    return this.gameService.getGameParticipants(code);
  }
}
