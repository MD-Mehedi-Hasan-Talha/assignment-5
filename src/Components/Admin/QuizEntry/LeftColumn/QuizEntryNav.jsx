import { Link } from "react-router-dom";
import Arrow from "../../Icons/Arrow";

export default function QuizEntryNav() {
  return (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-buzzr-purple"
          >
            Home
          </Link>
          <Arrow />
        </li>
        <li>
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-buzzr-purple"
            aria-current="page"
          >
            Quizzes
          </Link>
        </li>
      </ol>
    </nav>
  );
}
