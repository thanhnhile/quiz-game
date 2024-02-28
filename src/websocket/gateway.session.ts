import { Injectable, NotFoundException } from "@nestjs/common";
// import { GameSession } from "./models/gameSession";
import { Namespace, Server } from "socket.io";
import Client from "./models/client";
import { StartGame } from "./events/startgame.event";
import { GAME_EVENTS } from "src/utils/events";
import { GamesService } from "src/games/games.service";
import { Game } from "src/games/game.interface";
import GameSession from "./models/game.session";

export interface IGatewaySessionManager {
  getSession(code: string);

  addSession(code: string);

    removeSesstion(code: string);

    joinGameSession(code: string, client: Client);

    leaveGameSession(code: string, clientId: string);
}

@Injectable()
export class GatewaySessionManager implements IGatewaySessionManager {
  private readonly sessions: Map<string, GameSession> = new Map();

  constructor(private gameService: GamesService) {}

  getSession(code: string) {
    const session = this.sessions.get(code);
    if (session) return session;
    console.log("Game session is end or not exist");
  }

  joinGameSession(code: string, client: Client) {
    const session = this.getSession(code);
    session.addClient(client);
  }

  addSession(code: string) {
    const newSesstion = new GameSession(code);
    this.sessions.set(code, newSesstion);
  }
   removeSesstion(code: string) {
      const session = this.getSession(code);
      this.sessions.delete(code);

    leaveGameSession(code: string, clientId: string) {
      const game = this.getSession(code);
      game.removeClient(clientId);
    }
}
