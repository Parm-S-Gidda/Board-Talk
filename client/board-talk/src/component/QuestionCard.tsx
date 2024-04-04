import { useNavigate } from "react-router-dom";
import { QuestionsProcessed } from "../routes/Dashboard";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { timeElapsed } from "../utils/date";

type QuestionCard = {
  question: QuestionsProcessed;
};

function QuestionCard({ question }: QuestionCard) {
  const navigate = useNavigate();
  const onComment = () => {
    navigate("/home/question", {
      state: question,
    });
  };
  return (
    <div className="flex flex-row w-full gap-x-2 bg-white rounded-2xl shadow-sm py-2 px-4">
      <div className="flex flex-col items-center">
        <img
          src="/sample.jpg"
          className="w-8 h-8 max-w-8 max-h-8 object-cover rounded-full mt-1"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-row">
          <span className="font-bold">{question.user.name}</span>
          <span className="text-sm mt-0.5">
            , {timeElapsed(new Date(question.createdAt), new Date())}
          </span>
        </div>
        <span>{question.content}</span>
        <div className="flex flex-row justify-between w-24 mt-5">
          <CiHeart size={30} />
          <GoComment
            size={25}
            className="mt-0.5 hover:cursor-pointer"
            onClick={onComment}
          />
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
