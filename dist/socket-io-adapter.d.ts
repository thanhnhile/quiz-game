import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server } from "socket.io";
declare class SocketIOAdapter extends IoAdapter {
    private app;
    private configService;
    constructor(app: INestApplication, configService: ConfigService);
    createIOServer(port: number, options?: any): Server<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
}
export default SocketIOAdapter;
