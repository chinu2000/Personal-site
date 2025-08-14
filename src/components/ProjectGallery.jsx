// components/ProjectGallery.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function ProjectGallery({ title, items }) {
  const [isOpen, setIsOpen] = useState(false);

  const isImage = (url) =>
    /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url) || url.includes("thumbnail?id=");

  const getDriveDirectLink = (url) => {
    const match = url.match(/\/d\/(.*?)\//);
    return match
      ? `https://drive.google.com/uc?export=download&id=${match[1]}`
      : url;
  };

  return (
    <section className="my-8 px-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left bg-gray-800 hover:bg-gray-700 transition-all px-4 py-3 rounded-xl"
      >
        <h2 className="text-2xl font-semibold">{title}</h2>
        {isOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
      </button>

      {isOpen && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {items.map((item, index) => {
            const link = getDriveDirectLink(item.link);

            return (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <div className="w-full h-48 bg-black">
                  {isImage(link) ? (
                    <img
                      src={link}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={link}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  )}
                </div>
                <div className="p-3 text-center font-medium">
                  {item.title || item.name}
                </div>
              </a>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}
