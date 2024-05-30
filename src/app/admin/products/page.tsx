import type { Metadata } from "next";
import Heading from "../../../components/ui/Heading";
import { prisma } from "@/lib/prisma";
import ProductTable from "@/components/products/ProductsTable";
import ProductsPagination from "@/components/products/ProductsPagination";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ToastNotification from "@/components/ui/ToastNotification";

async function productCount() {
  return await prisma.product.count();
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true,
      artisan: true,
    },
  });
  return products;
}

export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>;

export const metadata: Metadata = {
  title: "Admin | Handcrafted Haven",
  description: "SEO Title",
  keywords: ["Admin Page"],
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  const pageSize = 10;

  if (page < 0) {
    redirect("/admin/products");
  }

  const productsData = await getProducts(page, pageSize);
  const totalProductsData = await productCount();
  // Parallel queries
  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);
  // Calculate products per pages
  const totalPages = Math.ceil(totalProducts / pageSize);
  if (page > totalPages) {
    redirect("/admin/products");
  }
  return (
    <>
      <Heading>Manage Products</Heading>
      <ToastNotification/>
      <div
        className="flex flex-col lg:flex-row lg:justify-between gap-5"
      >
        <Link
          href={'/admin/products/new'}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >
          Create Products
        </Link>
        <ProductSearchForm/>
      </div>
      <ProductTable
        products={products}
      />
      <ProductsPagination
        page={page}
        totalPages={totalPages}
      />
    </>
  );
}
