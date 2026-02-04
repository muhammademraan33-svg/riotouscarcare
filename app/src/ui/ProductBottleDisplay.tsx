import type { StepId } from "../pages/Home";

type InterventionProduct = {
  id: StepId;
  name: string;
  description: string;
  group: string;
};

const INTERVENTION_PRODUCTS: InterventionProduct[] = [
  {
    id: "x-dirty",
    name: "X·DIRTY DETAILS",
    description: "Heavy Soil Pre-Treatment",
    group: "Pre-Wash",
  },
  {
    id: "x-extract",
    name: "X·TRACT",
    description: "Organic Stain Removal",
    group: "Pre-Wash",
  },
  {
    id: "x-blaq",
    name: "X·SEE SPOT RUN",
    description: "Adhesive Removal",
    group: "Pre-Wash",
  },
  {
    id: "x-fal",
    name: "X·FALLOUT",
    description: "Iron Decontamination",
    group: "Post-Wash Decon",
  },
  {
    id: "x-field",
    name: "X·FIELD WASH",
    description: "Rinseless / Waterless",
    group: "Field Wash Alt",
  },
  {
    id: "z-fortify",
    name: "Z·FORTIFY",
    description: "Protective Barrier Treatment",
    group: "Post-Protection Enhancement",
  },
];

export function ProductBottleDisplay({
  activeStepId,
  onProductClick,
}: {
  activeStepId: StepId;
  onProductClick?: (id: StepId) => void;
}) {
  // Group products by their group label
  const groupedProducts = INTERVENTION_PRODUCTS.reduce((acc, product) => {
    if (!acc[product.group]) {
      acc[product.group] = [];
    }
    acc[product.group].push(product);
    return acc;
  }, {} as Record<string, InterventionProduct[]>);

  return (
    <div className="relative rounded-xl border border-[#333333] bg-black/40 p-4 sm:p-6 md:p-8 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex flex-col h-full overflow-visible">
      {/* Zone Label - Above content */}
      <div className="absolute -top-2 sm:-top-2.5 md:-top-3 left-3 sm:left-4 md:left-6 z-30">
        <div className="bg-black/80 border border-[#333333] px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 rounded">
          <div className="text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">
            Intervention Zone™
          </div>
        </div>
      </div>

      {/* Intervention Products - Vertical List, Grouped by Waypoint */}
      <div className="relative z-10 flex flex-col gap-4 sm:gap-5 md:gap-6 flex-1 overflow-y-auto pt-6 sm:pt-8">
        {Object.entries(groupedProducts).map(([groupLabel, products]) => (
          <div key={groupLabel} className="flex flex-col gap-2 sm:gap-3">
            {/* Group Label (Waypoint) */}
            <div className="text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.15em] text-[#D4A574] uppercase mb-1 sm:mb-2">
              {groupLabel}
            </div>
            
            {/* Products in this group - Vertical list */}
            <div className="flex flex-col gap-2 sm:gap-2.5">
              {products.map((product) => {
                const isActive = activeStepId === product.id;
                return (
                  <button
                    key={product.id}
                    onClick={() => onProductClick?.(product.id)}
                    className={`flex flex-col items-start justify-center p-3 sm:p-3.5 md:p-4 rounded-lg border-2 transition-all duration-300 text-left w-full ${
                      isActive
                        ? "bg-gradient-to-br from-[#FF6B35]/30 to-[#FF6B35]/20 border-[#FF6B35] shadow-[0_0_20px_rgba(255,107,53,0.5)]"
                        : "bg-black/50 border-[#333333] hover:border-[#FF6B35]/50 hover:bg-black/70"
                    }`}
                  >
                    <div
                      className={`text-sm sm:text-base md:text-lg font-black mb-1 sm:mb-1.5 ${
                        isActive ? "text-[#FF6B35]" : "text-white/80"
                      }`}
                    >
                      {product.name}
                    </div>
                    <div
                      className={`text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.1em] ${
                        isActive ? "text-white/90" : "text-white/60"
                      }`}
                    >
                      {product.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
