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
import Cookies from "js-cookie";

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

  useEffect(() => {
    //console.log("location:", location.state);
    axios
      .get(GET_ANSWERS, {
        params: {
          question_id: location.state.question_id,
        },
        headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
      })
      .then(async (resp: AxiosResponse<Answer[]>) => {
        const getUser = async (
          user_id: string
        ): Promise<AxiosResponse<User>> => {
          return axios.get(GET_USER_ENDPOINT, {
            params: {
              user_id,
            },
            headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
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
            if (user.user_id == answer.author_id) {
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

  const onPost = () => {
    console.log("accesToken:", Cookies.get("accessToken"));
    axios
      .post(
        POST_ANSWER,
        {
          user_id: user.user_id,
          question_id: location.state.question_id,
          content: postAnswer,
        },
        { headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` } }
      )
      .then((resp) => {
        const answer: AnswerProcessed = resp.data;

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
    // <div className="w-screen h-screen flex flex-col justify-start items-center gap-y-14">
    //   <div className="flex h-20 rounded-2xl bg-gray-200  mt-16 flex-row w-3/5 justify-center items-center gap-x-4 shadow-lg ">
    //     <input
    //       className="w-full p-5 outline-none focus:outline-none bg-gray-200"
    //       type="text"
    //       placeholder="Leave an answer...."
    //       value={postAnswer}
    //       onChange={(e) => setPostAnswer(e.target.value)}
    //     ></input>

    //     <button
    //       className="bg-gray-700 rounded-full m-5 text-gray-50 w-20"
    //       onClick={onPost}
    //     >
    //       Post
    //     </button>
    //   </div>

    //   <div className="w-3/5 h-1/4 flex flex-col rounded-2xl gap-y-5 bg-gray-200 p-5 shadow-lg">
    //     <span>Question by {location.state.user.name}</span>
    //     <span className="text-ellipsis overflow-hidden">
    //       {location.state.content}
    //     </span>
    //   </div>
    //   {answers &&
    //     answers.map((answer) => (
    //       <div className="w-3/5 h-1/4 flex flex-col rounded-2xl gap-y-5 bg-gray-200 p-5 shadow-lg">
    //         <span>Answered by {answer.author.name}</span>
    //         <span className="text-ellipsis overflow-hidden">
    //           {answer.content}
    //         </span>
    //       </div>
    //     ))}
    // </div>

    <div className="h-full w-full flex flex-col">
      <div className="h-9/10 w-full flex flex-col px-32 py-10 gap-y-5 overflow-y-auto">
        <QuestionCard question={location.state} />
        {answers && answers.map((answer) => <AnswerCard answer={answer} />)}
      </div>
      <div className="h-1/10 w-full flex flex-row gap-x-5 bg-white py-1 px-20 items-center">
        <input
          placeholder="Answer"
          className="bg-gray-200 px-3 h-full w-11/12 rounded-2xl outline-none"
          onChange={(e) => setPostAnswer(e.target.value)}
          value={postAnswer}
        />
        <div onClick={() => onPost()}>
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
