import type { Metadata } from "next";
import Heading from "../../components/ui/Heading";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ToastNotification from "@/components/ui/ToastNotification";
import UserProductTable from "@/components/products/UserProductsTable";
import UserPagination from "@/components/products/UserPagination";
import ProductSearchFormUser from "@/components/products/ProductSearchFormUser";
import Session from "@/components/session/Session";

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
  title: "Products | Handcrafted Haven",
  description: "SEO Title",
  keywords: ["Products Page"],
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  const pageSize = 10;

  if (page < 0) {
    redirect("/products");
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
    redirect("/products");
  }
  return (
    <>
      <ToastNotification/>
      <div
        className="flex flex-col lg:flex-row lg:justify-between gap-5"
        >
        <Heading>Handcrafted Haven Products</Heading>
        <Session/>
        <ProductSearchFormUser/>
      </div>
      <UserProductTable
        products={products}
      />
      <UserPagination
        page={page}
        totalPages={totalPages}
      />
    </>
  );
}
