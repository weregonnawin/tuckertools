"use client";

import Link from "next/link";

const brands = [
  { name: "Milwaukee", slug: "milwaukee", color: "#DB021D" },
  { name: "DeWalt", slug: "dewalt", color: "#FEBD17" },
  { name: "Makita", slug: "makita", color: "#00A6A0" },
  { name: "Ryobi", slug: "ryobi", color: "#8DC63F" },
  { name: "Bosch", slug: "bosch", color: "#005DAA" },
  { name: "CRAFTSMAN", slug: "craftsman", color: "#CC0000" },
  { name: "Ridgid", slug: "ridgid", color: "#FF6600" },
  { name: "Metabo HPT", slug: "metabo-hpt", color: "#00A651" },
  { name: "BLACK+DECKER", slug: "black-decker", color: "#F7941D" },
  { name: "Kobalt", slug: "kobalt", color: "#003DA5" },
] as const;

export default function BrandShowcase() {
  return (
    <section id="brands" className="bg-neutral-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-widest text-white uppercase">
            Shop by Brand
          </h2>
          <div className="mt-3 mx-auto w-24 h-1 bg-yellow-400 rounded-full" />
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-lg
                         bg-[#2d2d2d] border border-neutral-700/50
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
              <div className="flex flex-col items-center justify-center flex-1 px-4 py-10">
                <span className="text-lg sm:text-xl font-bold text-white text-center leading-tight tracking-wide">
                  {brand.name}
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
    </section>
  );
}
