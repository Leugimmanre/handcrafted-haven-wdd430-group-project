import ProductDetails from "@/components/products/ProductDetails";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { useSession } from "next-auth/react";

async function getProductById(id: number) {
  const {} = useSession
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      artisan: true,
    },
  });
  if (!product) {
    notFound();
  }

  return product;
}

export default async function ProductsPageDetails({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(+params.id);

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <Heading>Product Detail: {product.name}</Heading>
        <ProductDetails product={product} />
        <div className="p-10">
          <GoBackButton />
        </div>
      </div>
    </>
  );
}
