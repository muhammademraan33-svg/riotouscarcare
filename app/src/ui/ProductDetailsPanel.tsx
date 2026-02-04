import { useState, useEffect } from "react";
import type { StepId } from "../pages/Home";
import { STEPS, STEP_DATA } from "../pages/Home";

// Product label images from new-brand folder (Front & Back labels)
const STEP_LABEL_IMAGES: Record<StepId, string> = {
  grip: "/new-brand/GRIP — STEP 01-Front & Back.png",
  purge: "/new-brand/PURGE — STEP 02-Front & Back.png",
  assault: "/new-brand/ASSAULT — STEP 03-Front & Back.png",
  clarity: "/new-brand/CLARITY — STEP 04-Front & Back.png",
  cockpit: "/new-brand/COCKPIT — STEP 05-Front & Back.png",
  revive: "/new-brand/REVIVE — STEP 06-Front & Back.png",
  lustre: "/new-brand/LUSTRE — STEP 07-Front & Back.png",
  shield: "/new-brand/SHIELD — STEP 08-Front & Back.png",
  "x-dirty": "/new-iz/X·DIRTY DETAILS-Front & Back.png",
  "x-extract": "/new-iz/X·TRACT-Front & Back.png",
  "x-blaq": "/new-iz/X·SEE SPOT RUN-Front & Back.png",
  "x-fal": "/new-iz/X FALLOUT-Front & Back.png",
  "x-field": "/new-iz/X·FIELD WASH-Front & Back.png",
  "z-fortify": "/new-iz/Z·FORTIFY-Front & Back.png",
};

// Car graphic background images for each step (subtle background in PIZ)
const STEP_BACKGROUND_IMAGES: Record<StepId, string> = {
  grip: "/step-grip.png",
  purge: "/step-purge.png",
  assault: "/step-assault.png",
  clarity: "/step-clarity.png",
  cockpit: "/step-surface.png",
  revive: "/step-ops-center.png",
  lustre: "/step-lustre.png",
  shield: "/step-shield.png",
  "x-dirty": "/step-grip.png", // Use default for intervention products
  "x-extract": "/step-grip.png",
  "x-blaq": "/step-grip.png",
  "x-fal": "/step-grip.png",
  "x-field": "/step-grip.png",
  "z-fortify": "/step-grip.png",
};

// Export label images mapping for use in ProductLabel component
export { STEP_LABEL_IMAGES };

export function ProductDetailsPanel({ 
  activeStepId,
  onReturnToRiotLine
}: { 
  activeStepId: StepId;
  onReturnToRiotLine?: () => void;
}) {
  const activeStep = STEPS.find((s) => s.id === activeStepId);
  const stepData = STEP_DATA[activeStepId];
  const isInterventionProduct = !activeStep;
  const backgroundImage = STEP_BACKGROUND_IMAGES[activeStepId] || "/step-grip.png";
  
  // Responsive min height
  const [minHeight, setMinHeight] = useState("400px");
  
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setMinHeight("300px");
      } else if (w < 1024) {
        setMinHeight("350px");
      } else {
        setMinHeight("400px");
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // If stepData is not found, show error message
  if (!stepData) {
    console.error("Step data not found for:", activeStepId, "Available keys:", Object.keys(STEP_DATA));
    return (
      <div className="relative rounded-xl border border-[#333333] h-auto w-full bg-[#0A0A0A] p-8">
        <div className="text-white">Product data not found for: {activeStepId}</div>
      </div>
    );
  }

  return (
    <div
      className="relative rounded-xl overflow-visible border border-[#333333] h-auto w-full transition-all duration-500 bg-[#0A0A0A]"
      style={{
        minHeight,
      }}
    >
      {/* Zone Label - Above product name, positioned relative to container */}
      <div className="absolute -top-2 sm:-top-2.5 md:-top-3 left-3 sm:left-4 md:left-6 z-30">
        <div className="bg-black/80 border border-[#333333] px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 rounded">
          <div className="text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">
            Product Information Zone™
          </div>
        </div>
      </div>

      {/* Car graphic as subtle background - show on all screens */}
      <div 
        className="absolute inset-0 bg-cover bg-right-top bg-no-repeat rounded-xl opacity-15"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          zIndex: 1,
        }}
      />

      {/* Content - Clean vertical stack (Phase 4) */}
      <div className="relative z-10 flex flex-col p-4 sm:p-5 md:p-6 pt-6 sm:pt-7 md:pt-8">
        {/* Product Name - Prominent */}
        <div className="text-2xl sm:text-3xl md:text-4xl font-black tracking-[0.16em] text-white mb-2">
          {stepData.name}
        </div>

        {/* SKU - Secondary */}
        <div className="text-sm sm:text-base font-semibold tracking-wider text-white/60 mb-2">
          {stepData.productCode}
        </div>

        {/* Show "Not part of the 8-Step System" and Return button for intervention products */}
        {isInterventionProduct && (
          <>
            <div className="text-sm font-medium italic tracking-wider text-white/50 mb-3">
              Not part of the 8-Step System
            </div>
            {/* Return to Riot Line Button */}
            {onReturnToRiotLine && (
              <div className="mb-4">
                <button
                  onClick={onReturnToRiotLine}
                  className="rounded-lg bg-[#D4A574] hover:bg-[#B87333] px-6 py-2.5 text-sm font-bold tracking-wider text-black transition-colors shadow-[0_0_15px_rgba(212,165,116,0.3)]"
                >
                  ← RETURN TO RIOT LINE
                </button>
              </div>
            )}
          </>
        )}

        {/* Short Description */}
        <div className="text-base sm:text-lg text-white/80 mb-6">
          {stepData.shortDescription}
        </div>

        {/* What It Is */}
        <div className="mb-4 bg-black/30 p-4 rounded-lg">
          <div className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-white/50 mb-2 uppercase">
            What It Is
          </div>
          <p className="text-sm sm:text-base text-white/85">
            {stepData.whatItIs}
          </p>
        </div>

        {/* Capabilities */}
        <div className="mb-4 bg-black/30 p-4 rounded-lg">
          <div className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-white/50 mb-2 uppercase">
            Capabilities
          </div>
          <p className="text-sm sm:text-base text-white/85">
            {stepData.capabilities}
          </p>
        </div>

        {/* Deployment Protocol */}
        <div className="mb-4 bg-black/30 p-4 rounded-lg">
          <div className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-white/50 mb-2 uppercase">
            Deployment Protocol
          </div>
          <p className="text-sm sm:text-base text-white/85">
            {stepData.deploymentProtocol}
          </p>
        </div>

        {/* Good to Know */}
        <div className="mb-4 bg-black/30 p-4 rounded-lg">
          <div className="text-xs sm:text-sm font-semibold tracking-[0.24em] text-white/50 mb-2 uppercase">
            Good to Know
          </div>
          <p className="text-sm sm:text-base text-white/85">
            {stepData.goodToKnow}
          </p>
        </div>

        {/* ADD TO GO-BAG Button */}
        <div className="flex justify-center mt-6 mb-4">
          <button className="rounded-lg bg-[#FF6B35] px-8 py-3 text-base font-bold tracking-wider text-white shadow-[0_0_20px_rgba(255,107,53,0.4)] hover:bg-[#FF8C5A] transition-colors">
            + ADD TO GO-BAG
          </button>
        </div>
      </div>
    </div>
  );
}
