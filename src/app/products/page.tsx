import { ProductGrid } from "@/components/product/ProductGrid";

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export const metadata = {
  title: "Products — Nexist",
  description:
    "Browse our full collection of 12 premium products across Electronics, Fashion, Home, Sports, and Books.",
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <>
      {/* Page Header */}
      <div className="border-b border-border/40 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Our Catalog
          </span>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
            All Products
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Every item is handpicked for quality and value. Use the search and
            filters below to find exactly what you need.
          </p>
        </div>
      </div>

      {/* Product Grid with optional URL-driven category filter */}
      <ProductGrid initialCategory={params.category} />
    </>
  );
}
