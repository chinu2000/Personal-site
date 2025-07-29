import { motion } from "framer-motion";
import profilePic from "../assets/chinna.jpg";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden px-4">
      
      {/* Profile Pic + Name + Bio Centered at Top */}
      <motion.div
        className="flex flex-col items-center text-center mt-12 space-y-3 z-20"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src={profilePic}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-white shadow-md"
        />
        <h2 className="text-2xl font-bold">Chinnasamy M</h2>
      </motion.div>

      {/* Main Center Text */}
      <motion.div
        className="text-center z-10 max-w-3xl mt-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-extrabold tracking-tight mb-4 glow-text">
          Hi, I'm a 3D Artist
        </h1>
        <p className="text-lg text-gray-300 mb-4">
          I bring <span className="text-blue-400">3D visuals</span>, <span className="text-pink-400">creative design</span>, and <span className="text-purple-400">motion storytelling</span> to life.
        </p>
        <p className="text-sm text-gray-500 italic">Scroll down to explore my work</p>
      </motion.div>

      {/* Background Glow */}
      <div className="absolute -top-20 left-1/3 w-96 h-96 bg-purple-700 opacity-30 rounded-full blur-3xl" />
    </section>
  );
}
