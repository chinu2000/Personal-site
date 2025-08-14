import { FaLinkedin, FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="bg-gradient-to-t from-gray-900 via-black to-gray-900 text-white py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Let's Collaborate</h2>
        <p className="text-gray-300 text-lg mb-12">
          I’m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>

        {/* Contact Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Email */}
          <a
            href="mailto:chinnasamymahe@gmail.com"
            className="flex flex-col items-center bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition-transform"
          >
            <FaEnvelope className="text-blue-400 text-3xl mb-3" />
            <span className="text-lg font-semibold">Email</span>
            <span className="text-gray-400 text-sm break-all">chinnasamymahe@gmail.com</span>
          </a>

          {/* Phone */}
          <a
            href="tel:+917867939009"
            className="flex flex-col items-center bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition-transform"
          >
            <FaPhone className="text-green-400 text-3xl mb-3 transform rotate-90" />
            <span className="text-lg font-semibold">Mobile</span>
            <span className="text-gray-400 text-sm">+91 78679 39009</span>
          </a>

          {/* LinkedIn */}
          {/* <a
            href="https://www.linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition-transform"
          >
            <FaLinkedin className="text-blue-500 text-3xl mb-3" />
            <span className="text-lg font-semibold">LinkedIn</span>
            <span className="text-gray-400 text-sm">linkedin.com/in/yourprofile</span>
          </a> */}

          {/* WhatsApp */}
          <a
            href="https://wa.me/917867939009"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition-transform"
          >
            <FaWhatsapp className="text-green-500 text-3xl mb-3" />
            <span className="text-lg font-semibold">WhatsApp</span>
            <span className="text-gray-400 text-sm">Chat with me</span>
          </a>
        </div>

        {/* Footer */}
       <p className="mt-12 text-sm text-gray-400 italic border-t border-gray-700 pt-6 max-w-xl mx-auto">
          “In 3D art, every pixel is a brushstroke, and every frame tells a story.”
        </p>

      </div>
    </section>
  );
}
