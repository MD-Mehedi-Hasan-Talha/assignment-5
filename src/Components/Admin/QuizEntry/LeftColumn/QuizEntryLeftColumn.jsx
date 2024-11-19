import useAdminQuiz from "../../../../Hooks/useAdminQuiz";
import QuizEntryForm from "./QuizEntryForm";

export default function QuizEntryLeftColumn({ data }) {
  const { state } = useAdminQuiz();

  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-4">{data?.title}</h2>
      <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
        Total number of questions : {state.questions.length}
      </div>
      <p className="text-gray-600 mb-4">{data?.description}</p>

      <QuizEntryForm quizSet={data} />
    </div>
  );
}
