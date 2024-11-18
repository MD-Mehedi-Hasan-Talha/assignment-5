import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import useAuth from "../../Hooks/useAuth";
import Logout from "./Logout";

export default function Header() {
  const { handleGetAuth } = useAuth();

  const auth = handleGetAuth();

  return (
    <motion.header
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
      className="flex justify-between items-center mb-12"
    >
      <Link to="/">
        <img src={Logo} className="h-7" />
      </Link>
      <div>
        {!auth ? (
          <Link
            to="/login"
            className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
            style={{ fontFamily: "Jaro" }}
          >
            Login
          </Link>
        ) : (
          <Logout />
        )}
      </div>
    </motion.header>
  );
}
