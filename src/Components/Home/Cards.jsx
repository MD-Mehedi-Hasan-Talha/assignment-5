import axios from "axios";
import { useEffect, useState } from "react";
import SingleCard from "./SingleCard";

export default function Cards() {
  const [isLoading, setIsLoading] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);

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
        quizzes.map((quiz) => <SingleCard key={quiz.id} quiz={quiz} />)
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
