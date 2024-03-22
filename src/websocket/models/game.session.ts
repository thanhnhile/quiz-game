import Client from "./client";
import { StartGame } from "src/games/events/startgame.event";

class GameSession {
  private code: string;
  private clients: Map<string, Client>;
  private currentIndex: number;
  startEvent: StartGame;

  constructor(code: string) {
    this.code = code;
    this.clients = new Map();
  }

  getCode = () => this.code;

  getNumberOfClients = () => this.clients.size;

  addClient(client: Client) {
    this.clients.set(client.id, client);
  }

  removeClient(clientId: string) {
    this.clients.delete(clientId);
  }

  updateCurrentIndex() {
    this.currentIndex =
      this.currentIndex === undefined ? 0 : this.currentIndex + 1;
    console.log(this.currentIndex);
    this.startEvent.emitEvent(this.currentIndex);
  }
}

export default GameSession;
