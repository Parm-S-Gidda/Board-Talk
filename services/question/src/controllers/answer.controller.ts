import { Request, Response } from "express";
import {
  GetAnswerRequest,
  PostAnswerRequest,
} from "../middlewares/validator.requests";
import {
  createAnswerService,
  getAnswersService,
} from "../services/answer.service";

export const getAnswers = async (req: Request, res: Response) => {
  const question_id = req.query.question_id as string;
  const request: GetAnswerRequest = {
    question_id: question_id,
  };

  const answers = await getAnswersService(request);

  if (answers) {
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).json(answers);
  } else {
    res.status(400).json({
      error: "Please check your arguments",
    });
  }
};

export const createAnswer = async (req: Request, res: Response) => {
  const request: PostAnswerRequest = {
    content: req.body.content,
    question_id: req.body.question_id,
    user_id: req.body.user_id,
  };

  const answer = await createAnswerService(request);

  if (answer) {
    res.status(201).json(answer);
  } else {
    res.status(400).json({
      error: "Please check your arguments",
    });
  }
};
