import Avatar from "../../assets/avater.webp";
import useAuth from "../../Hooks/useAuth";

export default function LeaderBoardLeftColumn({ leaderBoardData }) {
  const { handleGetAuth } = useAuth();
  const auth = handleGetAuth();

  const userData = leaderBoardData?.customizedData?.find(
    (item) => item.id === auth?.user.id
  );

  return (
    <div className="bg-primary rounded-lg p-6 text-white">
      <div className="flex flex-col items-center mb-6">
        <img
          src={Avatar}
          alt="Profile Pic"
          className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover"
        />
        <h2 className="text-2xl font-bold">{auth?.user?.full_name}</h2>
        <p className="text-xl">
          {userData?.rank
            ? userData?.rank + "Position"
            : "You haven't any position."}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-sm opacity-75">Mark</p>
          <p className="text-2xl font-bold">{userData?.totalMark || 0}</p>
        </div>
        <div className="text-center">
          <p className="text-sm opacity-75">Correct</p>
          <p className="text-2xl font-bold">{userData?.totalCorrect || 0}</p>
        </div>
        <div className="text-center">
          <p className="text-sm opacity-75">Wrong</p>
          <p className="text-2xl font-bold">
            {leaderBoardData?.quiz?.total_questions - userData?.totalCorrect ||
              0}
          </p>
        </div>
      </div>
    </div>
  );
}
