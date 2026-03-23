const categories = [
  {
    name: "Drills & Drivers",
    count: "120+ Products",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={2.5}>
        <rect x="6" y="18" width="20" height="12" rx="2" />
        <rect x="26" y="20" width="12" height="8" rx="1" />
        <line x1="38" y1="24" x2="44" y2="24" strokeLinecap="round" />
        <circle cx="16" cy="24" r="3" />
        <rect x="10" y="12" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    name: "Saws",
    subtitle: "Circular, Miter, Reciprocating",
    count: "95+ Products",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={2.5}>
        <circle cx="24" cy="24" r="16" />
        <circle cx="24" cy="24" r="4" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1={24 + 10 * Math.cos((angle * Math.PI) / 180)}
            y1={24 + 10 * Math.sin((angle * Math.PI) / 180)}
            x2={24 + 16 * Math.cos(((angle + 10) * Math.PI) / 180)}
            y2={24 + 16 * Math.sin(((angle + 10) * Math.PI) / 180)}
            strokeLinecap="round"
          />
        ))}
      </svg>
    ),
  },
  {
    name: "Impact Wrenches & Drivers",
    count: "80+ Products",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={2.5}>
        <rect x="8" y="20" width="16" height="8" rx="2" />
        <polygon points="24,18 36,22 36,26 24,30" />
        <rect x="36" y="20" width="6" height="8" rx="1" />
        <line x1="14" y1="28" x2="14" y2="36" strokeLinecap="round" />
        <line x1="10" y1="36" x2="18" y2="36" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Grinders & Sanders",
    count: "70+ Products",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={2.5}>
        <circle cx="24" cy="24" r="14" />
        <circle cx="24" cy="24" r="6" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
        <line x1="24" y1="10" x2="24" y2="4" strokeLinecap="round" />
        <line x1="20" y1="4" x2="28" y2="4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Outdoor Power Equipment",
    count: "60+ Products",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={2.5}>
        <rect x="6" y="16" width="14" height="16" rx="3" />
        <rect x="20" y="20" width="18" height="8" rx="2" />
        <line x1="38" y1="24" x2="44" y2="20" strokeLinecap="round" />
        <line x1="38" y1="24" x2="44" y2="24" strokeLinecap="round" />
        <line x1="38" y1="24" x2="44" y2="28" strokeLinecap="round" />
        <circle cx="13" cy="24" r="3" />
      </svg>
    ),
  },
  {
    name: "Combo Kits & Sets",
    count: "45+ Products",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth={2.5}>
        <rect x="6" y="12" width="36" height="24" rx="3" />
        <line x1="6" y1="18" x2="42" y2="18" />
        <rect x="16" y="14" width="16" height="4" rx="1" />
        <line x1="16" y1="24" x2="22" y2="24" strokeLinecap="round" />
        <line x1="16" y1="28" x2="26" y2="28" strokeLinecap="round" />
        <line x1="16" y1="32" x2="20" y2="32" strokeLinecap="round" />
        <circle cx="34" cy="28" r="4" />
      </svg>
    ),
  },
];

export default function CategoryGrid() {
  return (
    <section id="categories" className="bg-[#0a0a0a] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            Browse by{" "}
            <span className="text-[#f59e0b]">Category</span>
          </h2>
          <div className="mt-3 mx-auto w-20 h-1 bg-[#f59e0b]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className="group relative bg-[#2d2d2d] border-l-4 border-[#f59e0b] rounded-sm p-6 flex items-start gap-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(245,158,11,0.15)] hover:bg-[#333333]"
            >
              <div className="shrink-0 text-[#f59e0b] group-hover:scale-110 transition-transform duration-200">
                {cat.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  {cat.name}
                </h3>
                {cat.subtitle && (
                  <p className="text-sm text-neutral-400 mt-0.5">{cat.subtitle}</p>
                )}
                <p className="text-sm text-[#f59e0b] font-semibold mt-2">
                  {cat.count}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
