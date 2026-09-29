import Hero from "@/components/layout/Hero";
import Categories from "@/components/products/Categories";
import FeaturedProducts from "@/components/products/FeaturedProducts";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts/>
      </main>
    </>
  );
}