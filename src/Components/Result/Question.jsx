export default function Question({ question, questionNo, result }) {
  const answer = result.submitted_answers.find(
    (item) => item.question_id === question.id
  );

  return (
    <div className="rounded-lg overflow-hidden shadow-sm mb-4">
      <div className="bg-white p-6 !pb-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {questionNo + 1}. {question.question}
          </h3>
        </div>
        <div className="space-y-2">
          {question?.options?.length > 0 &&
            question?.options?.map((option, index) => (
              <label
                key={index}
                className={`flex items-center space-x-3 p-1 rounded-sm ${
                  question.correctAnswer === option
                    ? "bg-green-200 text-green-700"
                    : answer?.answer === option
                    ? "bg-red-200 text-red-700"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  className="form-radio text-buzzr-purple"
                  checked={answer?.answer === option}
                  readOnly
                />
                <span>{option}</span>
              </label>
            ))}
        </div>
      </div>
      {/* <div className="flex space-x-4 bg-primary/10 px-6 py-2">
        <button className="text-red-600 hover:text-red-800 font-medium">
          Delete
        </button>
        <button className="text-primary hover:text-primary/80 font-medium">
          Edit Question
        </button>
      </div> */}
    </div>
  );
}
