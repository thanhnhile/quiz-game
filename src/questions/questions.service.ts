import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { QuestionList } from "./questions.interface";
import { Model } from "mongoose";

@Injectable()
export class QuestionsService {
  constructor(
    @Inject("QUESTINON_LIST_MODEL")
    private questionlistModel: Model<QuestionList>
  ) {}

  async createQuestionList(list: QuestionList) {
    try {
      const created = new this.questionlistModel(list);
      return await created.save();
    } catch (e) {
      console.log(e);
    }
  }

  async getById(id: string): Promise<QuestionList> {
    try {
      const questionList = await this.questionlistModel.findById(id);
      return questionList;
    } catch (e) {
      throw new NotFoundException("Question list does not exist");
    }
  }
}
