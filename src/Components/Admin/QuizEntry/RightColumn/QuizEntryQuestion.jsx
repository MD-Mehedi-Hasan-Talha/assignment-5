import { actions } from "../../../../Actions/Index";
import useAdminQuiz from "../../../../Hooks/useAdminQuiz";
import useAxios from "../../../../Hooks/useAxios";
import useQuizForm from "../../../../Hooks/useQuizForm";
import createFourElementArray from "../../../../utils/createFourElementArray";
import showToastMessage from "../../../../utils/showToastMessage";

export default function QuizEntryQuestion({ question, questionNo }) {
  const { api } = useAxios();
  const { dispatch } = useAdminQuiz();
  const { setQuizForm } = useQuizForm();

  const handleDeleteQuestion = async (questionId) => {
    if (confirm("Are you sure you want to delete this question?")) {
      try {
        const response = await api.delete(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/api/admin/questions/${questionId}`
        );

        if (response.data?.status === "success") {
          dispatch({
            type: actions.question.QUESTION_DELETED,
            data: { questionId },
          });
          showToastMessage("Question has been deleted.", "success");
        }
      } catch (err) {
        showToastMessage(err.message, "error");
      }
    }
  };

  const handleEditQuestion = () => {
    const options = createFourElementArray(question?.options);

    const nextData = {
      question: question.question,
      options,
      correctAnswer: {
        index: question?.options?.findIndex(
          (item) => item === question?.correctAnswer
        ),
        answer: question?.correctAnswer,
      },
      isEdit: true,
      id: question.id,
    };

    setQuizForm(nextData);
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-sm mb-4">
      <div className="bg-white p-6 !pb-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {questionNo}. {question?.question}
          </h3>
        </div>
        <div className="space-y-2">
          {question?.options?.map((item, index) => (
            <label className="flex items-center space-x-3" key={index}>
              <input
                type="radio"
                className="form-radio text-buzzr-purple"
                checked={item === question?.correctAnswer}
                readOnly
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex space-x-4 bg-primary/10 px-6 py-2">
        <button
          className="text-red-600 hover:text-red-800 font-medium"
          onClick={() => handleDeleteQuestion(question.id)}
        >
          Delete
        </button>
        <button
          className="text-primary hover:text-primary/80 font-medium"
          onClick={handleEditQuestion}
        >
          Edit Question
        </button>
      </div>
    </div>
  );
}
