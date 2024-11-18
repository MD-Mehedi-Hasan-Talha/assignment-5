import { motion } from "motion/react";

export default function Footer() {
  return (
    <motion.footer
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
      className="mt-6 mb-3 opacity-40 text-center"
    >
      Copyright &copy; 2024 Learn With Sumit | All Rights Reserved
    </motion.footer>
  );
}
