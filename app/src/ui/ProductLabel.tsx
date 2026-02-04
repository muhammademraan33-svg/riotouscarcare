import { useState } from "react";
import type { StepId } from "../pages/Home";
import { STEP_LABEL_IMAGES } from "./ProductDetailsPanel";

export function ProductLabel({
  activeStepId,
  width,
}: {
  activeStepId: StepId;
  width: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const labelImage = STEP_LABEL_IMAGES[activeStepId] || STEP_LABEL_IMAGES.grip;

  // Only show on desktop (≥1024px)
  if (width < 1024) {
    return null;
  }

  return (
    <>
      {/* Product Label - Right of PIZ, large and prominent, vertically aligned with product name */}
      <div className="flex items-start justify-start h-full min-h-[400px] overflow-visible">
        <button
          onClick={() => setIsModalOpen(true)}
          className="relative group cursor-pointer transition-transform hover:scale-105"
          aria-label="View full product label"
        >
          {/* Large, prominent label - aligned to start (top) to match product name position */}
          <img
            src={labelImage}
            alt="Product Label"
            className="max-h-[600px] w-auto object-contain object-left"
            style={{
              filter: "drop-shadow(0 0 20px rgba(255,107,53,0.3))",
            }}
            loading="lazy"
            onError={(e) => {
              console.error("Failed to load product label image:", labelImage);
              // Hide broken image
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          {/* Hover indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg">
            <div className="text-white text-sm font-bold tracking-wider">
              Click to view full label
            </div>
          </div>
        </button>
      </div>

      {/* Modal / Lightbox for full label */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-[#FF6B35] transition-colors z-10"
              aria-label="Close"
            >
              ×
            </button>
            
            {/* Full label image */}
            <img
              src={labelImage}
              alt="Full Product Label"
              className="max-w-full max-h-full object-contain"
              loading="lazy"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
