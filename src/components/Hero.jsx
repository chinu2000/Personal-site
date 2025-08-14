import { motion } from "framer-motion";
import profilePic from "../assets/chinnaimg.jpg";
import blenderLogo from "../assets/blender.png";       // downloaded image
import aeLogo from "../assets/AE.svg";     // downloaded image

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden px-4">

      {/* Top-Right 3D Tools Logos */}
      <motion.div
        className="absolute top-6 right-6 flex items-center gap-3 z-30"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src={blenderLogo}
          alt="Blender"
          className="w-10 h-10 object-contain drop-shadow-lg"
          title="Blender"
        />
        <img
          src={aeLogo}
          alt="After Effects"
          className="w-10 h-10 object-contain drop-shadow-lg"
          title="Adobe After Effects"
        />
      </motion.div>

      {/* Profile Picture */}
      <motion.div
        className="flex flex-col items-center text-center mt-12 space-y-3 z-20"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="w-36 aspect-square rounded-full overflow-hidden border-4 border-white shadow-md">
          <img
            src={profilePic}
            alt="Profile"
            className="w-full h-full object-cover"
            style={{
              objectPosition: "47% 40%",
            }}
          />
        </div>
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
          I bring <span className="text-blue-400">3D visuals</span>,{" "}
          <span className="text-pink-400">creative design</span>, and{" "}
          <span className="text-purple-400">motion storytelling</span> to life.
        </p>
        <p className="text-sm text-gray-500 italic">
          Scroll down to explore my work
        </p>
      </motion.div>

      {/* Background Glow */}
      <div className="absolute -top-20 left-1/3 w-96 h-96 bg-purple-700 opacity-30 rounded-full blur-3xl" />
    </section>
  );
}
