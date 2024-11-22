import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { actions } from "../../../../Actions/Index";
import useAdminQuiz from "../../../../Hooks/useAdminQuiz";
import useAxios from "../../../../Hooks/useAxios";
import showToastMessage from "../../../../utils/showToastMessage";
import Loading from "../../../Icons/Loading";
import Arrow from "../../Icons/Arrow";

export default function QuizEntryNav({ data }) {
  const [loading, setLoading] = useState(false);
  const { api } = useAxios();
  const { state, dispatch } = useAdminQuiz();
  const navigate = useNavigate();

  const handlePublish = async () => {
    if (state?.questions?.length > 0) {
      try {
        setLoading(true);
        const bodyData = {
          status: data?.status === "draft" ? "published" : "draft",
          title: data?.title,
          description: data?.description,
        };

        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/admin/quizzes/${
            data?.id
          }`,
          bodyData
        );

        if (response.data?.status === "success") {
          dispatch({
            type: actions.quiz.QUIZ_DATA_EDITED,
            data: response.data?.data,
          });
          data.status = data?.status === "draft" ? "published" : "draft";
          showToastMessage(
            data?.status === "draft"
              ? "This quiz is unpublished."
              : "This quiz has been published.",
            "success"
          );
        }
      } catch (err) {
        showToastMessage(err.message, "error");
      } finally {
        setLoading(false);
      }
    } else {
      showToastMessage("Quiz must have at least one question.", "warning");
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this quiz-set?")) {
      try {
        const response = await api.delete(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/admin/quizzes/${
            data?.id
          }`
        );

        if (response.data.status === "success") {
          dispatch({
            type: actions.quiz.QUIZ_DATA_REMOVED,
            data: { id: data?.id },
          });
          showToastMessage("Quiz has been deleted.", "success");
          navigate("/dashboard");
        }
      } catch (err) {
        showToastMessage(err.message, "error");
      }
    }
  };

  return (
    <nav
      className="text-sm mb-4 flex items-center justify-between"
      aria-label="Breadcrumb"
    >
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

      <div className="flex items-center justify-center gap-2 w-1/3">
        <Link
          className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          to="/create"
          state={data}
        >
          Edit Quiz-Set
        </Link>
        <button
          className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          onClick={handleDelete}
        >
          Delete Quiz-Set
        </button>
        <button
          className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          onClick={handlePublish}
          disabled={loading}
        >
          {loading && <Loading />}
          {data?.status === "draft" ? "Publish" : "Unpublish"}
        </button>
      </div>
    </nav>
  );
}
