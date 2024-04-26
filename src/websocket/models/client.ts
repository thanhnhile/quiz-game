import { Socket } from "socket.io";

class Client extends Socket {
  gameCode: string;
  name: string;
  isHost: boolean;
  lastestScore: number;
}

export default Client;
