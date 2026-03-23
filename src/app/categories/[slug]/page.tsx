import { notFound } from "next/navigation";
import type { Metadata } from "next";
import productsData from "@/data/products.json";
import brandsData from "@/data/brands.json";
import CategoryPageClient from "./CategoryPageClient";

const categoryMap: Record<string, string> = {
  "drills-drivers": "Drills & Drivers",
  "saws": "Saws",
  "impact-wrenches-drivers": "Impact Wrenches & Drivers",
  "grinders-sanders": "Grinders & Sanders",
  "outdoor-power-equipment": "Outdoor Power Equipment",
  "combo-kits-sets": "Combo Kits & Sets",
};

export function generateStaticParams() {
  return Object.keys(categoryMap).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const categoryName = categoryMap[params.slug];
  if (!categoryName) return { title: "Category Not Found | Tucker Tools" };

  const count = productsData.filter((p) => p.category === categoryName).length;
  return {
    title: `${categoryName} | Tucker Tools`,
    description: `Browse ${count} professional ${categoryName.toLowerCase()} from top brands. Request a quote from Tucker Tools today.`,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = categoryMap[params.slug];
  if (!categoryName) notFound();

  const products = productsData.filter((p) => p.category === categoryName);

  // Build a brand lookup for only the brands present in this category
  const brandNames = Array.from(new Set(products.map((p) => p.brand)));
  const brands = brandsData.filter((b) => brandNames.includes(b.name));

  return (
    <CategoryPageClient
      categoryName={categoryName}
      products={products}
      brands={brands}
    />
  );
}
