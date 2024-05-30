import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import ToastNotification from "@/components/ui/ToastNotification";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import Session from "@/components/session/Session";

export const metadata: Metadata = {
  title: "Orders | Handcrafted Haven",
  description: "SEO Title",
  keywords: ["Orders Page"],
};

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
    include: {
      artisan: true,
    },
  });
  return products;
}

export default async function OrderPage({
  params,
}: {
  params: { category: string };
}) {
  const products = await getProducts(params.category);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Heading>Choose and customize your order</Heading>
        <ToastNotification />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
