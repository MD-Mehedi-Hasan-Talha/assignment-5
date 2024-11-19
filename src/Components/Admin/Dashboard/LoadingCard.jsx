export default function LoadingCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer">
      <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all rounded bg-gray-300 w-10 h-10 animate-pulse"></div>
      <div className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all rounded bg-gray-300 w-30 h-4 animate-pulse"></div>
      <div className="text-gray-600 text-sm group-hover:scale-105 transition-all rounded bg-gray-300 w-30 h-4 animate-pulse"></div>
    </div>
  );
}
