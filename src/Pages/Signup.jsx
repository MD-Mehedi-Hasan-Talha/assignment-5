import SignupLeftSide from "../Components/Signup/SignupLeftSide";
import SignupRightSide from "../Components/Signup/SignupRightSide";

export default function Signup() {
  return (
    <div className="bg-white text-gray-800 ">
      <div className="flex min-h-screen max-h-screen">
        <SignupLeftSide />
        <SignupRightSide />
      </div>
    </div>
  );
}
