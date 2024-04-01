import { CiHeart } from "react-icons/ci";
import { AnswerProcessed } from "../routes/Question";
import { timeElapsed } from "../utils/date";
import { GoComment } from "react-icons/go";

type AnswerCard = {
  answer: AnswerProcessed;
};

function AnswerCard({ answer }: AnswerCard) {
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
          <span className="font-bold">{answer.author.name}</span>
          <span className="text-sm mt-0.5">
            , {timeElapsed(new Date(answer.createdAt), new Date())}
          </span>
        </div>
        <span>{answer.content}</span>
        <div className="flex flex-row justify-between w-24 mt-5">
          <CiHeart size={30} />
          <GoComment size={25} className="mt-0.5" />
        </div>
      </div>
    </div>
  );
}

export default AnswerCard;
