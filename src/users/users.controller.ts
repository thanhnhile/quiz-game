import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() dto: User): Promise<User> {
    return this.userService.create(dto);
  }
}
