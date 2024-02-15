import { Controller, Get, Post } from '@nestjs/common';
//import { AppService } from './app.service';
import { log } from 'console';

@Controller()
export class AppController {
  @Get()
  async getHello(): Promise<any> {
    console.log('hello');
  }

  // @Post()
  // async create() {
  //   await this.appService.setData('quizzes', 'hello world!');
  //   log('Wring to db');
  // }
}
