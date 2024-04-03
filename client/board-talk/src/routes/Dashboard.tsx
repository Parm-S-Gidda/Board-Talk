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
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuestionsProcessed[]>([]);
  const [question, setQuestion] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      let currentRetry = 0;
      let success = false;

      while (currentRetry < MAX_RETRIES && !success) {
        try {
          const response = await axios.get(GET_QUESTIONS_END_POINT, {
            timeout: 5000, // Timeout for the request
          });

          const questionsData: Questions = response.data;

          const promises: Promise<AxiosResponse<User>>[] = [];

          questionsData.forEach((question) => {
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

          questionsData.forEach((question) => {
            users.forEach((user) => {
              if (user.user_id === question.user_id) {
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

          setQuestions(questionsProcessed);
          success = true;
        } catch (error) {
          console.log("Error fetching questions:", error);
          currentRetry++;
          await delay(RETRY_DELAY_MS);
        }
      }
    };

    fetchData();
  }, []);

  const getUser = async (user_id: string): Promise<AxiosResponse<User>> => {
    let currentRetry = 0;

    while (currentRetry < MAX_RETRIES) {
      try {
        const response = await axios.get(GET_USER_ENDPOINT, {
          params: { user_id },
          timeout: 1000, // Timeout set to 1 second
        });

        return response; // Return response if successful
      } catch (error) {
        console.log(`Error fetching user data for user ID ${user_id}:`, error);
        currentRetry++; // Increment retry count on error
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second pause before retrying
      }
    }

    throw new Error(`Failed to fetch user data for user ID ${user_id} after ${MAX_RETRIES} retries`);
  };

  const onQuestionPosted = async () => {
    let currentRetry = 0;
    let success = false;

    while (currentRetry < MAX_RETRIES && !success) {
      try {
        const response: AxiosResponse<QuestionsProcessed> = await axios.post(
          POST_GUESTION,
          {
            user_id: user.user_id,
            title: "",
            content: question,
          },
          {
            timeout: 5000, // Timeout for the request
          }
        );

        const newQuestion: QuestionsProcessed = response.data;
        setQuestions([...questions, newQuestion]);
        success = true;
      } catch (error) {
        console.log("Error posting question:", error);
        currentRetry++;
        await delay(RETRY_DELAY_MS);
      }
    }

    if (!success) {
      alert("Server is currently unavailable. Please try again later")
    }
  };

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const onWhiteboard = () => {
    navigate("/whiteboard");
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-9/10 w-full flex flex-col px-32 py-10 gap-y-5 overflow-y-auto">
        {questions &&
          questions.map((question) => (
            <QuestionCard key={question.question_id} question={question} />
          ))}
      </div>
      <div className="h-1/10 w-full flex flex-row gap-x-5 bg-white py-1 px-20 items-center">
        <input
          placeholder="Question"
          className="bg-gray-200 px-3 h-full w-11/12 rounded-2xl outline-none"
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
