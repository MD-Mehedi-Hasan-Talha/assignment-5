import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { actions } from "../../../Actions/Index";
import useAdminQuiz from "../../../Hooks/useAdminQuiz";
import QuizEntryLeftColumn from "./LeftColumn/QuizEntryLeftColumn";
import QuizEntryNav from "./LeftColumn/QuizEntryNav";
import QuizEntryRightColumn from "./RightColumn/QuizEntryRightColumn";

export default function QuizEntry() {
  const location = useLocation();
  const data = location?.state?.data;
  const { dispatch } = useAdminQuiz();

  useEffect(() => {
    dispatch({ type: actions.question.QUESTION_FETCHED, data: data.Questions });
  }, [data.Questions, dispatch]);

  return (
    <div>
      <QuizEntryNav />

      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
        <QuizEntryLeftColumn data={data} />

        <QuizEntryRightColumn />
      </div>
    </div>
  );
}
