import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

export default function ResultLeftSide({ questions, result, quiz }) {
  const [totalCorrect, setTotalCorrect] = useState(0);

  const percentage = Math.round(Number(result.percentage));

  useEffect(() => {
    let tempTotal = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].correctAnswer === result.submitted_answers[i].answer)
        tempTotal++;
    }
    setTotalCorrect(tempTotal);
  }, []);

  return (
    <div className="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        exit={{
          opacity: 0,
          y: 100,
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
      >
        <div className="text-white">
          <div>
            <h2 className="text-4xl font-bold mb-2">{quiz?.title}</h2>
            <p>{quiz?.description}</p>
          </div>

          <div className="my-6 flex items-center">
            <div className="w-1/2">
              <div className="flex gap-6 my-6">
                <div>
                  <p className="font-semibold text-2xl my-0">
                    {questions.length}
                  </p>
                  <p className="text-gray-300">Questions</p>
                </div>

                <div>
                  <p className="font-semibold text-2xl my-0">{totalCorrect}</p>
                  <p className="text-gray-300">Correct</p>
                </div>

                <div>
                  <p className="font-semibold text-2xl my-0">
                    {questions.length - totalCorrect}
                  </p>
                  <p className="text-gray-300">Wrong</p>
                </div>
              </div>

              <Link
                to={`/leaderboard/${quiz?.id}`}
                className=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white"
              >
                View Leaderboard
              </Link>
            </div>

            <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
              <div className="flex-1">
                <p className="text-2xl font-bold">
                  {(quiz?.stats.total_marks / questions.length) * totalCorrect}/
                  {quiz?.stats.total_marks}
                </p>
                <p>Your Mark</p>
              </div>
              <div className="max-w-[80px]">
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage}%`}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
