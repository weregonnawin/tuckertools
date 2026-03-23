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
} | null;

type Product = {
  name: string;
  brand: string;
  category: string;
  image: string;
  description: string;
  model: string;
  slug: string;
};

/* ---------- image with error fallback ---------- */
function ProductImage({
  src,
  alt,
  brandColor,
  brandInitial,
  large,
}: {
  src: string;
  alt: string;
  brandColor: string;
  brandInitial: string;
  large?: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div
        className={`w-full flex items-center justify-center text-white/80 font-black ${
          large ? "h-[400px] text-8xl" : "h-full text-4xl"
        }`}
        style={{ backgroundColor: brandColor + "25" }}
      >
        {brandInitial}
      </div>
    );
  }

  if (large) {
    return (
      <div className="relative w-full h-[400px]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-6"
          unoptimized
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-square">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        unoptimized
        onError={() => setImgError(true)}
      />
    </div>
  );
}

/* ---------- client component ---------- */
export default function ProductPageClient({
  product,
  brand,
  related,
}: {
  product: Product;
  brand: Brand;
  related: Product[];
}) {
  const brandColor = brand?.color ?? "#f59e0b";
  const brandSlug = brand?.slug ?? "";
  const brandInitial = product.brand[0];

  return (
    <>
      <Header />
      <main className="bg-brand-black min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-10">
            <Link href="/" className="hover:text-brand-yellow transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/brands" className="hover:text-brand-yellow transition-colors">
              Brands
            </Link>
            <span>/</span>
            <Link
              href={`/brands/${brandSlug}`}
              className="hover:text-brand-yellow transition-colors"
            >
              {product.brand}
            </Link>
            <span>/</span>
            <span className="text-gray-300 line-clamp-1">{product.name}</span>
          </nav>

          {/* Product Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
            {/* Image */}
            <div className="rounded-xl overflow-hidden bg-brand-charcoal border border-neutral-700/50">
              <ProductImage
                src={product.image}
                alt={product.name}
                brandColor={brandColor}
                brandInitial={brandInitial}
                large
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-5">
              {/* Brand + Category */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/brands/${brandSlug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded border transition-colors"
                  style={{
                    color: brandColor,
                    borderColor: brandColor + "40",
                    backgroundColor: brandColor + "10",
                  }}
                >
                  {brand && (
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={20}
                      height={16}
                      className="object-contain"
                      unoptimized
                    />
                  )}
                  {product.brand}
                </Link>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-gray-500 font-mono">
                Model: {product.model}
              </p>

              <div className="h-px bg-neutral-700/50" />

              <p className="text-gray-300 leading-relaxed text-lg">
                {product.description}
              </p>

              <div className="h-px bg-neutral-700/50" />

              {/* Specs summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-dark rounded-lg p-4 border border-neutral-700/30">
                  <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Brand</span>
                  <span className="text-white font-bold">{product.brand}</span>
                </div>
                <div className="bg-brand-dark rounded-lg p-4 border border-neutral-700/30">
                  <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Model</span>
                  <span className="text-white font-bold font-mono">{product.model}</span>
                </div>
                <div className="bg-brand-dark rounded-lg p-4 border border-neutral-700/30 col-span-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Category</span>
                  <span className="text-white font-bold">{product.category}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-yellow hover:bg-brand-yellow-dark text-brand-black font-bold text-base uppercase tracking-wider transition-all duration-200 rounded-lg"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Request a Quote
                </a>
                <Link
                  href={`/brands/${brandSlug}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-neutral-600 hover:border-brand-yellow text-gray-300 hover:text-brand-yellow font-bold text-base uppercase tracking-wider transition-all duration-200 rounded-lg"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  More {product.brand}
                </Link>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-neutral-700/50" />
                <h2 className="text-xl font-bold text-white uppercase tracking-wider whitespace-nowrap">
                  Related Products
                </h2>
                <div className="h-px flex-1 bg-neutral-700/50" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/products/${rp.slug}`}
                    className="group flex flex-col overflow-hidden rounded-lg bg-brand-charcoal border border-neutral-700/50
                               transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_24px_rgba(250,204,21,0.12)]
                               hover:border-yellow-400/30"
                  >
                    <div className="relative w-full aspect-square bg-neutral-800 overflow-hidden">
                      <ProductImage
                        src={rp.image}
                        alt={rp.name}
                        brandColor={brandColor}
                        brandInitial={brandInitial}
                      />
                    </div>
                    <div className="p-4 flex flex-col gap-1.5">
                      <span className="self-start text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-yellow/10 text-brand-yellow">
                        {rp.category}
                      </span>
                      <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-brand-yellow transition-colors">
                        {rp.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-mono">
                        {rp.model}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
