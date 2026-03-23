"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Brand = {
  name: string;
  slug: string;
  color: string;
  logo: string;
  tagline: string;
  description: string;
};

type Product = {
  name: string;
  brand: string;
  category: string;
  image: string;
  description: string;
  model: string;
  slug: string;
};

/* ---------- product card with image error fallback ---------- */
function ProductCard({
  product,
  brandColor,
  brandInitial,
}: {
  product: Product;
  brandColor: string;
  brandInitial: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg bg-brand-charcoal border border-neutral-700/50
                 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_24px_rgba(250,204,21,0.12)]
                 hover:border-yellow-400/30"
    >
      {/* Image */}
      <div className="relative w-full aspect-square bg-neutral-800 overflow-hidden">
        {imgError ? (
          <div
            className="w-full h-full flex items-center justify-center text-5xl font-black text-white/80"
            style={{ backgroundColor: brandColor + "30" }}
          >
            {brandInitial}
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            unoptimized
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5 gap-2">
        {/* Brand badge */}
        <span className="self-start text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20">
          {product.brand}
        </span>

        <h3 className="text-base font-bold text-white leading-snug line-clamp-2 group-hover:text-brand-yellow transition-colors">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 font-mono">
          Model: {product.model}
        </p>

        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mt-auto">
          {product.description}
        </p>

        {/* CTA */}
        <div className="mt-3 pt-3 border-t border-neutral-700/50">
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-yellow group-hover:text-white transition-colors">
            Request Quote
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ---------- client component ---------- */
export default function CategoryPageClient({
  categoryName,
  products,
  brands,
}: {
  categoryName: string;
  products: Product[];
  brands: Brand[];
}) {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);

  const visibleProducts = activeBrand
    ? products.filter((p) => p.brand === activeBrand)
    : products;

  // Map brand name -> brand data for quick lookup
  const brandMap = Object.fromEntries(brands.map((b) => [b.name, b]));

  return (
    <>
      <Header />
      <main className="bg-brand-black min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-brand-yellow transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-brand-yellow transition-colors">
              Categories
            </Link>
            <span>/</span>
            <span className="text-gray-300">{categoryName}</span>
          </nav>

          {/* Category Hero */}
          <div
            className="relative rounded-xl overflow-hidden mb-12 p-8 sm:p-12"
            style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, #1a1a1a 60%)",
              borderLeft: "4px solid #f59e0b",
            }}
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide uppercase">
              {categoryName}
            </h1>
            <div className="mt-3 text-sm text-gray-500">
              {products.length} product{products.length !== 1 ? "s" : ""} available
            </div>
          </div>

          {/* Back link */}
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-brand-yellow transition-colors mb-8"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to All Categories
          </Link>

          {/* Brand Filter Pills */}
          {brands.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveBrand(null)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeBrand === null
                    ? "bg-brand-yellow text-brand-black border-brand-yellow"
                    : "bg-transparent text-gray-400 border-neutral-600 hover:border-brand-yellow hover:text-brand-yellow"
                }`}
              >
                All ({products.length})
              </button>
              {brands
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((brand) => {
                  const count = products.filter((p) => p.brand === brand.name).length;
                  return (
                    <button
                      key={brand.slug}
                      onClick={() => setActiveBrand(activeBrand === brand.name ? null : brand.name)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                        activeBrand === brand.name
                          ? "bg-brand-yellow text-brand-black border-brand-yellow"
                          : "bg-transparent text-gray-400 border-neutral-600 hover:border-brand-yellow hover:text-brand-yellow"
                      }`}
                    >
                      {brand.name} ({count})
                    </button>
                  );
                })}
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleProducts.map((product) => {
              const brand = brandMap[product.brand];
              return (
                <ProductCard
                  key={product.slug}
                  product={product}
                  brandColor={brand?.color || "#f59e0b"}
                  brandInitial={product.brand[0]}
                />
              );
            })}
          </div>

          {visibleProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products found for this brand.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
