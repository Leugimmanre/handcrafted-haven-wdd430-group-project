"use client";
import { formatCurrency, getImagePath } from "@/utils";
import Link from "next/link";
import { ProductWithCategory } from "@/app/admin/products/page";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";


type ProductTableProps = {
  products: ProductWithCategory;
};
export default function UserProductTable({ products }: ProductTableProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPrice, setSelectedPrice] = useState<string>("Any");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handlePriceChange = (value: string) => {
    setSelectedPrice(value);
  };

  const uniqueCategories = [
    "Ceramics and Pottery",
    "Textiles and Fabrics",
    "Handmade Jewelry",
    "Wood and Carpentry"
  ];

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" || product.category.name === selectedCategory;
    const priceMatch =
      selectedPrice === "Any" ||
      (selectedPrice === "Under $50" && product.price < 50) ||
      (selectedPrice === "$50 - $100" && product.price >= 50 && product.price <= 100) ||
      (selectedPrice === "Over $100" && product.price > 100);
    const searchMatch =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && priceMatch && searchMatch;
  });

  return (
    <div className="flex ">

      <Sidebar
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        selectedPrice={selectedPrice}
        onPriceChange={handlePriceChange}
        uniqueCategories={uniqueCategories}
      />

      {/* Product Table */}
      <div className="w-3/4 px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => {
              const imagePath = getImagePath(product.image);
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.id}/details`}
                >
                  <div className="border bg-white shadow-lg rounded-lg overflow-hidden group hover:bg-gray-200 transition duration-200">
                    <div className="relative w-full h-64">
                      <Image
                        layout="fill"
                        objectFit="cover"
                        src={imagePath}
                        alt={`${product.name} product image`}
                        className="rounded-t-lg group-hover:opacity-80 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </div>
                    <div className="p-4 text-center group-hover:text-gray-900">
                      <h3 className="text-md font-bold">{product.name}</h3>
                      <p className="mt-2 font-black text-2xl text-amber-500">
                        {formatCurrency(product.price)}
                      </p>
                      <p className="mt-2 text-gray-700">
                        <span className="font-bold">Category:</span>{" "}
                        {product.category.name}
                      </p>
                      <p className="mt-2 text-gray-700">
                        <span className="font-bold">Artisan:</span>{" "}
                        {product.artisan.name}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
