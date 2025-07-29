import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, GalleryVerticalEnd, Cuboid, ImagePlay } from 'lucide-react'; // add icons here

const iconMap = [Sparkles, GalleryVerticalEnd, Cuboid, ImagePlay]; // Add more as needed

export default function GalleryModal({ open, onClose, title, items }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => (document.body.style.overflow = 'unset');
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-start z-50 p-8 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex justify-between items-center w-full max-w-6xl mb-8">
            <h2 className="text-4xl font-extrabold text-white tracking-tight">{title}</h2>
            <button onClick={onClose} className="text-black p-2 hover:text-gray-400">
              <X size={32} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full">
            {items.map((item, index) => {
              const Icon = iconMap[index % iconMap.length]; // cycle through icons
              return (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.08,
                    boxShadow: '0 0 15px 5px rgba(255,255,255,0.15)',
                  }}
                  className="relative rounded-xl bg-gray-800 text-white px-6 py-10 text-center transition duration-300 shadow-xl hover:shadow-white/20 border border-white/10 backdrop-blur-md"
                >
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="flex justify-center mb-4"
                  >
                    <Icon size={40} className="text-blue-400 drop-shadow-glow" />
                  </motion.div>
                  <div className="text-xl font-semibold">{item.title}</div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
