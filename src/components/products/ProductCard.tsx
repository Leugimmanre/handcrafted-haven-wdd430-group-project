import { Product } from "@prisma/client";
import { formatCurrency, getImagePath } from "../../utils/index";
import Image from "next/legacy/image";
import Link from "next/link";
import AddProductButtonDetail from "./AddProductButtonDetail";

type ProductCardProps = {
  product: Product;
};
export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image);

  return (
    <div className="border bg-white">
      <Link href={`/products/${product.id}/details`}>
        <div className="relative w-full h-96">
          <Image
            src={imagePath}
            alt={`${product.name} product image`}
            width={400}
            height={500}
            layout="responsive"
            objectFit="cover"
            priority
          />
        </div>
      </Link>
      <div className="p-5">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <div className="">
          <Link
            href={`/products/${product.id}/details`}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Details
            <span className="sr-only">, {product.name}</span>
          </Link>
        </div>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatCurrency(product.price)}
        </p>
        <AddProductButtonDetail product={product} />
      </div>
    </div>
  );
}
