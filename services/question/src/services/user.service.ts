import { Datastore } from "@google-cloud/datastore";
import { PostQuestionRequest } from "../middlewares/validator.requests";
import { v4 as uuidv4 } from "uuid";

const datastore = new Datastore({
  databaseId: "multi-region",
});

export const getQuestionsService = async () => {
  const query = datastore.createQuery("question");

  try {
    const [questions] = await datastore.runQuery(query);

    return questions;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createQuestionService = async (request: PostQuestionRequest) => {
  const { title, content, user_id } = request;

  const question_id = uuidv4();

  const key = datastore.key(["question", question_id]);

  const question = {
    key,
    data: {
      title,
      content,
      user_id,
      question_id,
      createdAt: new Date(),
    },
  };

  try {
    await datastore.save(question);
    return question.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
