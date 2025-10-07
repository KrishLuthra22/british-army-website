import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Import all images from src/assets/Images
const imageModules = import.meta.glob(
  "../assets/Images/*.{jpg,jpeg,png,JPG}",
  { eager: true, as: "url" }
);

const imageUrls = Object.values(imageModules) as string[];
const imageNames = Object.keys(imageModules).map(
  (path) => path.split("/").pop() || ""
);

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);
  const nextImage = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % imageUrls.length : null
    );
  const prevImage = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + imageUrls.length) % imageUrls.length : null
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#a11827]/10 via-[#162e5e]/10 to-[#1f7a3a]/10 py-12 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#162e5e] dark:text-white tracking-wide drop-shadow-sm">
          British Army Gallery
        </h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300 text-lg">
          Capturing moments of courage, leadership, and unity.
        </p>
      </div>

      {/* Grid view */}
      {selectedIndex === null && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              onClick={() => openModal(index)}
            >
              <img
                src={url}
                alt={imageNames[index]}
                className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <p className="text-white font-semibold text-sm tracking-wide">
                  View Image
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedIndex !== null && (
        <>
          {/* Thumbnails */}
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/70 p-4 overflow-x-auto border-t border-white/20 shadow-xl backdrop-blur-sm">
            <div className="flex space-x-3">
              {imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={imageNames[index]}
                  className={`w-24 h-24 object-cover rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                    index === selectedIndex
                      ? "ring-4 ring-[#a11827] shadow-2xl"
                      : "opacity-80"
                  }`}
                  onClick={() => openModal(index)}
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          {/* Main Modal View */}
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-6 backdrop-blur-sm">
            <div className="relative max-w-6xl max-h-[85vh] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.7)] bg-gray-950 border border-white/10">
              <img
                src={imageUrls[selectedIndex]}
                alt={imageNames[selectedIndex]}
                className="max-w-full max-h-[85vh] object-contain mx-auto rounded-lg"
              />

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-[#a11827]/80 hover:bg-[#a11827] rounded-full p-3 transition"
                aria-label="Close"
              >
                <X size={26} />
              </button>

              {/* Prev */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-[#162e5e]/70 hover:bg-[#162e5e] rounded-full p-3 transition"
                aria-label="Previous Image"
              >
                <ChevronLeft size={28} />
              </button>

              {/* Next */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-[#1f7a3a]/70 hover:bg-[#1f7a3a] rounded-full p-3 transition"
                aria-label="Next Image"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery;
