import { motion } from "motion/react";
import Question from "./Question";

export default function ResultRightSide({ result, questions }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      exit={{
        opacity: 0,
        x: 100,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8"
    >
      <div className="w-full h-[calc(100vh-50px)] overflow-y-scroll">
        <div className="px-4">
          {questions.length > 0 &&
            questions.map((question, index) => (
              <Question
                key={question.id}
                question={question}
                questionNo={index}
                result={result}
              />
            ))}
        </div>
      </div>
    </motion.div>
  );
}
