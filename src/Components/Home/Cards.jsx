import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import SingleCard from "./SingleCard";

export default function Cards() {
  const [isLoading, setIsLoading] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);
  const [adminQuiz, setAdminQuiz] = useState([]);

  const { handleGetAuth } = useAuth();
  const auth = handleGetAuth();
  const { api, loading: axiosLoading } = useAxios();

  useEffect(() => {
    async function fetchQuize() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/quizzes`
        );

        if (response.status === 200) {
          setQuizzes(response.data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuize();
  }, []);

  useEffect(() => {
    async function fetchAdminQuiz() {
      if (auth?.user.role === "admin") {
        try {
          const response = await api.get(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/admin/quizzes`
          );

          if (response.status === 200) {
            setAdminQuiz(response.data);
          }
        } catch (err) {
          console.log(err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    }
    if (!axiosLoading) {
      fetchAdminQuiz();
    }
  }, [api, auth?.user.role, axiosLoading]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="w-full h-80 bg-gray-200 border rounded-lg animate-pulse"></div>
        <div className="w-full h-full bg-gray-200 border rounded-lg animate-pulse"></div>
        <div className="w-full h-full bg-gray-200 border rounded-lg animate-pulse"></div>
        <div className="w-full h-full bg-gray-200 border rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-2xl font-semibold text-center col-span-full flex items-center justify-center">
          <div className="w-80 h-96 border rounded-lg border-gray-300 flex items-center justify-center">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => {
          if (adminQuiz.find((item) => item.id === quiz.id)) {
            return <SingleCard key={quiz.id} quiz={quiz} isMy={true} />;
          }
          return <SingleCard key={quiz.id} quiz={quiz} isMy={false} />;
        })
      ) : (
        <div className="text-2xl font-semibold text-center col-span-full flex items-center justify-center">
          <div className="w-80 h-96 border rounded-lg border-gray-300 flex items-center justify-center">
            No Quiz found
          </div>
        </div>
      )}
    </div>
  );
}
