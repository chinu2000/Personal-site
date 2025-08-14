import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

export default function GalleryModal({ open, onClose, title, items }) {
  // Effect to lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  // Helper to check if a URL points to an image
  const isImage = (url) =>
    /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url) || url.includes("thumbnail?id=");

  // Helper to convert Google Drive link to a direct file link
  const getDriveDirectLink = (url) => {
    const match = url.match(/\/d\/(.*?)\//);
    return match
      ? `https://drive.google.com/uc?export=download&id=${match[1]}`
      : url;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-start z-50 p-8 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center w-full max-w-6xl mb-8">
            <h2 className="text-4xl font-extrabold text-white tracking-tight">{title}</h2>
            <button onClick={onClose} className="text-black p-2 hover:text-gray-400 transition-colors">
              <X size={32} />
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full">
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
                    boxShadow: '0 0 15px 5px rgba(255,255,255,0.15)',
                  }}
                  className="relative rounded-xl bg-gray-800 text-white overflow-hidden transition duration-300 shadow-xl hover:shadow-white/20 border border-white/10"
                >
                  <div className="w-full h-48 bg-black flex items-center justify-center">
                    {/* Use the thumbnail from data if available, otherwise try to detect image */}
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title || item.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to a placeholder or the original link if thumbnail fails
                          e.target.src = isImage(link) ? link : '/api/placeholder/400/200';
                        }}
                      />
                    ) : isImage(link) ? (
                      <img 
                        src={link} 
                        alt={item.title || item.name} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400">
                        <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-2">
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
                    )}
                  </div>

                  <div className="p-4 text-center font-semibold">
                    {item.title || item.name}
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}