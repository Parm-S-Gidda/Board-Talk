import { eq } from "drizzle-orm";
import db from "../configs/db.config";
import {
  GetAnswerRequest,
  PostAnswerRequest,
} from "../middlewares/validator.requests";
import { answers } from "../schema/schema";
import { v4 as uuidv4 } from "uuid";

export const getAnswersService = async (request: GetAnswerRequest) => {
  const { question_id } = request;

  let res = null;

  try {
    res = await db
      .select()
      .from(answers)
      .where(eq(answers.question_id, question_id));
  } catch (error) {
    console.log(error);
    return res;
  }

  return res;
};

export const createAnswerService = async (request: PostAnswerRequest) => {
  const { user_id, question_id, content } = request;

  let answer = null;

  try {
    answer = await db
      .insert(answers)
      .values({
        answer_id: uuidv4(),
        author_id: user_id,
        content,
        question_id,
        createdAt: new Date(),
      })
      .returning();
  } catch (error) {
    console.log(error);
  }

  return answer;
};
