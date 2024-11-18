import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import LogoWhite from "../assets/logo-white.svg";
import ResultLeftSide from "../Components/Result/ResultLeftSide";
import ResultRightSide from "../Components/Result/ResultRightSide";
import useAxios from "../Hooks/useAxios";

export default function Result() {
  const { api, loading: axiosLoading } = useAxios();
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const result = location?.state?.data;

  useEffect(() => {
    setLoading(true);
    const fetchQuiz = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/quizzes/${
            result.quiz.id
          }`
        );
        setQuestions(response.data.data.questions);
        setQuiz(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (!axiosLoading && result) {
      fetchQuiz();
    }
  }, [axiosLoading, api, result]);

  if (!result) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="flex min-h-screen overflow-hidden">
        <Link to="/">
          <img src={LogoWhite} className="max-h-11 fixed left-6 top-6 z-50" />
        </Link>
        <ResultLeftSide questions={questions} result={result} quiz={quiz} />
        <ResultRightSide result={result} questions={questions} />
      </div>
    </div>
  );
}
