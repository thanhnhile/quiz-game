import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  GameCreateDto,
  GameJoinCreateDto,
  GameStartCreateDto,
} from './game.dto';
import mongoose, { Model, now } from 'mongoose';
import { Game, Participant } from './game.interface';
import { GAME_EVENTS } from 'src/utils/events';
import { GameAnswerDto } from './game.dto';
import { JwtService } from '@nestjs/jwt';
import { getTimeLimitInSecond } from 'src/utils/constants';

@Injectable()
export class GamesService {
  constructor(
    private eventEmitter: EventEmitter2,
    @Inject('GAME_MODEL') private gameModel: Model<Game>,
    private jwtService: JwtService,
  ) {}

  private generateCode(): string {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  }

  async createNewGameSession(gameCreateDto: GameCreateDto) {
    //validate
    //create game sesstion
    try {
      const code = this.generateCode();
      this.eventEmitter.emit(GAME_EVENTS.EVENT_EMITTER.NEW_GAME_CREATED, code);
      //save to DB
      const model = new this.gameModel({
        code,
        questionList: new mongoose.Types.ObjectId(gameCreateDto.questionListId),
        participants: [],
      });
      const newGame = await model.save();
      const payload = {
        code,
        isHost: true,
      };
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken, code };
    } catch (error) {
      throw new HttpException(
        'Error during create new game session',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async joinGame(gameJoinCreateDto: GameJoinCreateDto) {
    const { name, code } = gameJoinCreateDto;
    const participants = await this.getGameParticipants(code);
    const existName = participants?.find(
      (participant) => participant.name === name,
    );
    if (existName)
      throw new BadRequestException(
        'Name is existed. Please choose another name!',
      );
    try {
      const newParticipant = {
        name,
        totalScore: 0,
        lastestScore: 0,
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
      const accessToken = await this.jwtService.signAsync({
        code,
        name,
        isHost: false,
      });
      return { accessToken, name, code };
    } catch (error) {
      throw new HttpException(
        error?.message ?? 'Error during join game session',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async leaveGame(code: string, clientName: string) {
    try {
      return await this.gameModel.findOneAndUpdate(
        { code },
        { $pull: { participants: { name: clientName } } },
      );
    } catch (error) {
      throw new HttpException(
        error?.message ?? 'Error during leave game session',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async startGame(gameStartDto: GameStartCreateDto) {
    const { code } = gameStartDto;
    const game: Game = await this.findByCode(code);
    await this.updateStartDatetime(game._id);
    this.eventEmitter.emit(GAME_EVENTS.EVENT_EMITTER.START, game);
  }

  // async updateRanking(data: GameRankingDto) {
  //   const updateParticipantData = data.participants.reduce((result, participant) => result[participant.name] = participant.score,{});
  //   await this.gameModel.findOne({code: data.code}).select('participants').updateMany({name: {$in :{}}  })
  //   const game = await this.gameModel.findOneAndUpdate({code: data.code, 'participants.name': }, {
  //   })
  // }

  async submitAnswer(code, participantName, gameAnswerDto: GameAnswerDto) {
    const game = await this.findByCode(code);
    try {
      const question = game.questionList.questionList.find(
        (item) => item._id.toString() === gameAnswerDto.questionId,
      );
      if (question.answerId == gameAnswerDto.answerId) {
        const timeLimitInMilisecond = getTimeLimitInSecond(question.timeLimit);
        const score = Math.floor(
          question.score *
            (1 - gameAnswerDto.responeTimestamp / (2 * timeLimitInMilisecond)),
        );
        const updateGame: Game = await this.gameModel.findOneAndUpdate(
          {
            code,
            'participants.name': participantName,
          },
          {
            $inc: { 'participants.$.totalScore': score },
            $set: { 'participants.$.lastestScore': score },
          },
          { new: true },
        );
        return updateGame;
      }
    } catch (error) {
      throw new HttpException(
        error?.message ?? 'Unexpected error when checking answer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByCode(code: string): Promise<Game> {
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

  async updateEndDatetime(id: string) {
    await this.gameModel.findByIdAndUpdate(id, { endDatetime: now() });
  }
}
