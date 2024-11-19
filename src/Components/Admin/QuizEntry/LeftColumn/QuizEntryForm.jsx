import { useState } from "react";
import { actions } from "../../../../Actions/Index";
import useAdminQuiz from "../../../../Hooks/useAdminQuiz";
import useAxios from "../../../../Hooks/useAxios";
import Loading from "../../../Icons/Loading";
import AnswerOption from "./AnswerOption";

//TODO: যদি কারেক্ট উত্তর সিলেক্ট করে ওই অপশনের ভ্যালু পরিবর্তন করা হয় তাহলে ওইটা আবার আনচেক হয়ে যাচ্ছে।

export default function QuizEntryForm({ quizSet }) {
  const [question, setQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: {
      index: null,
      answer: null,
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useAdminQuiz();

  const { api } = useAxios();

  const handleOption = (value, index) => {
    const nextOption = [...question.options];
    nextOption[index] = value;
    setQuestion({
      ...question,
      options: nextOption,
    });
  };

  const handleCorrectAnswer = (value, index) => {
    if (question.correctAnswer.index === index) {
      setQuestion({
        ...question,
        correctAnswer: {
          index: null,
          answer: null,
        },
      });
    } else {
      setQuestion({
        ...question,
        correctAnswer: {
          index,
          answer: value,
        },
      });
    }
  };

  const handleSubmit = async () => {
    setError(null);

    const questionValidation = {
      question: question.question.trim(),
      options: question.options.filter((option) => option.trim() !== ""),
      correctAnswer: question.correctAnswer.answer || null,
    };

    if (!questionValidation.question) {
      setError({
        type: "title",
        message: "Question field is required.",
      });
      return;
    }

    if (questionValidation.options.length < 2) {
      setError({
        type: "option",
        message: "You must have to add at list 2 option.",
      });
      return;
    }

    if (!questionValidation.correctAnswer) {
      setError({
        type: "correctAns",
        message: "You must have to add correct answer.",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/admin/quizzes/${
          quizSet?.id
        }/questions`,
        questionValidation
      );
      dispatch({
        type: actions.question.QUESTION_ADDED,
        data: response.data?.data,
      });

      setQuestion({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: {
          index: null,
          answer: null,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>

      <div>
        <label
          htmlFor="quizTitle"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Question Title
        </label>
        <input
          type="text"
          id="quizTitle"
          name="quizTitle"
          className={`w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground ${
            error?.type === "title" && "border-red-600"
          }`}
          placeholder="Enter quiz title"
          value={question.question}
          onChange={(e) =>
            setQuestion({ ...question, question: e.target.value })
          }
        />
        {error?.type === "title" && (
          <p className="text-red-600">{error?.message}</p>
        )}
      </div>

      <p className="text-sm text-gray-600 mt-4">Add Options</p>

      <div id="optionsContainer" className="space-y-2 mt-4">
        {question.options?.map((item, index) => (
          <AnswerOption
            key={index}
            label={`Option ${index + 1}`}
            index={index}
            answer={item}
            onChangeOption={(value) => handleOption(value, index)}
            onCorrectAnswer={handleCorrectAnswer}
            isCorrect={question.correctAnswer}
          />
        ))}
        {(error?.type === "option" || error?.type === "correctAns") && (
          <p className="text-red-600">{error?.message}</p>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        disabled={loading}
      >
        {loading && <Loading />}
        Save Quiz
      </button>
    </div>
  );
}
