const features = [
  {
    title: "Authorized Dealer",
    description: "Genuine products from top brands. Every tool backed by full manufacturer warranty.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={2.5}>
        <path d="M24 4L6 12v12c0 11 18 20 18 20s18-9 18-20V12L24 4z" />
        <polyline points="16,24 22,30 34,18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Competitive Pricing",
    description: "Best prices guaranteed. Bulk discounts available for contractors and businesses.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={2.5}>
        <circle cx="24" cy="24" r="18" />
        <line x1="24" y1="12" x2="24" y2="36" strokeLinecap="round" />
        <path d="M18 20c0-3.3 2.7-4 6-4s6 .7 6 4-2.7 4-6 4-6 .7-6 4 2.7 4 6 4 6-.7 6-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Expert Support",
    description: "Knowledgeable team ready to help you choose the right tool for every job.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={2.5}>
        <circle cx="24" cy="16" r="8" />
        <path d="M8 42c0-8.8 7.2-16 16-16s16 7.2 16 16" strokeLinecap="round" />
        <circle cx="36" cy="12" r="6" fill="#2d2d2d" stroke="currentColor" />
        <path d="M34 12h4m-2-2v4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Fast Shipping",
    description: "Quick delivery across the country. Most orders ship within 24 hours.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={2.5}>
        <rect x="2" y="14" width="28" height="18" rx="2" />
        <path d="M30 20h8l6 8v4h-14V20z" />
        <circle cx="14" cy="36" r="4" />
        <circle cx="38" cy="36" r="4" />
        <line x1="18" y1="36" x2="34" y2="36" />
        <line x1="2" y1="36" x2="10" y2="36" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="bg-[#111111] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            Why{" "}
            <span className="text-[#f59e0b]">Tucker Tools</span>
          </h2>
          <div className="mt-3 mx-auto w-20 h-1 bg-[#f59e0b]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="bg-[#2d2d2d] rounded-sm p-6 text-center border-t-2 border-[#f59e0b] hover:bg-[#333333] transition-colors duration-200"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] mb-5">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
