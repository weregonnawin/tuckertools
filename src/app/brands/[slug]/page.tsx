import { notFound } from "next/navigation";
import type { Metadata } from "next";
import brandsData from "@/data/brands.json";
import productsData from "@/data/products.json";
import BrandPageClient from "./BrandPageClient";

export function generateStaticParams() {
  return brandsData.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const brand = brandsData.find((b) => b.slug === params.slug);
  if (!brand) return { title: "Brand Not Found | Tucker Tools" };
  return {
    title: `${brand.name} Power Tools | Tucker Tools`,
    description: `Shop ${brand.name} professional power tools. ${brand.tagline}. ${brand.description}`,
  };
}

export default function BrandPage({ params }: { params: { slug: string } }) {
  const brand = brandsData.find((b) => b.slug === params.slug);
  if (!brand) notFound();

  const brandProducts = productsData.filter((p) => p.brand === brand.name);

  return <BrandPageClient brand={brand} products={brandProducts} />;
}
