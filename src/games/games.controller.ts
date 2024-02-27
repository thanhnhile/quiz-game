import { Body, Controller, Post, Get, Param } from "@nestjs/common";
import { GamesService } from "./games.service";
import { GameCreateDto, GameJoinCreateDto } from "./dto/game.create.dto";
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

  @Get("/:code/paticipants")
  getParticipants(@Param('code') code:string){
    return this.gameService.getGameParticipants(code);
  }
}
