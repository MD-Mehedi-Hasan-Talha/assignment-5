import SingleUserCard from "./SingleUserCard";

export default function LeaderBoardRightColumn({ leaderBoardData }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <p className="mb-6">{leaderBoardData?.quiz?.title}</p>
      <ul className="space-y-4">
        {leaderBoardData?.customizedData?.map(
          (item) =>
            item.rank <= 5 && <SingleUserCard key={item.id} item={item} />
        )}
      </ul>
    </div>
  );
}
