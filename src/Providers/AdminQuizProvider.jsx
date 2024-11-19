import { useReducer } from "react";
import { AdminQuizContext } from "../Contexts/Index";
import { adminQuizReducer, initialState } from "../Reducers/AdminQuizReducer";

export default function AdminQuizProvider({ children }) {
  const [state, dispatch] = useReducer(adminQuizReducer, initialState);

  return (
    <AdminQuizContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminQuizContext.Provider>
  );
}
