import { Body, Controller, Post } from '@nestjs/common';
import { GamesService } from './games.service';
import { GameCreateDto } from './dto/game.create.dto';
import { GameJoinDto } from './dto/game.join.dto';

@Controller('games')
export class GamesController {
  constructor(private gameService: GamesService) {}

  @Post()
  createNewGameSession(@Body() gameCreateDto: GameCreateDto) {
    return this.gameService.createNewGameSession(gameCreateDto);
  }
}
