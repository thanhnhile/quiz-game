"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("@nestjs/jwt");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
class SocketIOAdapter extends platform_socket_io_1.IoAdapter {
    constructor(app, configService) {
        super(app);
        this.app = app;
        this.configService = configService;
    }
    createIOServer(port, options) {
        const clientPort = this.configService.get("CLIENT_PORT");
        const cors = {
            cors: {
                origin: `http://localhost:${clientPort}`,
            },
            transports: ["websocket", "polling"],
        };
        const optionsWithCORS = {
            ...options,
            cors,
        };
        const jwtService = this.app.get(jwt_1.JwtService);
        const server = super.createIOServer(port, optionsWithCORS);
        server.of("/").use(createTokenMiddleware(jwtService));
        return server;
    }
}
const createTokenMiddleware = (jwtService) => {
    return (client, next) => {
        const token = client.handshake.auth.token || client.handshake.headers["token"];
        try {
            if (token) {
                const payload = jwtService.verify(token);
                console.log("PAYLOAD: ", payload);
                client.name = payload.name;
                client.gameCode = payload.code;
                client.isHost = payload.isHost;
            }
            next();
        }
        catch (error) {
            console.log(error);
            next(new Error("FORBIDDEN"));
        }
    };
};
exports.default = SocketIOAdapter;
//# sourceMappingURL=socket-io-adapter.js.map