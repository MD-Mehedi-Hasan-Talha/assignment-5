import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AuthContext } from "../Contexts/Index";

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cookie = Cookies.get("quizzes");
    if (cookie) {
      setAuth(JSON.parse(cookie));
    }
    setIsLoading(false);
  }, []);

  const handleSetAuth = (data) => {
    if (!data) {
      Cookies.remove("quizzes");
      setAuth(null);
    } else {
      Cookies.set("quizzes", JSON.stringify(data));
      setAuth(data);
    }
  };

  const handleGetAuth = () => {
    return auth;
  };

  return (
    <AuthContext.Provider value={{ handleGetAuth, handleSetAuth, isLoading }}>
      {!isLoading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
}
