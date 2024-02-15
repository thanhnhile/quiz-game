import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private catModel: Model<User>) {}

  async create(dto: User): Promise<User> {
    const createdUser = new this.catModel(dto);
    return createdUser.save();
  }
}
