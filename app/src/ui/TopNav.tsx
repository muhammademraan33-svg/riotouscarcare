export function TopNav() {
  return (
    <header className="relative border-b border-[#333333]/50 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] backdrop-blur-sm overflow-visible z-10">
      {/* Metallic texture overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(255,255,255,0.03) 2px,
          rgba(255,255,255,0.03) 4px
        )`
      }} />
      
      <div className="relative mx-auto max-w-[1920px] px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3">
        {/* Mobile Layout: Logo + Text side by side */}
        <div className="flex lg:hidden items-center justify-between">
          {/* Left: Logo Image - Overlapping and hanging down */}
          <div className="relative flex items-center gap-0.5 sm:gap-1 md:gap-2">
            {/* Logo positioned to overlap header and extend below - larger and on top layer */}
            <div className="absolute -top-2 sm:-top-6 md:-top-8 -left-1 sm:-left-3 md:-left-4 z-50" style={{ pointerEvents: 'auto' }}>
              <img
                src="/riot-logo.png"
                alt="RIOT GARAGE Logo"
                className="h-20 w-20 sm:h-36 sm:w-36 md:h-44 md:w-44 object-contain flex-shrink-0 drop-shadow-[0_10px_24px_rgba(0,0,0,1)]"
              />
            </div>
            {/* Spacer to push text to the right of overlapping logo */}
            <div className="w-16 sm:w-28 md:w-36" />
            {/* Center: Riot Garage Detail System Text */}
            <div className="relative z-10 flex-1 min-w-0 ml-2 sm:ml-0">
              <h1 
                className="text-[10px] sm:text-xl md:text-2xl font-black tracking-[0.16em] uppercase"
                style={{
                  color: '#FFFFFF',
                  textShadow: `
                    0 0 15px rgba(255,107,53,0.9),
                    0 0 30px rgba(255,107,53,0.7),
                    0 0 45px rgba(255,107,53,0.5),
                    0 0 60px rgba(255,140,90,0.3),
                    0 2px 4px rgba(0,0,0,0.8)
                  `,
                  filter: 'drop-shadow(0 0 12px rgba(255,107,53,0.8))'
                }}
              >
                Riot Garage Detail System
              </h1>
            </div>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 relative z-10">
            {/* Cloud with "5" text */}
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9 flex items-center justify-center">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm md:text-base font-semibold text-white">5</span>
            </div>

            {/* Bell with orange dot */}
            <div className="relative h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9 flex items-center justify-center">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <div className="absolute top-0.5 sm:top-1 right-0.5 sm:right-1 md:top-1.5 md:right-1.5 h-1.5 w-1.5 sm:h-2 sm:w-2 md:h-2.5 md:w-2.5 rounded-full bg-[#FF6B35] shadow-[0_0_8px_rgba(255,107,53,0.9)]" />
            </div>

            {/* Heart icon (red/glowing) */}
            <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9 flex items-center justify-center">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-red-500" fill="currentColor" viewBox="0 0 20 20" style={{ filter: 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.9))' }}>
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Hamburger menu in orange glowing button */}
            <button className="relative h-7 px-2 sm:h-8 sm:px-3 md:h-10 md:px-4 rounded border-2 border-[#FF6B35]/60 bg-[#FF6B35]/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,107,53,0.5)] hover:bg-[#FF6B35]/30 transition-colors">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Layout (≥1024px): Logo (left), Centered Text, Icons (right) */}
        <div className="hidden lg:flex items-center justify-between relative">
          {/* Left: Logo Image - Overlapping and hanging down */}
          <div className="relative flex items-center">
            {/* Logo positioned to overlap header and extend below - larger and on top layer */}
            <div className="absolute -top-8 -left-4 z-50" style={{ pointerEvents: 'auto' }}>
              <img
                src="/riot-logo.png"
                alt="RIOT GARAGE Logo"
                className="h-52 w-52 object-contain flex-shrink-0 drop-shadow-[0_10px_24px_rgba(0,0,0,1)]"
              />
            </div>
            {/* Spacer to account for logo width */}
            <div className="w-44" />
          </div>

          {/* Center: Riot Garage Detail System Text - Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
            <h1 
              className="text-3xl font-black tracking-[0.16em] uppercase whitespace-nowrap"
              style={{
                color: '#FFFFFF',
                textShadow: `
                  0 0 15px rgba(255,107,53,0.9),
                  0 0 30px rgba(255,107,53,0.7),
                  0 0 45px rgba(255,107,53,0.5),
                  0 0 60px rgba(255,140,90,0.3),
                  0 2px 4px rgba(0,0,0,0.8)
                `,
                filter: 'drop-shadow(0 0 12px rgba(255,107,53,0.8))'
              }}
            >
              Riot Garage Detail System
            </h1>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-4 relative z-10 ml-auto">
            {/* Cloud with "5" text */}
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 flex items-center justify-center">
                <svg className="h-6 w-6 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                </svg>
              </div>
              <span className="text-base font-semibold text-white">5</span>
            </div>

            {/* Bell with orange dot */}
            <div className="relative h-9 w-9 flex items-center justify-center">
              <svg className="h-6 w-6 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <div className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-[#FF6B35] shadow-[0_0_8px_rgba(255,107,53,0.9)]" />
            </div>

            {/* Heart icon (red/glowing) */}
            <div className="h-9 w-9 flex items-center justify-center">
              <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 20 20" style={{ filter: 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.9))' }}>
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Hamburger menu in orange glowing button */}
            <button className="relative h-10 px-4 rounded border-2 border-[#FF6B35]/60 bg-[#FF6B35]/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,107,53,0.5)] hover:bg-[#FF6B35]/30 transition-colors">
              <svg className="h-6 w-6 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
