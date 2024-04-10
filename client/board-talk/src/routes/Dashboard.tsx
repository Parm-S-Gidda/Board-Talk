import { useEffect, useState } from "react";
import QuestionCard from "../component/QuestionCard";
import axios, { AxiosResponse } from "axios";
import {
  GET_QUESTIONS_END_POINT,
  GET_USER_ENDPOINT,
  POST_GUESTION,
} from "../utils/endpoints";
import { useUser } from "../hooks/user";
import { useNavigate } from "react-router-dom";
import { RiSendPlane2Fill } from "react-icons/ri";
import Cookies from "js-cookie";

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

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 1000; // 1 second

function Dashboard() {
  const { user, updateUser } = useUser();

  console.log("token:", Cookies.get("accessToken"));
  const [questions, setQuestions] = useState<QuestionsProcessed[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let currentRetry = 0;
      let success = false;

      while (currentRetry < MAX_RETRIES && !success) {
        try {
          const getUser = async (
            user_id: string
          ): Promise<AxiosResponse<User>> => {
            return axios.get(GET_USER_ENDPOINT, {
              params: {
                user_id,
              },
              timeout: 5000,
              headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
              },
            });
          };

          const getQuestions = async () => {
            const resp: AxiosResponse<Questions> = await axios.get(
              GET_QUESTIONS_END_POINT,
              {
                timeout: 5000,
                headers: {
                  Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
              }
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

          success = true;
        } catch (error) {
          console.log("Error:", error);
          currentRetry++;
          await delay(RETRY_DELAY_MS);
        }
      }

      if (!success) {
        alert("Server is currently unavailable. Please try again later");
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const onWhiteboard = () => {
    navigate("/whiteboard");
  };

  const [question, setQuestion] = useState<string>("");

  const onQuestionPosted = async () => {
    setQuestion("");
    let currentRetry = 0;
    let success = false;

    while (currentRetry < MAX_RETRIES && !success) {
      try {
        const resp: AxiosResponse<QuestionsProcessed> = await axios.post(
          POST_GUESTION,
          {
            user_id: user.user_id,
            title: "",
            content: question,
          },
          {
            timeout: 5000,
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
          }
        );

        setQuestions([
          ...questions,
          {
            question_id: resp.data.question_id,
            content: resp.data.content,
            user: user,
            title: resp.data.title,
            createdAt: resp.data.createdAt,
          },
        ]);

        success = true;
      } catch (error) {
        console.log("Error posting question:", error);
        currentRetry++;
        await delay(RETRY_DELAY_MS);
      }
    }

    if (!success) {
      alert("Server is currently unavailable. Please try again later");
    }
  };

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-9/10 w-full flex flex-col px-32 py-10 gap-y-5 max-h-9/10 overflow-y-auto">
        {questions &&
          questions.map((question) => (
            <QuestionCard key={question.question_id} question={question} />
          ))}
      </div>
      <div className="h-1/10 w-full flex flex-row gap-x-5 bg-white py-1 px-20 items-center shadow-md">
        <input
          placeholder="Question"
          className="bg-gray-200 px-3 h-full w-11/12 rounded-2xl outline-none text-gray-700"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        />
        <div onClick={() => onQuestionPosted()}>
          <RiSendPlane2Fill
            color="#465858"
            size={30}
            className="hover:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
