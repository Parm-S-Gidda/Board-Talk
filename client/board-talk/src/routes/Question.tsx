import {
  Location,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { QuestionsProcessed, User } from "./Dashboard";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import {
  GET_ANSWERS,
  GET_USER_ENDPOINT,
  POST_ANSWER,
} from "../utils/endpoints";
import { useUser } from "../hooks/user";
import QuestionCard from "../component/QuestionCard";
import AnswerCard from "../component/AnswerCard";
import { RiSendPlane2Fill } from "react-icons/ri";

type Answer = {
  answer_id: string;
  content: string;
  question_id: string;
  author_id: string;
  createdAt: string;
};

export type AnswerProcessed = {
  answer_id: string;
  content: string;
  question_id: string;
  author: User;
  createdAt: string;
};
function Question() {
  const location: Location<QuestionsProcessed> = useLocation();

  const [answers, setAnswers] = useState<AnswerProcessed[] | null>(null);
  const [postAnswer, setPostAnswer] = useState<string>("");
  const { user } = useUser();

  const MAX_RETRIES = 5;
  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const RETRY_DELAY_MS = 1000;

  useEffect(() => {
    const fetchData = async () => {
      let currentRetry = 0;
      let success = false;

      while (currentRetry < MAX_RETRIES && !success) {
        try {
          const response = await axios.get(GET_ANSWERS, {
            params: {
              question_id: location.state.question_id,
            },
            timeout: 5000
          });

          // Process response data and update state
          const getUser = async (
            user_id: string
          ): Promise<AxiosResponse<User>> => {
            return axios.get(GET_USER_ENDPOINT, {
              params: {
                user_id,
              },
            });
          };

          const answers: Answer[] = response.data;

          const promises: Promise<AxiosResponse<User>>[] = [];

          answers.forEach((answer) => {
            promises.push(getUser(answer.author_id));
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

          const answerProcessed: AnswerProcessed[] = [];

          answers.forEach((answer) => {
            users.forEach((user) => {
              if (user.user_id === answer.author_id) {
                answerProcessed.push({
                  answer_id: answer.answer_id,
                  author: user,
                  content: answer.content,
                  createdAt: answer.createdAt,
                  question_id: answer.question_id,
                });
              }
            });
          });

          setAnswers(answerProcessed);
          success = true; // Set success to true if request is successful
        } catch (error) {
          console.log(error);
          currentRetry++; // Increment retry count on error
          await delay(RETRY_DELAY_MS)
        }
      }

      if (!success) {
        alert('Server is currently unavailable. Please try again later');
      }
    };

    fetchData();
  }, [location.state.question_id]);

  const onPost = async () => {
    let currentRetry = 0;
    let success = false;
    let newAnswers: AnswerProcessed[] = []; // Store new answers to batch update state

    while (currentRetry < MAX_RETRIES && !success) {
      try {
        const response = await axios.post(POST_ANSWER, {
          user_id: user.user_id,
          question_id: location.state.question_id,
          content: postAnswer,
        }, {
          timeout: 5000,
        });

        // Request was successful
        success = true;
        const answer: AnswerProcessed = response.data;

        newAnswers.push({ // Store new answer in the batch
          answer_id: answer.answer_id,
          content: answer.content,
          question_id: answer.question_id,
          author: user,
          createdAt: answer.createdAt,
        });

        setPostAnswer("");
      } catch (error) {
        console.log(error);
        currentRetry++;
        newAnswers = [];
        await delay(RETRY_DELAY_MS)
      }
    }

    if (!success) {
      alert('Server is currently unavailable. Please try again later');
    }

    if (newAnswers.length > 0) {
      setAnswers(prevAnswers => prevAnswers ? [...prevAnswers, ...newAnswers] : newAnswers);
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-9/10 w-full flex flex-col px-32 py-10 gap-y-5 overflow-y-auto">
        <QuestionCard question={location.state} />
        {answers && answers.map((answer) => <AnswerCard key={answer.answer_id} answer={answer} />)}
      </div>
      <div className="h-1/10 w-full flex flex-row gap-x-5 bg-white py-1 px-20 items-center">
        <input
          placeholder="Answer"
          className="bg-gray-200 px-3 h-full w-11/12 rounded-2xl outline-none"
          onChange={(e) => setPostAnswer(e.target.value)}
          value={postAnswer}
        />
        <div onClick={onPost}>
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

export default Question;