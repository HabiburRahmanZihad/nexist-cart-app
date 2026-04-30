import { ProductGrid } from "@/components/product/ProductGrid";
import { Package, ShoppingBag, Star, Truck } from "lucide-react";

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export const metadata = {
  title: "Products",
  description:
    "Browse our full collection of 48 premium products across Electronics, Fashion, Home, Sports, and Books.",
};

const STATS = [
  { icon: Package, value: "48", label: "Products" },
  { icon: ShoppingBag, value: "5", label: "Categories" },
  { icon: Star, value: "4.7★", label: "Avg. Rating" },
  { icon: Truck, value: "Free", label: "Shipping $100+" },
];

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <>
      {/* ── Premium page hero ── */}
      <div className="relative overflow-hidden border-b border-border/40">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-background to-accent/5" />
        <div className="pointer-events-none absolute -left-48 -top-24 h-125 w-125 rounded-full bg-primary/8 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            {/* Copy */}
            <div className="max-w-xl">
              {/* Breadcrumb */}
              <nav className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>Home</span>
                <span>/</span>
                <span className="font-medium text-foreground">Products</span>
              </nav>

              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <ShoppingBag className="h-3 w-3" />
                Our Full Catalog
              </span>

              <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                All{" "}
                <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                  Products
                </span>
              </h1>

              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                48 handpicked items across 5 categories — every product
                quality-checked for exceptional value. Search, sort, and filter
                to find exactly what you need.
              </p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/60 px-4 py-3 backdrop-blur-sm"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground">{value}</p>
                    <p className="truncate text-xs text-muted-foreground">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Product grid with filters, sort, pagination ── */}
      <ProductGrid initialCategory={params.category} />
    </>
  );
}
