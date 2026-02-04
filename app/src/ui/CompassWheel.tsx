import type { StepId } from "../pages/Home";
import { STEPS } from "../pages/Home";

// Map step numbers to step IDs
const STEP_NUMBER_TO_ID: Record<string, StepId> = {
  "01": "grip",
  "02": "purge",
  "03": "assault",
  "04": "clarity",
  "05": "cockpit",
  "06": "revive",
  "07": "lustre",
  "08": "shield",
};

export function CompassWheel({
  activeStepId,
  onStepClick,
  width,
}: {
  activeStepId: StepId;
  onStepClick?: (id: StepId) => void;
  width?: number;
}) {
  const activeStep = STEPS.find((s) => s.id === activeStepId);
  const activeStepNumber = activeStep?.number || null;

  // Responsive sizing based on screen width
  const isMobile = width ? width < 768 : typeof window !== 'undefined' && window.innerWidth < 768;
  const isTablet = width ? width >= 768 && width < 1024 : typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
  
  const compassSize = isMobile ? 80 : isTablet ? 110 : 140;
  const fontSize = isMobile ? 12 : isTablet ? 11 : 14; // Increased from 8 to 12 for mobile

  return (
    <div className="flex flex-col items-center">
      <div className={`font-bold tracking-[0.2em] text-[#D4A574] uppercase mb-1 text-center ${
        isMobile ? 'text-[6px]' : isTablet ? 'text-[8px]' : 'text-[10px]'
      }`}>
        THE RIOT LINE™
      </div>
      <div className={`font-bold tracking-[0.15em] text-white uppercase mb-2 text-center ${
        isMobile ? 'text-[5px] mb-1.5' : isTablet ? 'text-[7px] mb-2' : 'text-[9px] mb-3'
      }`}>
        8 STEP SYSTEM
      </div>
      
      {/* Compass SVG */}
      <div className={`relative mb-1 sm:mb-2`} style={{ width: `${compassSize}px`, height: `${compassSize}px` }}>
        <svg width={compassSize} height={compassSize} viewBox="0 0 140 140" className="absolute inset-0 w-full h-full">
          {Array.from({ length: 8 }).map((_, i) => {
            const stepNumber = String(i + 1).padStart(2, '0');
            const isActive = stepNumber === activeStepNumber;
            const centerX = 70;
            const centerY = 70;
            // Keep original proportions in 140x140 viewBox, scale happens via container
            const radius = 60;
            const innerRadiusScaled = 20;
            const startAngle = (i * 45 - 90) * Math.PI / 180;
            const endAngle = ((i + 1) * 45 - 90) * Math.PI / 180;
            
            const x1 = centerX + innerRadiusScaled * Math.cos(startAngle);
            const y1 = centerY + innerRadiusScaled * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(startAngle);
            const y2 = centerY + radius * Math.sin(startAngle);
            const x3 = centerX + radius * Math.cos(endAngle);
            const y3 = centerY + radius * Math.sin(endAngle);
            const x4 = centerX + innerRadiusScaled * Math.cos(endAngle);
            const y4 = centerY + innerRadiusScaled * Math.sin(endAngle);
            
            const pathD = `M ${x1} ${y1} L ${x2} ${y2} A ${radius} ${radius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadiusScaled} ${innerRadiusScaled} 0 0 0 ${x1} ${y1}`;
            
            const midAngle = (startAngle + endAngle) / 2;
            const textRadiusScaled = radius - 14;
            const textX = centerX + textRadiusScaled * Math.cos(midAngle);
            const textY = centerY + textRadiusScaled * Math.sin(midAngle);
            
            return (
              <g key={i}>
                <path
                  d={pathD}
                  fill={isActive ? "#FF6B35" : "#2a2a2a"}
                  stroke={isActive ? "#FF6B35" : "#4a4a4a"}
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => {
                    const stepId = STEP_NUMBER_TO_ID[stepNumber];
                    if (stepId && onStepClick) {
                      onStepClick(stepId);
                    }
                  }}
                  style={{
                    filter: isActive ? "drop-shadow(0 0 8px rgba(255,107,53,0.8))" : "none",
                  }}
                />
                <text
                  x={textX}
                  y={textY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#ffffff"
                  fontSize={fontSize}
                  fontWeight="900"
                  fontFamily="Arial, sans-serif"
                  className="cursor-pointer select-none"
                  onClick={() => {
                    const stepId = STEP_NUMBER_TO_ID[stepNumber];
                    if (stepId && onStepClick) {
                      onStepClick(stepId);
                    }
                  }}
                  style={{
                    textShadow: isActive ? "0 0 8px rgba(255,107,53,0.8)" : "none",
                    pointerEvents: "all",
                  }}
                >
                  {stepNumber}
                </text>
              </g>
            );
          })}
          {/* Center circle */}
          <circle
            cx="70"
            cy="70"
            r="20"
            fill="#2a2a2a"
            stroke="#B87333"
            strokeWidth={isMobile ? "1.5" : isTablet ? "1.75" : "2"}
          />
        </svg>
      </div>
      
      {/* Step label below compass */}
      {activeStepNumber && (
        <div className="text-center">
          <div className={`font-bold tracking-[0.1em] text-white uppercase mb-0.5 ${
            isMobile ? 'text-[6px]' : isTablet ? 'text-[8px]' : 'text-[10px]'
          }`}>
            STEP {activeStepNumber}
          </div>
          <div className={`font-black tracking-[0.1em] text-[#D4A574] uppercase ${
            isMobile ? 'text-[8px]' : isTablet ? 'text-[11px]' : 'text-[14px]'
          }`}>
            {activeStep?.label || "GRIP"}
          </div>
        </div>
      )}
    </div>
  );
}
