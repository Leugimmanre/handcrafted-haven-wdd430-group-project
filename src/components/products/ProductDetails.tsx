"use client";

import { Artisan, Category, Product } from "@prisma/client";
import { formatCurrency, getImagePath } from "../../utils/index";
import Image from "next/image";
import AddProductButtonDetail from "./AddProductButtonDetail";

type ProductDetailsProps = {
  product: Product & { category: Category; artisan: Artisan };
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const imagePath = getImagePath(product.image);

  return (
    <div className="max-w-sm mx-auto border bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative w-full h-96">
        <Image
          width={400}
          height={200}
          layout="responsive"
          objectFit="cover"
          src={imagePath}
          alt={`${product.name} product image`}
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="mt-3 font-black text-xl text-amber-500">
          {formatCurrency(product.price)}
        </p>
        <p className="mt-3 text-gray-700">
          <span className="font-bold">Description: </span>
          {product.description}
        </p>
        <p className="mt-3 text-gray-700">
          <span className="font-bold">Category:</span> {product.category.name}
        </p>
        <p className="mt-3 text-gray-700">
          <span className="font-bold">Artisan:</span> {product.artisan.name}
        </p>
        <p className="mt-3 text-gray-700">
          <span className="font-bold">About Artisan:</span> {product.artisan.about}
        </p>
        <div className="mt-15">
          <AddProductButtonDetail product={product} />
        </div>
      </div>
    </div>
  );
}
