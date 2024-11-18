import Sidebar from "../../Components/Admin/Common/Sidebar";
import QuizCreate from "../../Components/Admin/QuizCreate/QuizCreate";

export default function AdminQuizCreate() {
  return (
    <div className="bg-[#F5F3FF] min-h-screen flex">
      <Sidebar />

      <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <QuizCreate />
        </div>
      </main>
    </div>
  );
}
