import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      {/* Accordion header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left bg-gray-800/90 hover:bg-gray-700 transition-all px-5 py-4 rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-bold tracking-wide">{title}</h2>
        {isOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
      </button>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {items.map((item, index) => {
              const link = getDriveDirectLink(item.link);

              return (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(255,255,255,0.15)',
                  }}
                  className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-lg border border-white/5 hover:border-white/20 transition-all"
                >
                  {/* Media */}
                  <div className="w-full h-48 bg-black flex items-center justify-center overflow-hidden">
                    {/* Use the thumbnail from data if available */}
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title || item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          // Fallback to checking if the original link is an image
                          if (isImage(link)) {
                            e.target.src = link;
                          } else {
                            // Replace with a video placeholder
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }
                        }}
                      />
                    ) : isImage(link) ? (
                      <img
                        src={link}
                        alt={item.title || item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                    
                    {/* Video placeholder (hidden by default, shown when image fails to load) */}
                    <div 
                      className="w-full h-full bg-gray-700 items-center justify-center flex-col text-gray-400 hidden"
                    >
                      <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center mb-2">
                        <svg 
                          className="w-8 h-8" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM4 8a1 1 0 000 2h1v3a1 1 0 001 1h3a1 1 0 001-1V9a1 1 0 000-2H4z"/>
                        </svg>
                      </div>
                      <span className="text-sm">Video File</span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="p-4 text-center font-semibold text-white group-hover:text-pink-400 transition-colors">
                    {item.title || item.name}
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}