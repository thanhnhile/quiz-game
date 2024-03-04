import { Socket } from "socket.io";

class Client extends Socket {
  gameCode: string;
  name: string;
}

export default Client;
