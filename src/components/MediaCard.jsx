// src/components/MediaCard.jsx
import React from "react";

export default function MediaCard({ file }) {
  if (!file) return null;

  const isVideo = file.type.startsWith("video/");
  const previewUrl = URL.createObjectURL(file);

  return (
    <div className="max-w-xs bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {isVideo ? (
        <video
          src={previewUrl}
          className="w-full h-48 object-cover"
          controls
          preload="metadata"
        />
      ) : (
        <img
          src={previewUrl}
          alt={file.name}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        <h3 className="text-sm font-semibold truncate">{file.name}</h3>
        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
      </div>
    </div>
  );
}
