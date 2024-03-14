import { useNavigate } from "react-router-dom";
import { QuestionsProcessed } from "../routes/Dashboard";

type QuestionCard = {
  question: QuestionsProcessed;
};

function QuestionCard({ question }: QuestionCard) {
  const navigate = useNavigate();
  const onCardClick = () => {
    navigate("/question", {
      state: question,
    });
  };
  return (
    <div
      className="w-64 h-64 flex flex-col rounded-2xl shadow-lg gap-y-8 bg-gray-200 hover:cursor-pointer"
      onClick={onCardClick}
    >
      <div className="flex flex-row gap-x-4 mt-7 justify-center">
        <span className="font-normal">
          {question.title} by {question.user.name}
        </span>
      </div>
      <span className="font-normal p-3 text-ellipsis overflow-hidden">
        {question.content}
      </span>
    </div>
  );
}

export default QuestionCard;
