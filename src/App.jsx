import { AnimatePresence } from "motion/react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminQuizCreate from "./Pages/Admin/AdminQuizCreate";
import AdminQuizEntry from "./Pages/Admin/AdminQuizEntry";
import Home from "./Pages/Home";
import Leaderboard from "./Pages/Leaderboard";
import Login from "./Pages/Login";
import Quiz from "./Pages/Quiz";
import Result from "./Pages/Result";
import Signup from "./Pages/Signup";
import AuthProvider from "./Providers/AuthProvider";
import AdminRoute from "./Routes/AdminRoute";
import PrivateRoute from "./Routes/PrivateRoute";

export default function App() {
  const location = useLocation();
  return (
    <>
      <AuthProvider>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route element={<AdminRoute />}>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/create" element={<AdminQuizCreate />} />
              <Route path="/entry" element={<AdminQuizEntry />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/quiz/:quizId" element={<Quiz />} />
              <Route path="/result" element={<Result />} />
              <Route path="/leaderboard/:quizId" element={<Leaderboard />} />
            </Route>
            {/* <Route element={<PublicRoute />}> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* </Route> */}
          </Routes>
        </AnimatePresence>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}
