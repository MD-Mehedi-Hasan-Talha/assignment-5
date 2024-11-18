import useAuth from "../../Hooks/useAuth";
import showToastMessage from "../../utils/showToastMessage";

export default function Logout() {
  const { handleSetAuth } = useAuth();

  const handleLogout = () => {
    showToastMessage("Successfully logged out.", "info");
    handleSetAuth(null);
  };

  return (
    <button
      className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
      style={{ fontFamily: "Jaro" }}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
