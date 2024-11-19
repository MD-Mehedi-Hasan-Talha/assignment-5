import { Link } from "react-router-dom";
import QuizIcon from "../Icons/QuizIcon";

export default function SingleQuizCard({ quiz }) {
  return (
    <Link
      to="/entry"
      state={{ data: quiz }}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer"
    >
      <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
        <QuizIcon />
      </div>
      <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
        {quiz.title}
      </h3>
      <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
        {quiz.description}
      </p>
    </Link>
  );
}
