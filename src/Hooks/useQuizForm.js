import { useContext } from "react";
import { QuizFormContext } from "../Contexts/Index";

export default function useEditQuestion() {
  return useContext(QuizFormContext);
}
