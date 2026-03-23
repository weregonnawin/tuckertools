export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Industrial grid pattern - CSS only */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,158,11,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Diagonal texture lines */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(255,255,255,0.5) 20px,
            rgba(255,255,255,0.5) 21px
          )`,
        }}
      />

      {/* Radial glow behind headline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-yellow/[0.03] rounded-full blur-3xl" />

      {/* Corner brackets - industrial framing */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-brand-yellow/20 hidden md:block" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-brand-yellow/20 hidden md:block" />
      <div className="absolute bottom-20 left-8 w-16 h-16 border-b-2 border-l-2 border-brand-yellow/20 hidden md:block" />
      <div className="absolute bottom-20 right-8 w-16 h-16 border-b-2 border-r-2 border-brand-yellow/20 hidden md:block" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-brand-yellow/30 bg-brand-yellow/5">
          <span className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-yellow">
            Authorized Dealer &mdash; Top Brands
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-heading leading-[0.9] tracking-tight mb-6">
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white">
            PROFESSIONAL
          </span>
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-orange">
            POWER TOOLS
          </span>
        </h1>

        {/* Subtext with heavy rule */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="w-24 h-1 bg-brand-yellow mx-auto mb-6" />
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 font-medium tracking-wide">
            Built for the Job. Backed by the Best Brands.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-16">
          <a
            href="#categories"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand-yellow hover:bg-brand-yellow-dark text-brand-black font-bold text-base uppercase tracking-wider transition-all duration-200 btn-industrial w-full sm:w-auto justify-center"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                clipRule="evenodd"
              />
            </svg>
            Browse Catalog
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-brand-steel hover:border-brand-yellow text-white font-bold text-base uppercase tracking-wider transition-all duration-200 w-full sm:w-auto justify-center"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Request a Quote
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm uppercase tracking-wider text-gray-500 font-semibold">
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-brand-yellow/60" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Authorized Dealer
          </span>
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-brand-yellow/60" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Free Shipping on $99+
          </span>
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-brand-yellow/60" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Expert Support
          </span>
        </div>
      </div>

      {/* Bottom yellow accent stripe */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 bg-gradient-to-r from-transparent via-brand-yellow to-transparent" />
        <div className="hazard-stripes h-2 opacity-40" />
      </div>
    </section>
  );
}
