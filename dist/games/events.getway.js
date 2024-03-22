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
exports.EventGetway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const constants_1 = require("../utils/constants");
const client_1 = require("../websocket/models/client");
const socket_io_1 = require("socket.io");
const event_emitter_1 = require("@nestjs/event-emitter");
const events_1 = require("../utils/events");
const games_service_1 = require("./games.service");
const startgame_event_1 = require("./events/startgame.event");
let EventGetway = class EventGetway {
    constructor(sessionManager, gameService) {
        this.sessionManager = sessionManager;
        this.gameService = gameService;
    }
    handleDisconnect(client) {
        console.log("Disonnected from ", { id: client.id });
        if (client.gameCode) {
            this.sessionManager.leaveGameSession(client.gameCode, client.id);
            client.leave(client.gameCode);
            this.io
                .to(client.gameCode)
                .emit(events_1.GAME_EVENTS.LEAVE, { clientId: client.id });
            console.log(`Client ${client.id} has leave game ${client.gameCode}`);
        }
    }
    handleConnection(client, ...args) {
        console.log("Connected from ", { id: client.id });
        if (client.gameCode) {
            this.sessionManager.joinGameSession(client.gameCode, client);
            client.join(client.gameCode);
            console.log(`Client ${client.id} has join game ${client.gameCode}`);
        }
    }
    async handleNewJoinGame(newJoinData) {
        const { code, newParticipant } = newJoinData;
        this.io.to(code).emit(events_1.GAME_EVENTS.NEW_JOIN, newParticipant);
    }
    handleNewGame(code) {
        this.sessionManager.addSession(code);
    }
    handleReceiveAnswer(answerDto, client) {
        !client.isHost &&
            this.gameService.submitAnswer(client.gameCode, client.name, answerDto);
    }
    async sendRankingBoard(code, hasNextQuestion) {
        const currentParticipants = await this.gameService.getGameParticipants(code);
        const sortedData = currentParticipants.sort((a, b) => b.score - a.score);
        const rankingData = {
            hasNextQuestion,
            top3: sortedData.slice(0, 2),
            others: sortedData.slice(3),
        };
        this.io.to(code).emit(events_1.GAME_EVENTS.UPDATE_RANKING, rankingData);
    }
    async handleStartGame(gameModel) {
        const { code } = gameModel;
        console.log(gameModel);
        const gameSession = this.sessionManager.getSession(code);
        if (gameSession.getNumberOfClients() > 0) {
            this.io.to(code).emit(events_1.GAME_EVENTS.START);
            gameSession.startEvent = new startgame_event_1.StartGame(this.io.to(code), gameModel.questionList.questionList, async (hasNextQuestion) => await this.sendRankingBoard(code, hasNextQuestion));
            this.countDown(code, 5, () => {
                gameSession.updateCurrentIndex();
            });
        }
    }
    handleNextQuestion(client) {
        if (client.isHost) {
            const gameSession = this.sessionManager.getSession(client.gameCode);
            gameSession.updateCurrentIndex();
        }
        else {
            throw new common_1.UnauthorizedException("Need host permission");
        }
    }
    countDown(code, second, afterCb) {
        if (second == 0) {
            afterCb();
        }
        else {
            this.io.to(code).emit(events_1.GAME_EVENTS.GAME_STARTING, second);
            setTimeout(() => {
                this.countDown(code, second - 1, afterCb);
            }, 1000);
        }
    }
};
exports.EventGetway = EventGetway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventGetway.prototype, "io", void 0);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.GAME_EVENTS.EVENT_EMITTER.NEW_JOIN_CREATED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventGetway.prototype, "handleNewJoinGame", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.GAME_EVENTS.EVENT_EMITTER.NEW_GAME_CREATED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventGetway.prototype, "handleNewGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_1.GAME_EVENTS.RECEIVE_ANSWER),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, client_1.default]),
    __metadata("design:returntype", void 0)
], EventGetway.prototype, "handleReceiveAnswer", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.GAME_EVENTS.EVENT_EMITTER.START),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventGetway.prototype, "handleStartGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(events_1.GAME_EVENTS.NEXT_QUESTION),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_1.default]),
    __metadata("design:returntype", void 0)
], EventGetway.prototype, "handleNextQuestion", null);
exports.EventGetway = EventGetway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __param(0, (0, common_1.Inject)(constants_1.SERVICES.GATEWAY_SESSION_MANAGER)),
    __metadata("design:paramtypes", [Object, games_service_1.GamesService])
], EventGetway);
//# sourceMappingURL=events.getway.js.map