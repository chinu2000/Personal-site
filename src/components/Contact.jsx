export default function Contact() {
  return (
    <section className="bg-gradient-to-t from-gray-900 via-black to-gray-900 text-white py-20 px-6 text-center">
      <h2 className="text-4xl font-bold mb-6">Let's Collaborate</h2>
      <p className="text-gray-300 text-lg mb-4">
        Email me at: <span className="text-blue-400 font-mono tracking-wide animate-pulse">chinnasamymahe@gmail.com</span>
      </p>

      <a
        href="tel:7867939009"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Get In Touch
      </a>

      <p className="text-gray-500 text-sm mt-10">© 2025 YourName. All rights reserved.</p>
    </section>
  );
}
