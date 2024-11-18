import Avatar from "../../assets/avater.webp";

export default function SingleUserCard({ item }) {
  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={Avatar}
          alt="SPD Smith"
          className="object-cover w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold">{item.full_name}</h3>
          <p className="text-sm text-gray-500">{item.rank}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="mr-2">{item.totalMark}</span>
      </div>
    </li>
  );
}
