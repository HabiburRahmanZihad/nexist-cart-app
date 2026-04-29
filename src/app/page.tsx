import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyNexist } from "@/components/home/WhyNexist";

export const metadata = {
  title: "Nexist — Premium Shopping",
  description:
    "Discover a curated collection of premium products. Free shipping over $100.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <WhyNexist />
      <CategoriesSection />
      <Testimonials />
      <NewsletterCTA />
    </>
  );
}
