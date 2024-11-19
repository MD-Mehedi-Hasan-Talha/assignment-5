import { useContext } from "react";
import { AdminQuizContext } from "../Contexts/Index";

export default function useAdminQuiz() {
  return useContext(AdminQuizContext);
}
