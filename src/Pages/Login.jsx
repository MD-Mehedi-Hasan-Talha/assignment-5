import LoginLeftSide from "../Components/Login/LoginLeftSide";
import LoginRightSide from "../Components/Login/LoginRightSide";

export default function Login() {
  return (
    <div className="bg-white text-gray-800 overflow-hidden">
      <div className="flex min-h-screen">
        <LoginLeftSide />
        <LoginRightSide />
      </div>
    </div>
  );
}
