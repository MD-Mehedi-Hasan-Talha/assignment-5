import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import SignupForm from "./SignupForm";

export default function SignupRightSide() {
  return (
    <div className="fixed right-0 top-0 w-full h-full lg:w-1/2 flex items-start xl:items-center justify-center p-6 lg:p-8 xl:p-12 overflow-y-auto xl:overflow-hidden">
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
        className="w-full max-w-lg "
      >
        <h2 className="text-3xl font-bold mb-3 flex gap-2 items-center">
          <span>Welcome to</span>
          <img src={Logo} className="h-7" />
        </h2>
        <h1 className="text-4xl font-bold mb-6">Sign Up</h1>

        <SignupForm />

        <div className="mt-2 text-gray-400">
          <p className="text-center">
            Already have account ?{" "}
            <Link to="/login" className="text-primary">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
