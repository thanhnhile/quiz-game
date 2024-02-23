import { Body, Controller, Param, Post, Get } from "@nestjs/common";
import { QuestionList } from "./questions.interface";
import { QuestionsService } from "./questions.service";

@Controller("questions")
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @Get("/:id")
  getById(@Param("id") id: string) {
    return this.questionService.getById(id);
  }

  @Post()
  createQuestionList(@Body() list: QuestionList) {
    return this.questionService.createQuestionList(list);
  }
}
