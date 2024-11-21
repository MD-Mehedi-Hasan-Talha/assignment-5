import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Common/Header";
import LeaderBoardLeftColumn from "../Components/LeaderBoard/LeaderBoardLeftColumn";
import LeaderBoardRightColumn from "../Components/LeaderBoard/LeaderBoardRightColumn";
import useAxios from "../Hooks/useAxios";
import { leaderboardDataCustomizer } from "../utils/leaderboardDataCustomizer";
import showToastMessage from "../utils/showToastMessage";

export default function Leaderboard() {
  const [leaderBoardData, setLeaderBoardData] = useState(null);

  let { quizId } = useParams();
  const { api, loading: axiosLoadin } = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/api/quizzes/${quizId}/attempts`
        );

        const customizedData = leaderboardDataCustomizer(
          response?.data?.data?.attempts
        );
        setLeaderBoardData({
          customizedData,
          quiz: response?.data?.data?.quiz,
          stats: response?.data?.data?.stats,
        });
      } catch (error) {
        showToastMessage(error.message, "error");
      }
    };

    if (!axiosLoadin) {
      fetchData();
    }
  }, [axiosLoadin, api, quizId]);

  return (
    <div className="bg-[#F5F3FF] p-4">
      <Header />
      <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
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
          className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden"
        >
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <LeaderBoardLeftColumn leaderBoardData={leaderBoardData} />
            <LeaderBoardRightColumn leaderBoardData={leaderBoardData} />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
