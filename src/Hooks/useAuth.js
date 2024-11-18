import { useContext } from "react";
import { AuthContext } from "../Contexts/Index";

export default function useAuth() {
  return useContext(AuthContext);
}
