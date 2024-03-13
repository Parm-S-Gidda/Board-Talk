import { useEffect, useState } from "react";
import QuestionCard from "../component/QuestionCard";
import axios, { AxiosResponse } from "axios";
import { GET_QUESTIONS_END_POINT, GET_USER_ENDPOINT } from "../utils/endpoints";
import { useUser } from "../hooks/user";
import { useNavigate } from "react-router-dom";

type Questions = {
  question_id: string;
  title: string;
  content: string;
  user_id: string;
  createdAt: string;
}[];

export type User = {
  user_id: string;
  email: string;
  name: string;
  createdAt: string;
};

export type QuestionsProcessed = {
  question_id: string;
  title: string;
  content: string;
  user: User;
  createdAt: string;
};

function Dashboard() {
  const { user, updateUser } = useUser();

  console.log(user);
  const [questions, setQuestions] = useState<QuestionsProcessed[] | null>(null);
  useEffect(() => {
    const getUser = async (user_id: string): Promise<AxiosResponse<User>> => {
      return axios.get(GET_USER_ENDPOINT, {
        params: {
          user_id,
        },
      });
    };
    const getQuestions = async () => {
      const resp: AxiosResponse<Questions> = await axios.get(
        GET_QUESTIONS_END_POINT
      );

      const questions = resp.data;

      //console.log(questions);

      const promises: Promise<AxiosResponse<User>>[] = [];

      questions.forEach((question) => {
        promises.push(getUser(question.user_id));
      });

      const responses = await Promise.all(promises);

      let unique: { [key: string]: boolean } = {};

      let users = responses.map((resp) => resp.data);

      users = users.filter((user) => {
        const userKey = JSON.stringify(user);

        let isUnique = !unique[userKey];

        unique[userKey] = true;

        return isUnique;
      });

      const questionsProcessed: QuestionsProcessed[] = [];

      questions.forEach((question) => {
        users.forEach((user) => {
          if (user.user_id == question.user_id) {
            questionsProcessed.push({
              question_id: question.question_id,
              title: question.title,
              content: question.content,
              user: user,
              createdAt: question.createdAt,
            });
          }
        });
      });

      //console.log(questionsProcessed);
      return questionsProcessed;
    };

    getQuestions()
      .then((questions) => setQuestions(questions))
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();
  const onPostQuestion = () => {
    navigate("/question-create");
  };

  const onWhiteboard = () => {
    navigate("/whiteboard");
  };

  return (
    <div className="w-screen h-screen">
      <div className="w-screen h-screen grid grid-cols-4 gap-y-7 p-10">
        {questions &&
          questions.map((question) => <QuestionCard question={question} />)}
      </div>

      <div className="fixed bottom-20 right-20 flex gap-x-10">
        <button
          className="bg-gray-700 w-40 h-16 rounded-3xl shadow-2xl text-white"
          onClick={onWhiteboard}
        >
          Start a whiteboard
        </button>
        <button
          className="bg-gray-700 w-36 h-16 rounded-3xl shadow-2xl text-white"
          onClick={onPostQuestion}
        >
          Post question
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
