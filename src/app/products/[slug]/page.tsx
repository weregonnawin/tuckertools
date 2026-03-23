import { notFound } from "next/navigation";
import type { Metadata } from "next";
import brandsData from "@/data/brands.json";
import productsData from "@/data/products.json";
import ProductPageClient from "./ProductPageClient";

export function generateStaticParams() {
  return productsData.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = productsData.find((p) => p.slug === params.slug);
  if (!product) return { title: "Product Not Found | Tucker Tools" };
  return {
    title: `${product.name} | ${product.brand} | Tucker Tools`,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = productsData.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const brand = brandsData.find((b) => b.name === product.brand) ?? null;

  /* Related products: same brand + same category, excluding self, max 4 */
  const related = productsData
    .filter(
      (p) =>
        p.slug !== product.slug &&
        p.brand === product.brand &&
        p.category === product.category
    )
    .slice(0, 4);

  return (
    <ProductPageClient product={product} brand={brand} related={related} />
  );
}
