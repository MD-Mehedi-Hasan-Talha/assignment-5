import Sidebar from "../../Components/Admin/Common/Sidebar";
import QuizEntry from "../../Components/Admin/QuizEntry/QuizEntry";

export default function AdminQuizEntry() {
  return (
    <div className="bg-[#F5F3FF] min-h-screen flex">
      <Sidebar />
      <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <QuizEntry />
      </main>
    </div>
  );
}
