import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";

export default function GalleryModal({ open, onClose, title, items }) {
  const [thumbnails, setThumbnails] = useState({});

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [open]);

  const isImage = (url) =>
    /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url) || url.includes("thumbnail?id=");

  const getDriveDirectLink = (url) => {
    const match = url.match(/\/d\/(.*?)\//);
    return match
      ? `https://drive.google.com/uc?export=download&id=${match[1]}`
      : url;
  };

  const generateThumbnail = useCallback((videoUrl, index) => {
    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.playsInline = true;

    video.addEventListener("loadeddata", () => {
      video.currentTime = 1;
    });

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setThumbnails((prev) => ({
        ...prev,
        [index]: { url: dataUrl, error: false },
      }));
    });

    video.addEventListener("error", () => {
      setThumbnails((prev) => ({
        ...prev,
        [index]: { url: null, error: true },
      }));
    });
  }, []);

  useEffect(() => {
    if (open) {
      items.forEach((item, index) => {
        if (!thumbnails[index]) {
          const directLink = getDriveDirectLink(item.link);
          if (!isImage(directLink)) {
            const proxyUrl = `/api/proxy?url=${encodeURIComponent(directLink)}`;
            generateThumbnail(proxyUrl, index);
          }
        }
      });
    }
  }, [open, items, generateThumbnail, thumbnails]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center z-50 p-4 sm:p-6 lg:p-8 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full max-w-7xl mb-6 gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight text-center sm:text-left">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-white p-2 hover:text-gray-400 transition-colors self-center sm:self-auto"
            >
              <X size={28} />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-7xl">
            {items.map((item, index) => {
              const link = getDriveDirectLink(item.link);
              const thumbnailData = thumbnails[index];

              return (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 15px 5px rgba(255,255,255,0.15)",
                  }}
                  className="relative rounded-lg sm:rounded-xl bg-gray-800 text-white overflow-hidden transition duration-300 shadow-xl hover:shadow-white/20 border border-white/10"
                >
                  <div className="w-full h-40 sm:h-48 md:h-56 lg:h-60 bg-black flex items-center justify-center">
                    {isImage(link) ? (
                      <img
                        src={link}
                        alt={item.title || item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : thumbnailData && thumbnailData.url ? (
                      <img
                        src={thumbnailData.url}
                        alt={item.title || item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : thumbnailData && thumbnailData.error ? (
                      <div className="flex flex-col items-center text-red-400">
                        <AlertTriangle size={24} />
                        <span className="text-sm mt-2">Preview failed</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs sm:text-sm animate-pulse">
                        Loading preview...
                      </span>
                    )}
                  </div>

                  <div className="p-3 sm:p-4 text-center font-semibold text-sm sm:text-base">
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
