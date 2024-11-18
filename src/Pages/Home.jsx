import { motion } from "motion/react";
import Footer from "../Components/Common/Footer";
import Header from "../Components/Common/Header";
import Cards from "../Components/Home/Cards";
import Welcome from "../Components/Home/Welcome";
import useAuth from "../Hooks/useAuth";

export default function Home() {
  const { handleGetAuth } = useAuth();

  const auth = handleGetAuth();

  return (
    <div className="bg-[#F5F3FF] min-h-screen">
      <div className="container mx-auto py-3">
        <Header />
        {auth && <Welcome />}
        <main className="bg-white p-6 rounded-md h-full">
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{
              opacity: 0,
              y: 100,
              transition: {
                duration: 0.5,
                ease: "easeInOut",
              },
            }}
          >
            <h3 className="text-2xl font-bold mb-6">Participate In Quizees</h3>
            <Cards />
          </motion.section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
