import { motion } from "motion/react";
import Avatar from "../../assets/avater.webp";
import useAuth from "../../Hooks/useAuth";

export default function Welcome() {
  const { handleGetAuth } = useAuth();

  const auth = handleGetAuth();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      className="text-center mb-12"
    >
      <img
        src={Avatar}
        alt="Profile Picture"
        className="w-32 h-32 rounded-full border-4 border-primary mx-auto mb-4 object-cover"
      />
      <p className="text-xl text-gray-600">Welcome</p>
      <h2
        className="text-4xl font-bold text-gray-700"
        style={{ fontFamily: "Jaro" }}
      >
        {auth?.user.full_name}
      </h2>
    </motion.div>
  );
}
