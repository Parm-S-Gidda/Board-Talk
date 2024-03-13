import { z } from "zod";
import { NextFunction, Request, Response } from "express";

const getAnswersSchema = z.object({
  question_id: z.string({
    required_error: "question_id has bad value",
  }),
});

const postQuestionSchema = z.object({
  user_id: z.string({
    required_error: "user_id has bad value",
  }),

  content: z.string({
    required_error: "content has bad value",
  }),

  title: z.string({
    required_error: "title has bad value",
  }),
});

const postAnswerSchema = z.object({
  user_id: z.string({
    required_error: "user_id has bad value",
  }),
  question_id: z.string({
    required_error: "question_id has bad value",
  }),
  content: z.string({
    required_error: "content has bad value",
  }),
});

export const validateGetAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getAnswersSchema.parseAsync(req.body);
  } catch (error) {
    res.status(400).json(error);
    return;
  }
  next();
};

export const validatePostQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await postQuestionSchema.parseAsync(req.body);
  } catch (error) {
    res.status(400).json(error);
    return;
  }

  next();
};

export const validatePostAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await postAnswerSchema.parseAsync(req.body);
  } catch (error) {
    res.status(400).json(error);
    return;
  }

  next();
};

export type GetAnswerRequest = z.infer<typeof getAnswersSchema>;
export type PostQuestionRequest = z.infer<typeof postQuestionSchema>;
export type PostAnswerRequest = z.infer<typeof postAnswerSchema>;
