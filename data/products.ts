import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Savanah Pro Watch",
    description: "Smart fitness and lifestyle watch",
    price: 8999,
    originalPrice: 10999,
    category: "Smartwatches",
    image: "/products/smartwatch.jpg",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
    type: "simple",
  },

  {
    id: 2,
    name: "UltraBook Pro 14",
    description: "Powerful laptop for work and creativity",
    price: 79999,
    category: "Laptops",
    image: "/products/laptop.jpg",
    rating: 4.9,
    reviews: 86,
    badge: "New",
    type: "variable",

    options: [
      {
        name: "RAM",
        values: ["8GB", "16GB", "32GB"],
      },
      {
        name: "Storage",
        values: ["256GB", "512GB", "1TB"],
      },
      {
        name: "Color",
        values: ["Black", "Silver"],
      },
    ],

    variants: [
      {
        id: 201,
        options: {
          RAM: "8GB",
          Storage: "256GB",
          Color: "Black",
        },
        price: 79999,
        stock: 10,
        sku: "UBP-8-256-BLK",
      },

      {
        id: 202,
        options: {
          RAM: "16GB",
          Storage: "512GB",
          Color: "Black",
        },
        price: 94999,
        stock: 7,
        sku: "UBP-16-512-BLK",
      },

      {
        id: 203,
        options: {
          RAM: "16GB",
          Storage: "512GB",
          Color: "Silver",
        },
        price: 96999,
        stock: 5,
        sku: "UBP-16-512-SLV",
      },

      {
        id: 204,
        options: {
          RAM: "32GB",
          Storage: "1TB",
          Color: "Silver",
        },
        price: 119999,
        stock: 3,
        sku: "UBP-32-1TB-SLV",
      },
    ],
  },

  {
    id: 3,
    name: "Savanah Buds Pro",
    description: "Wireless noise-cancelling earbuds",
    price: 6999,
    originalPrice: 8999,
    category: "Audio",
    image: "/products/earbuds.jpg",
    rating: 4.7,
    reviews: 213,
    badge: "Sale",
    type: "simple",
  },

  {
    id: 4,
    name: "Vision X Camera",
    description: "4K mirrorless camera for creators",
    price: 64999,
    category: "Cameras",
    image: "/products/camera.jpg",
    rating: 4.8,
    reviews: 67,
    type: "simple",
  },
];