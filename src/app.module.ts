import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./users/users.module";
import { WebsocketModule } from "./websocket/websocket.module";
import { QuestionsModule } from "./questions/questions.module";
import { GamesModule } from "./games/games.module";
const ENV_PATH = ".development.env";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ENV_PATH,
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    WebsocketModule,
    QuestionsModule,
    GamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
