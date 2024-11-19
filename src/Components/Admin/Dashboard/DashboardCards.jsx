import { useEffect } from "react";
import { Link } from "react-router-dom";
import { actions } from "../../../Actions/Index";
import useAdminQuiz from "../../../Hooks/useAdminQuiz";
import useAxios from "../../../Hooks/useAxios";
import AddIcon from "../Icons/AddIcon";
import ErrorCard from "./ErrorCard";
import LoadingCard from "./LoadingCard";
import NoQuizFound from "./NoQuizFound";
import SingleQuizCard from "./SingleQuizCard";

export default function DashboardCards() {
  const { api, loading: axiosLoading } = useAxios();
  const { state, dispatch } = useAdminQuiz();

  useEffect(() => {
    const fetchQuiz = async () => {
      dispatch({ type: actions.quiz.DATA_FETCHING });
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/admin/quizzes`
        );

        dispatch({
          type: actions.quiz.DATA_FETCHED,
          data: response.data,
        });
      } catch (err) {
        dispatch({ type: actions.quiz.DATA_FETCH_ERROR, error: err.message });
      }
    };

    if (!axiosLoading) {
      fetchQuiz();
    }
  }, [api, axiosLoading, dispatch]);

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

      {state.isLoading ? (
        <LoadingCard />
      ) : state.error ? (
        <ErrorCard />
      ) : state.quizzes.length > 0 ? (
        state.quizzes.map((quiz) => (
          <SingleQuizCard key={quiz.id} quiz={quiz} />
        ))
      ) : (
        <NoQuizFound />
      )}
    </div>
  );
}
