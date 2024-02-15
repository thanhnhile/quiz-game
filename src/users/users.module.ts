import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './user.schema';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, ...usersProviders],
  controllers: [UsersController],
})
export class UsersModule {}
