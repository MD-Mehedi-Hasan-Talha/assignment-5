import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { actions } from "../../../Actions/Index";
import useAdminQuiz from "../../../Hooks/useAdminQuiz";
import useAxios from "../../../Hooks/useAxios";
import showToastMessage from "../../../utils/showToastMessage";
import Loading from "../../Icons/Loading";

export default function CreateForm({ data }) {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
    },
  });

  const [loading, setLoading] = useState(false);

  const { dispatch } = useAdminQuiz();
  const navigate = useNavigate();
  const { api } = useAxios();

  const handleCreateQuiz = async (formData) => {
    try {
      setLoading(true);
      if (data) {
        const bodyData = {
          status: data?.status,
          title: formData.title,
          description: formData.description,
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

          navigate("/dashboard");
          showToastMessage("Quiz has been updated.", "success");
        }
      } else {
        const response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/admin/quizzes/`,
          formData
        );

        dispatch({
          type: actions.quiz.QUIZ_DATA_ADDED,
          data: response.data.data,
        });

        navigate("/entry", { state: { data: response.data.data } });
        showToastMessage("Quiz is created.", "success");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCreateQuiz)}>
      <div className="mb-4">
        <label
          htmlFor="quiz-title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Quiz title <p className="font-bold text-red-600 inline text-lg">*</p>
        </label>
        <input
          {...register("title", {
            required: "Quiz title is required.",
          })}
          type="text"
          id="title"
          name="title"
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple ${
            errors.title ? "border-red-600" : "border-gray-300"
          }`}
          placeholder="Quiz"
        />
        {errors.title && (
          <p className="text-sm text-red-600 font-medium">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="quiz-description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description <p className="font-bold text-red-600 inline text-lg">*</p>
        </label>
        <textarea
          {...register("description", {
            required: "Quiz Description is required.",
          })}
          id="description"
          name="description"
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
          placeholder="Description"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full text-center bg-primary text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        disabled={loading}
      >
        {loading && <Loading />}
        {data ? "Update" : "Next"}
      </button>
    </form>
  );
}
