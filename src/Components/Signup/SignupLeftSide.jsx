import { motion } from "motion/react";
import Illustration from "../../assets/Saly-1.png";
import LogoWhite from "../../assets/logo-white.svg";

export default function SignupLeftSide() {
  return (
    <div className="hidden  lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12  h-full fixed left-0 top-0">
      <motion.div
        initial={{
          opacity: 0,
          x: -100,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.5,
          delay: 0.5,
        }}
        exit={{
          opacity: 0,
          x: -100,
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        className="text-white"
      >
        <img src={LogoWhite} className="h-8" />

        <img
          src={Illustration}
          alt="Illustration"
          className="mx-auto 2xl:ml-0 max-h-64  max-w-lg"
        />

        <h2 className="text-3xl font-bold mb-1">Sign Up Now</h2>
        <p className="text-xl mb-4 font-medium">
          Boost Your Learning Capabilities
        </p>
        <p className="mb-8 max-w-lg">
          Logging in unlocks your personal progress tracker, letting you
          evaluate your performance and see how you stack up against others.
          Whether you&apos;re preparing for exams, improving your knowledge, or
          simply having fun, there&apos;s no better way to sharpen your mind.
        </p>
      </motion.div>
    </div>
  );
}
