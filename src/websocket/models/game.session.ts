import Client from "./client";

class GameSession {
  private code: string;
  private clients: Map<string, Client>;

  constructor(code: string) {
    this.code = code;
    this.clients = new Map();
  }

  getCode = () => this.code;

  getClients = () => this.clients.values;

  addClient(client: Client) {
    this.clients.set(client.id, client);
    client.join(this.code);
  }

  removeClient(client: Client) {
    client.leave(this.code);
  }
}

export default GameSession;
