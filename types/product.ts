export interface ProductOption {
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: number;
  options: Record<string, string>;
  price: number;
  originalPrice?: number;
  stock: number;
  sku: string;
  image?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;//option
  category: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;

  type: "simple" | "variable";

  options?: ProductOption[];
  variants?: ProductVariant[];
}