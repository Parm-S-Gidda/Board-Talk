import { eq } from "drizzle-orm";
import {
  GetAnswerRequest,
  PostAnswerRequest,
} from "../middlewares/validator.requests";
import { answers } from "../schema/schema";
import { v4 as uuidv4 } from "uuid";
import { Datastore, PropertyFilter } from "@google-cloud/datastore";

const datastore = new Datastore();

export const getAnswersService = async (request: GetAnswerRequest) => {
  const { question_id } = request;

  const query = datastore
    .createQuery("answer")
    .filter(new PropertyFilter("question_id", "=", question_id));

  try {
    const [answers] = await datastore.runQuery(query);
    return answers;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createAnswerService = async (request: PostAnswerRequest) => {
  const { user_id, question_id, content } = request;

  const answer_id = uuidv4();

  const key = datastore.key(["answer", answer_id]);

  const answer = {
    key,
    data: {
      answer_id,
      author_id: user_id,
      content,
      question_id,
      createdAt: new Date(),
    },
  };

  try {
    await datastore.save(answer);
    return answer.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
