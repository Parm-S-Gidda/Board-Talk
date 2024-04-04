import { Request, Response } from "express";
import { PostQuestionRequest } from "../middlewares/validator.requests";
import {
  createQuestionService,
  getQuestionsService,
} from "../services/user.service";

export const getQuestions = async (req: Request, res: Response) => {
  const questions = await getQuestionsService();

  if (questions) {
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).json(questions);
  } else {
    res.status(400).json({
      error: "Bad payload",
    });
  }
};

export const createQuestion = async (req: Request, res: Response) => {
  const questionRequest: PostQuestionRequest = {
    content: req.body.content,
    title: req.body.title,
    user_id: req.body.user_id,
  };

  const question = await createQuestionService(questionRequest);

  if (question) {
    res.status(201).json(question);
  } else {
    res.status(400).json({
      error: "Bad payload",
    });
  }
};
