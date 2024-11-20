import { Link, useLocation } from "react-router-dom";
import BackArrow from "../Icons/BackArrow";
import CreateForm from "./CreateForm";

export default function QuizCreate() {
  const location = useLocation();
  const data = location?.state;

  return (
    <div>
      <Link
        to="/dashboard"
        className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-buzzr-purple"
      >
        <BackArrow />
        Back to home
      </Link>

      <h2 className="text-3xl font-bold mb-6">
        Give your quiz title and description
      </h2>

      <CreateForm data={data} />
    </div>
  );
}
