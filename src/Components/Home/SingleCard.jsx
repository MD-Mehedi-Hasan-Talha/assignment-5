import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import showToastMessage from "../../utils/showToastMessage";

export default function SingleCard({ quiz, isMy }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const { api, loading: axiosLoading } = useAxios();

  const { handleGetAuth } = useAuth();
  const auth = handleGetAuth();

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/quizzes/${
            quiz?.id
          }/attempts`
        );

        const matchedUser = response?.data?.data?.attempts?.find(
          (item) => item.user.id === auth.user.id
        );

        let totalUserMark = 0;
        let totalQuizMark = 0;
        if (!matchedUser) return;
        for (let i = 0; i < matchedUser?.correct_answers?.length; i++) {
          totalQuizMark += matchedUser?.correct_answers[i].marks;
          let answers = matchedUser?.submitted_answers?.find(
            (item) =>
              item.question_id === matchedUser?.correct_answers[i].question_id
          );
          if (matchedUser?.correct_answers[i].answer === answers.answer)
            totalUserMark += matchedUser?.correct_answers[i].marks;
        }

        matchedUser.totalUserMark = totalUserMark;
        matchedUser.totalQuizMark = totalQuizMark;
        matchedUser.percentage = (totalUserMark / totalQuizMark) * 100;

        setResult(matchedUser);
      } catch (err) {
        showToastMessage(err.message, "error");
      } finally {
        setLoading(false);
      }
    };

    if (auth && !axiosLoading) {
      fetchResult();
    }
    if (!auth) {
      setResult(null);
    }
  }, [api, auth, axiosLoading, quiz.id]);

  return (
    <Link
      to={result ? "/result" : `/quiz/${quiz.id}`}
      state={{ data: { ...result, quiz: { ...quiz } } }}
      className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer group relative"
    >
      <div
        className={`${
          !quiz.is_attempted && "group-hover:scale-105"
        } absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4`}
      >
        <h1 className=" text-5xl" style={{ fontFamily: "Jaro" }}>
          {quiz.title}
        </h1>
        <p className="mt-2 text-lg">{quiz.description}</p>
      </div>

      {!loading && result && (
        <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
          <div>
            <h1 className="text-3xl text-center font-bold">
              Already Participated
            </h1>
            <p className="text-center">
              You got {result.totalUserMark} out of {result.totalQuizMark}
            </p>
          </div>
        </div>
      )}

      {isMy && (
        <Link
          to={`/leaderboard/${quiz?.id}`}
          className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center"
        >
          <div>
            <h1 className="text-3xl text-center font-bold">
              This is your quiz
            </h1>
            <p className="text-center">view leaderboard</p>
          </div>
        </Link>
      )}

      <img
        src={quiz.thumbnail}
        alt={quiz.title}
        className="w-full h-full object-cover rounded mb-4 transition-all "
      />
    </Link>
  );
}
