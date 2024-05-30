import Heading from "@/components/ui/Heading";
import { prisma } from "@/lib/prisma";
import ProductSearchFormUser from "@/components/products/ProductSearchFormUser";
import UserProductTable from "@/components/products/UserProductsTable";
import GoBackButton from "@/components/ui/GoBackButton";
import { Prisma } from "@prisma/client";

async function searchProducts(searchTerm: string) {
  const price = parseFloat(searchTerm);

  const whereClause: Prisma.ProductWhereInput = {
    OR: [
      {
        name: {
          contains: searchTerm,
          mode: "insensitive" as Prisma.QueryMode,
        },
      },
      ...(isNaN(price)
        ? []
        : [
            {
              price: {
                equals: price,
              },
            },
          ]),
      {
        artisan: {
          name: {
            contains: searchTerm,
            mode: "insensitive" as Prisma.QueryMode,
          },
        },
      },
      {
        category: {
          name: {
            contains: searchTerm,
            mode: "insensitive" as Prisma.QueryMode,
          },
        },
      },
    ],
  };

  const products = await prisma.product.findMany({
    where: whereClause,
    include: {
      category: true,
      artisan: true,
    },
  });
  return products;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const products = await searchProducts(searchParams.search);
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Heading>Searched Product: {searchParams.search}</Heading>
        <ProductSearchFormUser />
      </div>
      <div className="flex justify-center p-10">
        <GoBackButton />
      </div>
      <div className="flex justify-center items-center">
        {products.length ? (
          <UserProductTable products={products} />
        ) : (
          <p className="text-center text-lg">No results found</p>
        )}
      </div>
      <div className="flex justify-center p-10">
        <GoBackButton />
      </div>
    </>
  );
}
