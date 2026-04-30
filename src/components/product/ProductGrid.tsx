"use client";

import { Input } from "@/components/ui/input";
import productsData from "@/data/products.json";
import { cn } from "@/lib/utils";
import { Category, Product } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  LayoutList,
  PackageSearch,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { ProductCard } from "./ProductCard";

const products = productsData as Product[];

const CATEGORIES: Category[] = ["All", "Electronics", "Fashion", "Home", "Sports", "Books"];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviewed" },
];

const PER_PAGE = 12;

function getCategoryCount(cat: Category) {
  return cat === "All" ? products.length : products.filter((p) => p.category === cat).length;
}

interface ProductGridProps {
  initialCategory?: string;
}

export function ProductGrid({ initialCategory }: ProductGridProps) {
  const resolvedCategory =
    initialCategory && (CATEGORIES as string[]).includes(initialCategory)
      ? (initialCategory as Category)
      : "All";

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>(resolvedCategory);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"grid" | "list">("grid");
  const topRef = useRef<HTMLDivElement>(null);

  const scrollTop = () => {
    const y = (topRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 90;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let result = products.filter((p) => {
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      return matchSearch && matchCat;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        result = [...result].sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [search, activeCategory, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const rangeStart = filtered.length === 0 ? 0 : (safePage - 1) * PER_PAGE + 1;
  const rangeEnd = Math.min(safePage * PER_PAGE, filtered.length);

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setPage(1);
    scrollTop();
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    scrollTop();
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleSortChange = (val: string) => {
    setSort(val);
    setPage(1);
  };

  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "…")[] = [1];
    if (safePage > 3) pages.push("…");
    for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) pages.push(i);
    if (safePage < totalPages - 2) pages.push("…");
    pages.push(totalPages);
    return pages;
  };

  return (
    <section ref={topRef} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* ── Toolbar ── */}
      <div className="mb-8 space-y-4">
        {/* Row 1 — search / sort / view */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search products…"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 bg-card border-border/60 focus-visible:border-primary/50"
              aria-label="Search products"
            />
          </div>

          {/* Sort + View Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Sort select */}
            <div className="relative">
              <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                aria-label="Sort products"
                className="h-9 appearance-none rounded-lg border border-border/60 bg-card pl-8 pr-8 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer hover:border-primary/40"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </div>

            {/* Grid / List toggle */}
            <div className="flex overflow-hidden rounded-lg border border-border/60 bg-card">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-label={v === "grid" ? "Grid view" : "List view"}
                  onClick={() => setView(v)}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center transition-colors duration-150",
                    view === v
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {v === "grid" ? <Grid3X3 className="h-4 w-4" /> : <LayoutList className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 — Category chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-[1.03]"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {cat}
              <span className={cn("ml-1.5 text-xs", activeCategory === cat ? "opacity-70" : "opacity-50")}>
                {getCategoryCount(cat)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Results meta ── */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filtered.length === 0 ? (
            "No products found"
          ) : (
            <>
              Showing{" "}
              <span className="font-semibold text-foreground">{rangeStart}–{rangeEnd}</span>
              {" "}of{" "}
              <span className="font-semibold text-foreground">{filtered.length}</span> products
            </>
          )}
        </p>
        {totalPages > 1 && (
          <p className="text-sm text-muted-foreground">
            Page <span className="font-semibold text-foreground">{safePage}</span> of{" "}
            <span className="font-semibold text-foreground">{totalPages}</span>
          </p>
        )}
      </div>

      {/* ── Grid / Empty ── */}
      <AnimatePresence mode="wait">
        {paginated.length > 0 ? (
          <motion.div
            key={`${activeCategory}-${search}-${sort}-${safePage}-${view}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className={cn(
              "grid gap-5",
              view === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            )}
          >
            {paginated.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} layout={view} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 py-28 text-center"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
              <PackageSearch className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-semibold">No products found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search term or category.
            </p>
            <button
              type="button"
              onClick={() => { setSearch(""); setActiveCategory("All"); setPage(1); }}
              className="mt-5 rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 flex items-center justify-center gap-1.5"
        >
          {/* Prev */}
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => handlePageChange(safePage - 1)}
            disabled={safePage === 1}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-card text-muted-foreground transition-all hover:border-primary/50 hover:text-primary disabled:pointer-events-none disabled:opacity-35"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Page numbers */}
          {getPageNumbers().map((p, i) =>
            p === "…" ? (
              <span key={`ellipsis-${i}`} className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground">
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                aria-label={`Page ${p}`}
                aria-current={safePage === p ? "page" : undefined}
                onClick={() => handlePageChange(p as number)}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200",
                  safePage === p
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-110"
                    : "border border-border/60 bg-card text-muted-foreground hover:border-primary/50 hover:text-primary"
                )}
              >
                {p}
              </button>
            )
          )}

          {/* Next */}
          <button
            type="button"
            aria-label="Next page"
            onClick={() => handlePageChange(safePage + 1)}
            disabled={safePage === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-card text-muted-foreground transition-all hover:border-primary/50 hover:text-primary disabled:pointer-events-none disabled:opacity-35"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </section>
  );
}
