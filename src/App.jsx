import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import HeroSection from "./components/Hero";
import ShowcaseSections from "./components/ShowcaseSections";
import ProjectGallery from "./components/ProjectGallery";
import GalleryModal from "./components/GalleryModal";
import ContactSection from "./components/Contact";

import categories from "./data/projectData.jsx"; // Your 3D, Graphics, Motion projects list

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <HeroSection />

      {!selectedCategory ? (
        <ShowcaseSections
          categories={categories}
          onCategoryClick={setSelectedCategory}
        />
      ) : (
        <div className="mt-10">
          <button
            onClick={() => {
              setSelectedCategory(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="mb-4 text-blue-400 hover:text-blue-200"
          >
            ← Back to Categories
          </button>

          <ProjectGallery
            title={selectedCategory.title}
            projects={selectedCategory.items}
            onItemClick={setSelectedItem}
          />
        </div>
      )}

      <AnimatePresence>
        {selectedItem && (
          <GalleryModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>

      {!selectedCategory && <ContactSection />}
    </div>
  );
}
