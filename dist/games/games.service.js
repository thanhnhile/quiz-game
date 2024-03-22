"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const mongoose_1 = require("mongoose");
const events_1 = require("../utils/events");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../utils/constants");
let GamesService = class GamesService {
    constructor(eventEmitter, gameModel, jwtService) {
        this.eventEmitter = eventEmitter;
        this.gameModel = gameModel;
        this.jwtService = jwtService;
    }
    generateCode() {
        const min = 100000;
        const max = 999999;
        return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    }
    async createNewGameSession(gameCreateDto) {
        const code = this.generateCode();
        this.eventEmitter.emit(events_1.GAME_EVENTS.EVENT_EMITTER.NEW_GAME_CREATED, code);
        const model = new this.gameModel({
            code,
            questionList: new mongoose_1.default.Types.ObjectId(gameCreateDto.questionListId),
            participants: [],
        });
        const newGame = await model.save();
        const payload = {
            code,
            isHost: true,
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return { accessToken, code };
    }
    async joinGame(gameJoinCreateDto) {
        const { name, code } = gameJoinCreateDto;
        try {
            const newParticipant = {
                name,
                score: 0,
            };
            await this.gameModel.findOneAndUpdate({ code }, { $push: { participants: newParticipant } });
            const newJoinData = {
                newParticipant,
                code,
            };
            this.eventEmitter.emit(events_1.GAME_EVENTS.EVENT_EMITTER.NEW_JOIN_CREATED, newJoinData);
            const accessToken = await this.jwtService.signAsync({
                code,
                name,
                isHost: false,
            });
            return { accessToken, name, code };
        }
        catch (error) {
            throw error;
        }
    }
    async startGame(gameStartDto) {
        const { code } = gameStartDto;
        const game = await this.findByCode(code);
        await this.updateStartDatetime(game._id);
        this.eventEmitter.emit(events_1.GAME_EVENTS.EVENT_EMITTER.START, game);
    }
    async submitAnswer(code, participantName, gameAnswerDto) {
        const game = await this.findByCode(code);
        const question = game.questionList.questionList.find((item) => item._id.toString() === gameAnswerDto.questionId);
        if (question.answerId == gameAnswerDto.answerId) {
            const timeLimitInMilisecond = (0, constants_1.getTimeLimitInSecond)(question.timeLimit);
            const score = Math.floor(question.score *
                (1 - gameAnswerDto.responeTimestamp / (2 * timeLimitInMilisecond)));
            const updateGame = await this.gameModel.findOneAndUpdate({
                code,
                "participants.name": participantName,
            }, {
                $inc: { "participants.$.score": score },
            }, { new: true });
            console.log("UPDATED GAME: ", updateGame);
        }
    }
    async findByCode(code) {
        const game = await this.gameModel
            .findOne({ code })
            .populate("questionList")
            .exec();
        if (game) {
            return game;
        }
        throw new common_1.NotFoundException("Game code does not exist");
    }
    async getGameParticipants(code) {
        const game = await this.gameModel
            .findOne({ code })
            .select("participants")
            .exec();
        if (game) {
            return game.participants;
        }
        throw new common_1.NotFoundException("Game code does not exist");
    }
    async updateStartDatetime(id) {
        await this.gameModel.findByIdAndUpdate(id, { startDatetime: (0, mongoose_1.now)() });
    }
};
exports.GamesService = GamesService;
exports.GamesService = GamesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)("GAME_MODEL")),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        mongoose_1.Model,
        jwt_1.JwtService])
], GamesService);
//# sourceMappingURL=games.service.js.map