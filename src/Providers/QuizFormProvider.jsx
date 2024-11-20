import { useState } from "react";
import { QuizFormContext } from "../Contexts/Index";

export default function QuizFormProvider({ children }) {
  const [quizForm, setQuizForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: {
      index: null,
      answer: null,
    },
    isEdit: false,
    id: null,
  });

  return (
    <QuizFormContext.Provider value={{ quizForm, setQuizForm }}>
      {children}
    </QuizFormContext.Provider>
  );
}
