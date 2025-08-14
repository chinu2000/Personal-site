import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import HeroSection from "./components/Hero";
import ShowcaseSections from "./components/ShowcaseSections";
import ProjectGallery from "./components/ProjectGallery";
import GalleryModal from "./components/GalleryModal";
import ContactSection from "./components/Contact";

import categories from "./data/ProjectData.js"; // Your 3D, Graphics, Motion projects list

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItems, setModalItems] = useState([]);
  const [modalTitle, setModalTitle] = useState("");

  const openGallery = (category) => {
    setModalItems(category.items || []);
    setModalTitle(category.title || "");
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <HeroSection />

      {!selectedCategory ? (
        <ShowcaseSections
          categories={categories}
          onCategoryClick={(cat) => {
            setSelectedCategory(cat);
            // Instead of navigating away, open modal directly
            openGallery(cat);
          }}
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
            onItemClick={() => openGallery(selectedCategory)}
          />
        </div>
      )}

      <AnimatePresence>
        {modalOpen && (
          <GalleryModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title={modalTitle}
            items={modalItems}
          />
        )}
      </AnimatePresence>

      {!selectedCategory && <ContactSection />}
    </div>
  );
}
