import { Link } from "react-router-dom";
import AddIcon from "../Icons/AddIcon";
import SingleQuizCard from "./SingleQuizCard";

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Link to="/create" className="group">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 ">
          <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
            <AddIcon />
          </div>
          <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
            Create a new quiz
          </h3>
          <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
            Build from the ground up
          </p>
        </div>
      </Link>

      <SingleQuizCard />
    </div>
  );
}
