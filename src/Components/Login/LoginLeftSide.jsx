import { motion } from "motion/react";
import Illustration from "../../assets/Saly-1.png";

export default function LoginLeftSide() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative">
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
        <img src={Illustration} alt="Illustration" className="mx-auto" />

        <h2 className="text-3xl font-bold mb-4">Sign in Now</h2>
        <p className="text-xl mb-4">Boost Your Learning Capabilities</p>
        <p className="mb-8">
          Logging in unlocks your personal progress tracker, letting you
          evaluate your performance and see how you stack up against others.
          Whether you&apos;re preparing for exams, improving your knowledge, or
          simply having fun, there&apos;s no better way to sharpen your mind.
        </p>
      </motion.div>
    </div>
  );
}
