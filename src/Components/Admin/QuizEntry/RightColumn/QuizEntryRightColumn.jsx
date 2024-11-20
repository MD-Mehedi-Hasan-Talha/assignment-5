import useAdminQuiz from "../../../../Hooks/useAdminQuiz";
import QuizEntryQuestion from "./QuizEntryQuestion";

export default function QuizEntryRightColumn() {
  const { state } = useAdminQuiz();

  return (
    <div className="px-4">
      {state?.questions?.length > 0 &&
        state?.questions?.map((question, index) => (
          <QuizEntryQuestion
            key={question.id}
            question={question}
            questionNo={index + 1}
          />
        ))}
    </div>
  );
}
