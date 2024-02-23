import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { QuestionProviders } from './questions.schema';

@Module({
  providers: [QuestionsService, ...QuestionProviders],
  controllers: [QuestionsController]
})
export class QuestionsModule {}
