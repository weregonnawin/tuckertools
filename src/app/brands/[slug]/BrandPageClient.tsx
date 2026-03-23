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
      <div className="relative w-full aspect-square bg-white overflow-hidden">
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
        {/* Category badge */}
        <span className="self-start text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20">
          {product.category}
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
export default function BrandPageClient({
  brand,
  products,
}: {
  brand: Brand;
  products: Product[];
}) {
  const categories = Array.from(new Set(products.map((p) => p.category))).sort();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const visibleProducts = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

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
            <Link href="/brands" className="hover:text-brand-yellow transition-colors">
              Brands
            </Link>
            <span>/</span>
            <span className="text-gray-300">{brand.name}</span>
          </nav>

          {/* Brand Hero */}
          <div
            className="relative rounded-xl overflow-hidden mb-12 p-8 sm:p-12"
            style={{
              background: `linear-gradient(135deg, ${brand.color}18 0%, #1a1a1a 60%)`,
              borderLeft: `4px solid ${brand.color}`,
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-24 h-24 flex items-center justify-center bg-white rounded-lg p-3 shrink-0">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={80}
                  height={60}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide uppercase">
                  {brand.name}
                </h1>
                <p
                  className="text-lg font-semibold mt-1 italic"
                  style={{ color: brand.color }}
                >
                  {brand.tagline}
                </p>
                <p className="text-gray-400 mt-3 max-w-2xl leading-relaxed">
                  {brand.description}
                </p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              {products.length} product{products.length !== 1 ? "s" : ""} available
            </div>
          </div>

          {/* Back link */}
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-brand-yellow transition-colors mb-8"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to All Brands
          </Link>

          {/* Category Filter Pills */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeCategory === null
                    ? "bg-brand-yellow text-brand-black border-brand-yellow"
                    : "bg-transparent text-gray-400 border-neutral-600 hover:border-brand-yellow hover:text-brand-yellow"
                }`}
              >
                All ({products.length})
              </button>
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-brand-yellow text-brand-black border-brand-yellow"
                        : "bg-transparent text-gray-400 border-neutral-600 hover:border-brand-yellow hover:text-brand-yellow"
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                brandColor={brand.color}
                brandInitial={brand.name[0]}
              />
            ))}
          </div>

          {visibleProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
