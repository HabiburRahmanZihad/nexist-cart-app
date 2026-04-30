import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyNexist } from "@/components/home/WhyNexist";
import { HeroOdyssey } from "@/components/ui/hero-odyssey";

export const metadata = {
  title: "Nexist — Premium Shopping",
  description:
    "Discover a curated collection of premium products. Free shipping over $100.",
};

export default function HomePage() {
  return (
    <>
      <HeroOdyssey />
      <FeaturedProducts />
      <WhyNexist />
      <CategoriesSection />
      <Testimonials />
      <NewsletterCTA />
    </>
  );
}
