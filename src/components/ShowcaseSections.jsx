// components/ShowcaseSections.jsx
import React, { useState } from 'react';
import GalleryModal from './GalleryModal';

export default function ShowcaseSections({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section className="w-full px-4 md:px-10 py-12  text-white">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 inline-block pb-2 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
        My Works
        </h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategory(category)}
            className="cursor-pointer bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center p-6 h-64"
          >
            <img src={category.thumbnail} alt={category.title} className="h-24 w-24 mb-4 object-contain" />
            <h3 className="text-2xl font-semibold">{category.title}</h3>
          </div>
        ))}
      </div>

      <GalleryModal
        open={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        title={selectedCategory?.title}
        items={selectedCategory?.items || []}
      />
    </section>
  );
}
