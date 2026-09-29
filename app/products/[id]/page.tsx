
import { notFound } from "next/navigation";
import {products} from "@/data/products";
import ProductDetails from "@/components/products/ProductDetails";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = products.find(
    (product) => product.id === Number(id)
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="flex min-h-125 items-center justify-center rounded-3xl border border-border bg-surface-light">
            <div className="text-9xl">📦</div>
          </div>

          {/* Product Information */}
       
            <div className="flex flex-col justify-center">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">
                    {product.category}
                </p>

                <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                     {product.name}
                </h1>

                <p className="mt-5 text-lg leading-relaxed text-muted">
                    {product.description}
                 </p>

        <div className="mt-6 flex items-center gap-3">
            <span className="text-primary">★</span>

            <span className="font-medium">
                 {product.rating}
                 </span>

                <span className="text-muted">
                ({product.reviews} reviews)
                </span>
        </div>

        <ProductDetails product={product} />
    </div>
        </div>
      </div>
    </main>
  );
}