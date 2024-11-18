import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import LoginForm from "./LoginForm";

export default function LoginRightSide() {
  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.5,
        }}
        exit={{
          opacity: 0,
          y: 100,
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        className="w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-8 flex gap-2 items-center">
          <span>Welcome to</span>
          <img src={Logo} className="h-7" />
        </h2>
        <h1 className="text-5xl font-bold mb-8">Sign in</h1>

        <LoginForm />

        <div className="text-center">
          <a href="#" className="text-primary">
            Forgot Password
          </a>
        </div>

        <div className="mt-8">
          <p className="text-center">
            No Account ?{" "}
            <Link to="/signup" className="text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
