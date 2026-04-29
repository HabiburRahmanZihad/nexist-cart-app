import { ProductGrid } from "@/components/product/ProductGrid";

function Hero() {
  return (
    <section className="border-b border-border/40 bg-linear-to-br from-primary/5 via-background to-accent/10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            Free shipping on orders over $100
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Shop what you
            <span className="text-primary"> love.</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover our handpicked collection of premium products — from
            cutting-edge electronics to timeless fashion essentials.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductGrid />
    </>
  );
}
