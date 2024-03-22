"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const console_1 = require("console");
const common_1 = require("@nestjs/common");
const socket_io_adapter_1 = require("./socket-io-adapter");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, console_1.log)('App is running on ', process.env.PORT);
    app.enableCors({
        origin: `http://localhost:${process.env.CLIENT_PORT}`,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const configService = app.get(config_1.ConfigService);
    app.useWebSocketAdapter(new socket_io_adapter_1.default(app, configService));
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map