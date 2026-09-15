import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import Categories from "@/components/products/Categories";
import FeaturedProducts from "@/components/products/FeaturedProducts";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Categories />
        <FeaturedProducts/>
      </main>
    </>
  );
}