import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import brandsData from "@/data/brands.json";

export const metadata = {
  title: "All Brands | Tucker Tools",
  description:
    "Browse our full lineup of professional power tool brands including Milwaukee, DeWalt, Makita, Bosch, Ryobi, and more.",
};

export default function BrandsPage() {
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
            <span className="text-gray-300">Brands</span>
          </nav>

          {/* Page Header */}
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-widest text-white uppercase">
              Our Brands
            </h1>
            <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
              Professional-grade power tools from the industry&apos;s most trusted manufacturers.
            </p>
            <div className="mt-4 mx-auto w-24 h-1 bg-brand-yellow rounded-full" />
          </div>

          {/* Brand Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {brandsData.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-lg
                           bg-brand-charcoal border border-neutral-700/50
                           transition-all duration-300 ease-out
                           hover:-translate-y-1.5
                           hover:shadow-[0_8px_30px_rgba(250,204,21,0.15)]
                           hover:border-yellow-400/30"
              >
                {/* Brand Color Accent Bar */}
                <div
                  className="h-1 w-full shrink-0"
                  style={{ backgroundColor: brand.color }}
                />

                {/* Card Body */}
                <div className="flex flex-col items-center justify-center flex-1 px-4 py-8 gap-3">
                  <div className="w-full h-16 flex items-center justify-center bg-white/90 rounded px-3">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={120}
                      height={48}
                      className="object-contain max-h-12"
                      unoptimized
                    />
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-white text-center leading-tight tracking-wide">
                    {brand.name}
                  </span>
                  <span className="text-xs text-gray-400 italic text-center">
                    {brand.tagline}
                  </span>
                </div>

                {/* View Products Link */}
                <div className="border-t border-neutral-700/50 px-4 py-3 text-center">
                  <span className="text-sm font-medium text-neutral-400 group-hover:text-yellow-400 transition-colors duration-300">
                    View Products
                    <span className="inline-block ml-1.5 transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
