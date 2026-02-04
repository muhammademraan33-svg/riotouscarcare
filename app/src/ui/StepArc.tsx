import { useState, useEffect } from "react";
import type { Step, StepId } from "../pages/Home";
import { CompassWheel } from "./CompassWheel";

// Map intervention product IDs to their abbreviations
const INTERVENTION_ABBREVIATIONS: Record<StepId, string> = {
  "x-dirty": "DD",
  "x-extract": "TRACT",
  "x-blaq": "SSR",
  "x-fal": "FALL",
  "x-field": "FW",
  "z-fortify": "FORT",
  // Regular steps (not used, but needed for type safety)
  grip: "",
  purge: "",
  assault: "",
  clarity: "",
  cockpit: "",
  revive: "",
  lustre: "",
  shield: "",
};

export function StepArc({
  steps,
  activeId,
  onStepClick,
  interventionProduct,
}: {
  steps: Step[];
  activeId: StepId;
  onStepClick?: (id: StepId) => void;
  interventionProduct?: {
    id: StepId;
    name: string;
    position: 'between-1-2' | 'between-3-4' | 'after-8' | 'replaces-1-2';
  } | null;
}) {
  // Find Step 08 (shield) for compass placement check
  const step08 = steps.find(s => s.id === 'shield');
  // Responsive sizing
  const [dimensions, setDimensions] = useState({ width: 1100, height: 480 });
  
  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth < 768) {
        setDimensions({ width: 400, height: 280 });
      } else if (window.innerWidth < 1024) {
        setDimensions({ width: 800, height: 360 });
      } else {
        setDimensions({ width: 1100, height: 480 });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  const { width, height } = dimensions;

  // Normalized arch parameters (0–1 space), tuned to follow the background curve
  // More spacing on mobile to prevent circles from being too close
  const leftX = width < 768 ? 0.12 : 0.08; // more space from left on mobile
  const rightX = width < 768 ? 0.88 : 0.92; // more space from right on mobile
  const baseY = 0.80; // baseline slightly lower to hug the glow
  const curveHeight = 0.36; // even higher center for more pronounced curve

  // Create combined array of all items (steps + intervention if active)
  type ArcItem = { type: 'step'; step: Step } | { type: 'intervention'; id: StepId; name: string; position: string };
  const allItems: ArcItem[] = [];
  
  // Add intervention product at the correct position in the sequence
  if (interventionProduct) {
    if (interventionProduct.position === 'replaces-1-2') {
      // For replaces-1-2, add intervention first, then skip grip and purge
      allItems.push({ 
        type: 'intervention', 
        id: interventionProduct.id, 
        name: interventionProduct.name,
        position: interventionProduct.position
      });
      steps.forEach(step => {
        if (step.id !== 'grip' && step.id !== 'purge') {
          allItems.push({ type: 'step', step });
        }
      });
    } else {
      // For other positions, insert intervention at the correct point
      steps.forEach(step => {
        allItems.push({ type: 'step', step });
        
        // Insert intervention product after specific steps
        if (interventionProduct.position === 'between-1-2' && step.id === 'grip') {
          allItems.push({ 
            type: 'intervention', 
            id: interventionProduct.id, 
            name: interventionProduct.name,
            position: interventionProduct.position
          });
        } else if (interventionProduct.position === 'between-3-4' && step.id === 'assault') {
          allItems.push({ 
            type: 'intervention', 
            id: interventionProduct.id, 
            name: interventionProduct.name,
            position: interventionProduct.position
          });
        } else if (interventionProduct.position === 'after-8' && step.id === 'shield') {
          allItems.push({ 
            type: 'intervention', 
            id: interventionProduct.id, 
            name: interventionProduct.name,
            position: interventionProduct.position
          });
        }
      });
    }
  } else {
    // No intervention, just add all steps
    steps.forEach(step => {
      allItems.push({ type: 'step', step });
    });
  }

  // Calculate positions for all items evenly distributed along the arc
  const points = allItems.map((item, index) => {
    const totalItems = allItems.length;
    const t = totalItems === 1 ? 0 : index / (totalItems - 1); // 0 → 1
    const xNorm = leftX + (rightX - leftX) * t;
    const arch = 1 - (2 * t - 1) * (2 * t - 1); // 0 at ends, 1 at center (parabola)
    const yNorm = baseY - curveHeight * arch;

    return {
      item,
      x: xNorm * width,
      y: yNorm * height,
    };
  });

  const arcPath = (() => {
    if (!points.length) return "";
    const [first, ...rest] = points;
    return [
      `M ${first.x.toFixed(1)} ${first.y.toFixed(1)}`,
      ...rest.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`),
    ].join(" ");
  })();

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-[#333333] bg-black/60"
      style={{
        height: `${height}px`,
        backgroundImage: "url(/Banner-Product2.png)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay to match cinematic look but keep image visible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />

      {/* Arc line behind the circles - Moderate brightness with glow */}
      {/* Use stroke-dasharray to create gaps at circle positions */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="pointer-events-none absolute inset-x-0 top-0 h-full w-full"
        preserveAspectRatio="none"
        style={{ filter: 'drop-shadow(0 0 12px rgba(255,107,53,0.5))' }}
      >
        <defs>
          {/* Create a mask to hide arc line where circles are */}
          <mask id="arcMask">
            <rect width="100%" height="100%" fill="white" />
            {points.map((p) => {
              // Calculate circle radius based on screen size
              const circleRadius = width < 768 ? 24 : width < 1024 ? 40 : 64;
              return (
                <circle
                  key={p.item.type === 'step' ? p.item.step.id : p.item.id}
                  cx={p.x}
                  cy={p.y}
                  r={circleRadius}
                  fill="black"
                />
              );
            })}
          </mask>
        </defs>
        
        {/* Outer glow - masked to not pass through circles */}
        <path
          d={arcPath}
          fill="none"
          stroke="rgba(255,107,53,0.4)"
          strokeWidth={width < 768 ? 8 : width < 1024 ? 12 : 16}
          strokeLinecap="round"
          style={{ filter: 'blur(6px)', mask: 'url(#arcMask)' }}
        />
        {/* Middle glow - masked */}
        <path
          d={arcPath}
          fill="none"
          stroke="rgba(255,140,90,0.5)"
          strokeWidth={width < 768 ? 5 : width < 1024 ? 7 : 10}
          strokeLinecap="round"
          style={{ filter: 'blur(3px)', mask: 'url(#arcMask)' }}
        />
        {/* Inner core - masked */}
        <path
          d={arcPath}
          fill="none"
          stroke="rgba(255,107,53,0.7)"
          strokeWidth={width < 768 ? 2.5 : width < 1024 ? 3.5 : 5}
          strokeLinecap="round"
          style={{ mask: 'url(#arcMask)' }}
        />
        {/* Center line - masked */}
        <path
          d={arcPath}
          fill="none"
          stroke="rgba(255,184,107,0.8)"
          strokeWidth={width < 768 ? 1.5 : width < 1024 ? 2 : 3}
          strokeLinecap="round"
          style={{ mask: 'url(#arcMask)' }}
        />
      </svg>

      {/* Step circles positioned along the arc */}
      <div className="pointer-events-none absolute inset-0">
        {points.map((p) => {
          const item = p.item;
          if (item.type === 'step') {
            const isActive = item.step.id === activeId;
            return (
              <button
                key={item.step.id}
                type="button"
                onClick={() => onStepClick?.(item.step.id)}
                className="pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center focus:outline-none"
                style={{
                  left: `${(p.x / width) * 100}%`,
                  top: `${(p.y / height) * 100}%`,
                }}
              >
                <span
                  className={`font-semibold tracking-[0.2em] uppercase mb-1 sm:mb-1.5 md:mb-2 ${
                    isActive 
                      ? "text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] text-[#FF6B35]/90" 
                      : "text-[5px] sm:text-[8px] md:text-[9px] lg:text-[10px] text-white/60"
                  }`}
                >
                  {item.step.category}
                </span>
                <div
                  className={`mb-2 sm:mb-3 md:mb-4 flex flex-col items-center justify-center rounded-full border-[2px] transition-all ${
                    isActive
                      ? "h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-32 lg:w-32 border-[#FF6B35] bg-[#FF6B35]/25 shadow-[0_0_30px_rgba(255,107,53,0.8),0_0_45px_rgba(255,140,90,0.5)]"
                      : "h-8 w-8 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-32 lg:w-32 border-[#FF6B35]/50 bg-black/70 shadow-[0_0_12px_rgba(255,107,53,0.4)]"
                  }`}
                  style={{
                    filter: isActive ? 'drop-shadow(0 0 15px rgba(255,107,53,0.7))' : 'drop-shadow(0 0 6px rgba(255,107,53,0.3))'
                  }}
                >
                  <span
                    className={`font-bold tracking-[0.15em] uppercase leading-tight ${
                      isActive 
                        ? "text-[5px] sm:text-[6px] md:text-[7px] lg:text-[10px] text-[#FF6B35]" 
                        : "text-[4px] sm:text-[6px] md:text-[7px] lg:text-[10px] text-white/70"
                    }`}
                  >
                    Step
                  </span>
                  <span
                    className={`font-black tracking-[0.24em] leading-tight ${
                      isActive 
                        ? "text-[12px] sm:text-sm md:text-base lg:text-2xl text-[#FF6B35]" 
                        : "text-[9px] sm:text-sm md:text-base lg:text-2xl text-white/80"
                    }`}
                  >
                    {item.step.number}
                  </span>
                </div>
                <span
                  className={`font-semibold tracking-[0.24em] ${
                    isActive 
                      ? "text-[9px] sm:text-[10px] md:text-sm lg:text-base text-[#FF6B35]" 
                      : "text-[7px] sm:text-[10px] md:text-sm lg:text-base text-white/75"
                  }`}
                >
                  {item.step.label}
                </span>
              </button>
            );
          } else {
            // Intervention product
            const isActive = item.id === activeId;
            const position = item.position;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onStepClick?.(item.id)}
                className="pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center focus:outline-none"
                style={{
                  left: `${(p.x / width) * 100}%`,
                  top: `${(p.y / height) * 100}%`,
                }}
              >
                {/* Category label */}
                <span
                  className={`font-semibold tracking-[0.2em] uppercase mb-1 sm:mb-1.5 md:mb-2 ${
                    isActive
                      ? "text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] text-[#FF6B35]/90"
                      : "text-[5px] sm:text-[8px] md:text-[9px] lg:text-[10px] text-white/60"
                  }`}
                >
                  {position === 'between-1-2' || position === 'replaces-1-2' 
                    ? 'PRE-WASH' 
                    : position === 'between-3-4' 
                    ? 'DECON' 
                    : 'ENHANCE'}
                </span>
                
                {/* Circle - same style as regular steps */}
                <div
                  className={`mb-2 sm:mb-3 md:mb-4 flex flex-col items-center justify-center rounded-full border-[2px] transition-all ${
                    isActive
                      ? "h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-32 lg:w-32 border-[#FF6B35] bg-[#FF6B35]/25 shadow-[0_0_30px_rgba(255,107,53,0.8),0_0_45px_rgba(255,140,90,0.5)]"
                      : "h-8 w-8 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-32 lg:w-32 border-[#FF6B35]/50 bg-black/70 shadow-[0_0_12px_rgba(255,107,53,0.4)]"
                  }`}
                  style={{
                    filter: isActive ? 'drop-shadow(0 0 15px rgba(255,107,53,0.7))' : 'drop-shadow(0 0 6px rgba(255,107,53,0.3))'
                  }}
                >
                  <span className={`font-bold tracking-[0.15em] uppercase leading-tight ${
                    isActive
                      ? "text-[5px] sm:text-[6px] md:text-[7px] lg:text-[10px] text-[#FF6B35]"
                      : "text-[4px] sm:text-[6px] md:text-[7px] lg:text-[10px] text-white/70"
                  }`}>
                    INT
                  </span>
                  <span className={`font-black tracking-[0.24em] leading-tight ${
                    isActive
                      ? "text-[10px] sm:text-xs md:text-sm lg:text-xl text-[#FF6B35]"
                      : "text-[7px] sm:text-xs md:text-sm lg:text-xl text-white/80"
                  }`}>
                    {INTERVENTION_ABBREVIATIONS[item.id] || 
                     item.name.split('-')[1]?.substring(0, 2).toUpperCase() || 
                     item.name.split(' ')[0].replace('X-', '').replace('Z-', '').substring(0, 2).toUpperCase()}
                  </span>
                </div>
                
                {/* Product name label */}
                <span className={`font-semibold tracking-[0.24em] text-center ${
                  isActive
                    ? "text-[9px] sm:text-[10px] md:text-sm lg:text-base text-[#FF6B35]"
                    : "text-[7px] sm:text-[10px] md:text-sm lg:text-base text-white/75"
                }`}>
                  {item.name}
                </span>
              </button>
            );
          }
        })}
      </div>

      {/* Compass Wheel - Upper right corner, above Step 08 (only show for regular 8-step products, NOT for intervention products) */}
      {!interventionProduct && step08 && (
        <div 
          className="absolute z-20"
          style={{
            right: width < 768 ? '0.5rem' : width < 1024 ? '1rem' : '1.5rem',
            top: width < 768 ? '0.5rem' : width < 1024 ? '0.75rem' : '1rem',
          }}
        >
          <CompassWheel 
            activeStepId={activeId}
            onStepClick={onStepClick}
            width={width}
          />
        </div>
      )}
    </div>
  );
}
