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
exports.GamesController = void 0;
const common_1 = require("@nestjs/common");
const games_service_1 = require("./games.service");
let GamesController = class GamesController {
    constructor(gameService) {
        this.gameService = gameService;
    }
    createNewGameSession(gameCreateDto) {
        return this.gameService.createNewGameSession(gameCreateDto);
    }
    joinGame(gameJoinDto) {
        return this.gameService.joinGame(gameJoinDto);
    }
    startGame(gameStartDto) {
        return this.gameService.startGame(gameStartDto);
    }
    getParticipants(code) {
        return this.gameService.getGameParticipants(code);
    }
};
exports.GamesController = GamesController;
__decorate([
    (0, common_1.Post)('games'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "createNewGameSession", null);
__decorate([
    (0, common_1.Post)('game/join'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "joinGame", null);
__decorate([
    (0, common_1.Post)('game/start'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "startGame", null);
__decorate([
    (0, common_1.Get)('game/:code/participants'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "getParticipants", null);
exports.GamesController = GamesController = __decorate([
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [games_service_1.GamesService])
], GamesController);
//# sourceMappingURL=games.controller.js.map