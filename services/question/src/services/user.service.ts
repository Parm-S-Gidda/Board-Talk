import db from "../configs/db.config";
import { PostQuestionRequest } from "../middlewares/validator.requests";
import { questions } from "../schema/schema";
import { v4 as uuidv4 } from "uuid";

export const getQuestionsService = async () => {
  let res = null;

  try {
    res = await db.select().from(questions);
  } catch (error) {
    console.log(error);
    return res;
  }

  return res;
};

export const createQuestionService = async (request: PostQuestionRequest) => {
  const { title, content, user_id } = request;

  let question = null;

  try {
    question = db
      .insert(questions)
      .values({
        title,
        content,
        user_id,
        question_id: uuidv4(),
        createdAt: new Date(),
      })
      .returning();
  } catch (error) {
    console.log(error);
  }

  return question;
};
