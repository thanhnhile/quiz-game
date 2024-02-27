import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GameCreateDto, GameJoinCreateDto } from './dto/game.create.dto';
import mongoose, { Model, now } from 'mongoose';
import { Game, Participant } from './game.interface';
import { GAME_EVENTS } from 'src/utils/events';

@Injectable()
export class GamesService {
  constructor(
    private eventEmitter: EventEmitter2,
    @Inject('GAME_MODEL') private gameModel: Model<Game>,
  ) {}

  private generateCode(): string {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  }

  async createNewGameSession(gameCreateDto: GameCreateDto) {
    //validate
    //create game sesstion
    const code = this.generateCode();
    this.eventEmitter.emit(GAME_EVENTS.EVENT_EMITTER.NEW_GAME_CREATED, code);
    //save to DB
    const model = new this.gameModel({
      code,
      questionList: new mongoose.Types.ObjectId(gameCreateDto.questionListId),
      timeLimit: gameCreateDto.timeLimit,
      participants: [],
    });
    const newGame = await model.save();
    return newGame;
  }

  async joinGame(gameJoinCreateDto: GameJoinCreateDto) {
    const { name, code } = gameJoinCreateDto;
    try {
      const newParticipant = {
        name,
        score: 0,
      } as Participant;
      await this.gameModel.findOneAndUpdate(
        { code },
        { $push: { participants: newParticipant } },
      );
      const newJoinData = {
        newParticipant,
        code,
      };
      this.eventEmitter.emit(
        GAME_EVENTS.EVENT_EMITTER.NEW_JOIN_CREATED,
        newJoinData,
      );
    } catch (error) {
      throw new NotFoundException('Game code does not exist');
    }
  }

  async findByCode(code: string) {
    const game = await this.gameModel
      .findOne({ code })
      .populate('questionList')
      .exec();
    if (game) {
      return game;
    }
    throw new NotFoundException('Game code does not exist');
  }

  async getGameParticipants(code: string) {
    const game = await this.gameModel
      .findOne({ code })
      .select('participants')
      .exec();
    if (game) {
      return game.participants;
    }
    throw new NotFoundException('Game code does not exist');
  }

  async updateStartDatetime(id: string) {
    await this.gameModel.findByIdAndUpdate(id, { startDatetime: now() });
  }
}
