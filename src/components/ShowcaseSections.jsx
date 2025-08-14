// components/ShowcaseSections.jsx
import React, { useState } from 'react';
import GalleryModal from './GalleryModal';

export default function ShowcaseSections({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section className="w-full px-4 md:px-10 py-16 text-white bg-gradient-to-b from-black via-gray-900 to-black">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]">
          My Works
        </h1>
        <div className="mt-3 mx-auto w-20 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full"></div>
        <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
          A showcase of my passion for 3D art, animation, and creative storytelling.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(category)}
            className="cursor-pointer group relative bg-gradient-to-br from-gray-800 to-gray-900 
                       rounded-2xl shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] 
                       transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 
                       flex flex-col items-center justify-center p-6 h-64"
          >
            {/* Image */}
            <div className="w-24 h-24 mb-4 flex items-center justify-center bg-black/30 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300">
              <img src={category.thumbnail} alt={category.title} className="h-20 w-20 object-contain" />
            </div>
            {/* Title */}
            <h3 className="text-2xl font-semibold tracking-wide">{category.title}</h3>
          </div>
        ))}
      </div>

      {/* Modal */}
      <GalleryModal
        open={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        title={selectedCategory?.title}
        items={selectedCategory?.items || []}
      />
    </section>
  );
}
