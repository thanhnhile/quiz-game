"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewaySessionManager = void 0;
const common_1 = require("@nestjs/common");
const game_session_1 = require("../websocket/models/game.session");
let GatewaySessionManager = class GatewaySessionManager {
    constructor() {
        this.sessions = new Map();
    }
    getSession(code) {
        const session = this.sessions.get(code);
        if (session)
            return session;
        console.log('Game session is end or not exist');
    }
    joinGameSession(code, client) {
        const session = this.getSession(code);
        session.addClient(client);
    }
    addSession(code) {
        const newSesstion = new game_session_1.default(code);
        this.sessions.set(code, newSesstion);
    }
    removeSesstion(code) {
        const session = this.getSession(code);
        this.sessions.delete(code);
    }
    leaveGameSession(code, clientId) {
        const game = this.getSession(code);
        game.removeClient(clientId);
    }
};
exports.GatewaySessionManager = GatewaySessionManager;
exports.GatewaySessionManager = GatewaySessionManager = __decorate([
    (0, common_1.Injectable)()
], GatewaySessionManager);
//# sourceMappingURL=gateway.session.js.map