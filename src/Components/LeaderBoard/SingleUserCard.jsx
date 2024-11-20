import Avatar from "../../assets/avater.webp";
import useAuth from "../../Hooks/useAuth";
import getOrdinalSuffix from "../../utils/getOrdinalSuffix";

export default function SingleUserCard({ item }) {
  const { handleGetAuth } = useAuth();
  const auth = handleGetAuth();

  return (
    <li
      className={`flex items-center justify-between px-2 ${
        item.id === auth.user.id && "border-2 rounded-md border-yellow-300"
      }`}
    >
      <div className="flex items-center">
        <img
          src={Avatar}
          alt="SPD Smith"
          className="object-cover w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold">{item.full_name}</h3>
          <p className="text-sm text-gray-500">
            {item.rank}
            {getOrdinalSuffix(item.rank)}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="mr-2">{item.totalMark}</span>
      </div>
    </li>
  );
}
