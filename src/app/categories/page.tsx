import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import productsData from "@/data/products.json";

export const metadata = {
  title: "All Categories | Tucker Tools",
  description:
    "Browse professional power tools by category: Drills, Saws, Impact Wrenches, Grinders, Outdoor Power Equipment, and Combo Kits.",
};

const categories = [
  {
    name: "Drills & Drivers",
    slug: "drills-drivers",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth={2.5}>
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
    slug: "saws",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth={2.5}>
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
    slug: "impact-wrenches-drivers",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth={2.5}>
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
    slug: "grinders-sanders",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth={2.5}>
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
    slug: "outdoor-power-equipment",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth={2.5}>
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
    slug: "combo-kits-sets",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth={2.5}>
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

export default function CategoriesPage() {
  return (
    <>
      <Header />
      <main className="bg-brand-black min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10">
            <Link href="/" className="hover:text-brand-yellow transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-300">Categories</span>
          </nav>

          {/* Page Header */}
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-widest text-white uppercase">
              Shop by Category
            </h1>
            <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
              Find the right professional power tools for every job.
            </p>
            <div className="mt-4 mx-auto w-24 h-1 bg-brand-yellow rounded-full" />
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const count = productsData.filter((p) => p.category === cat.name).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="group relative bg-[#2d2d2d] border border-neutral-700/50 rounded-lg overflow-hidden
                             transition-all duration-300 hover:-translate-y-1.5
                             hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)]
                             hover:border-yellow-400/30"
                >
                  {/* Yellow accent bar */}
                  <div className="h-1 w-full bg-brand-yellow" />

                  <div className="p-8 flex items-start gap-6">
                    <div className="shrink-0 text-brand-yellow group-hover:scale-110 transition-transform duration-200">
                      {cat.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-white leading-tight group-hover:text-brand-yellow transition-colors">
                        {cat.name}
                      </h2>
                      <p className="text-sm text-gray-400 mt-2">
                        {count} product{count !== 1 ? "s" : ""} available
                      </p>
                    </div>
                    <div className="shrink-0 self-center text-gray-500 group-hover:text-brand-yellow group-hover:translate-x-1 transition-all duration-200">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
