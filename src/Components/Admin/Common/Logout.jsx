import useAuth from "../../../Hooks/useAuth";
import showToastMessage from "../../../utils/showToastMessage";

export default function Logout() {
  const { handleSetAuth } = useAuth();

  const handleLogout = () => {
    showToastMessage("Successfully logged out.", "info");
    handleSetAuth(null);
  };

  return (
    <button
      onClick={handleLogout}
      className="block w-full text-left py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
    >
      Logout
    </button>
  );
}
