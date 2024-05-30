import { formatCurrency, getImagePath } from "@/utils";
import Link from "next/link";
import { ProductWithCategory } from "@/app/admin/products/page";
import Image from "next/image";


type ProductTableProps = {
  products: ProductWithCategory;
};
export default function UserProductTable({ products }: ProductTableProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => {
            const imagePath = getImagePath(product.image);
            return (
              <div
                key={product.id}
                className="border bg-white shadow-lg rounded-lg"
              >
                <Link href={`/products/${product.id}/details`}>
                  <div className="relative w-full h=50">
                    <Image
                      width={150} // Ajuste de ancho
                      height={150} // Ajuste de alto
                      layout="fixed"
                      objectFit="cover"
                      src={imagePath}
                      alt={`${product.name} product image`}
                    />{" "}
                  </div>
                </Link>
                <div className="p-3">
                  <h3 className="text-md font-bold">{product.name}</h3>
                  <p className="mt-2 font-black text-lg text-amber-500">
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
                  <div className="mt-3">
                    <Link
                      href={`/products/${product.id}/details`}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Details
                      <span className="sr-only">, {product.name}</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
