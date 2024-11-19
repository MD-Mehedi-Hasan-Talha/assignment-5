import Sidebar from "../../Components/Admin/Common/Sidebar";
import DashboardCards from "../../Components/Admin/Dashboard/DashboardCards";

export default function AdminDashboard() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar />
      <main className="flex-grow p-10">
        <header className="mb-8">
          <h2 className="text-2xl font-semibold">Hey There 👋!</h2>
          <h1 className="text-4xl font-bold">Welcome Back To Your Quiz Hub!</h1>
        </header>

        <DashboardCards />
      </main>
    </div>
  );
}
