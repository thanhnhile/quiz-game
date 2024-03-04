import Client from "./client";

class GameSession {
  private code: string;
  private clients: Map<string, Client>;

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
}

export default GameSession;
