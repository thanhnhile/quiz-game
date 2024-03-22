"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesModule = void 0;
const common_1 = require("@nestjs/common");
const games_service_1 = require("./games.service");
const game_schema_1 = require("./game.schema");
const games_controller_1 = require("./games.controller");
const event_emitter_1 = require("@nestjs/event-emitter");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const events_getway_1 = require("./events.getway");
const constants_1 = require("../utils/constants");
const gateway_session_1 = require("./gateway.session");
let GamesModule = class GamesModule {
};
exports.GamesModule = GamesModule;
exports.GamesModule = GamesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_emitter_1.EventEmitterModule.forRoot(),
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get('JWT_SECRET'),
                    global: true,
                }),
            }),
        ],
        providers: [
            games_service_1.GamesService,
            ...game_schema_1.GameProviders,
            events_getway_1.EventGetway,
            {
                provide: constants_1.SERVICES.GATEWAY_SESSION_MANAGER,
                useClass: gateway_session_1.GatewaySessionManager,
            },
        ],
        controllers: [games_controller_1.GamesController],
        exports: [games_service_1.GamesService, ...game_schema_1.GameProviders, events_getway_1.EventGetway],
    })
], GamesModule);
//# sourceMappingURL=games.module.js.map