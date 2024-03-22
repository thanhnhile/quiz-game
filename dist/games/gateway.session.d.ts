import Client from '../websocket/models/client';
import GameSession from '../websocket/models/game.session';
export interface IGatewaySessionManager {
    getSession(code: string): any;
    addSession(code: string): any;
    removeSesstion(code: string): any;
    joinGameSession(code: string, client: Client): any;
    leaveGameSession(code: string, clientId: string): any;
}
export declare class GatewaySessionManager implements IGatewaySessionManager {
    private readonly sessions;
    getSession(code: string): GameSession;
    joinGameSession(code: string, client: Client): void;
    addSession(code: string): void;
    removeSesstion(code: string): void;
    leaveGameSession(code: string, clientId: string): void;
}
