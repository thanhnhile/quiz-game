"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameSession {
    constructor(code) {
        this.getCode = () => this.code;
        this.getNumberOfClients = () => this.clients.size;
        this.code = code;
        this.clients = new Map();
    }
    addClient(client) {
        this.clients.set(client.id, client);
    }
    removeClient(clientId) {
        this.clients.delete(clientId);
    }
    updateCurrentIndex() {
        this.currentIndex =
            this.currentIndex === undefined ? 0 : this.currentIndex + 1;
        console.log(this.currentIndex);
        this.startEvent.emitEvent(this.currentIndex);
    }
}
exports.default = GameSession;
//# sourceMappingURL=game.session.js.map