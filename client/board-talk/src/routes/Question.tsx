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

type Answer = {
  answer_id: string;
  content: string;
  question_id: string;
  author_id: string;
  createdAt: string;
};

type AnswerProcessed = {
  answer_id: string;
  content: string;
  question_id: string;
  author: User;
  createdAt: string;
};
function Question() {
  const location: Location<QuestionsProcessed> = useLocation();

  const [answers, setAnswers] = useState<AnswerProcessed[] | null>(null);

  useEffect(() => {
    //console.log("location:", location.state);
    axios
      .get(GET_ANSWERS, {
        params: {
          question_id: location.state.question_id,
        },
      })
      .then(async (resp: AxiosResponse<Answer[]>) => {
        const getUser = async (
          user_id: string
        ): Promise<AxiosResponse<User>> => {
          return axios.get(GET_USER_ENDPOINT, {
            params: {
              user_id,
            },
          });
        };

        const answers = resp.data;

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
            if ((user.user_id = answer.author_id)) {
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
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const [postAnswer, setPostAnswer] = useState<string>("");

  const { user, updateUser } = useUser();

  const navigate = useNavigate();

  const onPost = () => {
    axios
      .post(POST_ANSWER, {
        user_id: user.user_id,
        question_id: location.state.question_id,
        content: postAnswer,
      })
      .then((resp) => {
        const answer: AnswerProcessed = resp.data[0];

        if (answers) {
          setAnswers([
            ...answers,
            {
              answer_id: answer.answer_id,
              content: answer.content,
              question_id: answer.question_id,
              author: user,
              createdAt: answer.createdAt,
            },
          ]);
        } else {
          setAnswers([
            {
              answer_id: answer.answer_id,
              content: answer.content,
              question_id: answer.question_id,
              author: user,
              createdAt: answer.createdAt,
            },
          ]);
        }

        setPostAnswer("");
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center gap-y-14">
      <div className="flex h-20 rounded-2xl bg-gray-200  mt-16 flex-row w-3/5 justify-center items-center gap-x-4 shadow-lg ">
        <input
          className="w-full p-5 outline-none focus:outline-none bg-gray-200"
          type="text"
          placeholder="Leave an answer...."
          value={postAnswer}
          onChange={(e) => setPostAnswer(e.target.value)}
        ></input>

        <button
          className="bg-gray-700 rounded-full m-5 text-gray-50 w-20"
          onClick={onPost}
        >
          Post
        </button>
      </div>

      <div className="w-3/5 h-1/4 flex flex-col rounded-2xl gap-y-5 bg-gray-200 p-5 shadow-lg">
        <span>Question by {location.state.user.name}</span>
        <span className="text-ellipsis overflow-hidden">
          {location.state.content}
        </span>
      </div>
      {answers &&
        answers.map((answer) => (
          <div className="w-3/5 h-1/4 flex flex-col rounded-2xl gap-y-5 bg-gray-200 p-5 shadow-lg">
            <span>Answered by {answer.author.name}</span>
            <span className="text-ellipsis overflow-hidden">
              {answer.content}
            </span>
          </div>
        ))}
    </div>
  );
}

export default Question;
