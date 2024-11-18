import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { randomlySortedArray } from "../../utils/randomlySortedData";
import QuizOption from "./QuizOption";

export default function RightColumn({
  question,
  participation,
  totalQuestions,
  onAddAnswer,
  onNextQuestion,
  onPrevQuestion,
  onSubmitAnswer,
  answers,
}) {
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    setShuffledOptions(randomlySortedArray(question?.options));
  }, []);

  const handleAnswer = (answer) => {
    const { id } = question;
    if (answers[id] === answer) {
      onAddAnswer({ id, answer: null });
    } else {
      onAddAnswer({ id, answer });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      exit={{
        opacity: 0,
        x: -100,
        transition: {
          duration: 1,
          ease: "easeInOut",
        },
      }}
      className="lg:col-span-2 bg-white"
    >
      <div className="bg-white p-6 !pb-2 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">3. {question?.question}</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {shuffledOptions.map((option, index) => (
            <QuizOption
              key={index}
              option={option}
              onSelect={() => handleAnswer(option)}
              isChecked={answers[question.id] === option}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-2">
          {participation > 1 && (
            <button
              onClick={onPrevQuestion}
              className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
            >
              Prev
            </button>
          )}

          {totalQuestions - participation === 0 ? (
            <button
              onClick={onSubmitAnswer}
              className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={onNextQuestion}
              className="w-1/2 text-center ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
