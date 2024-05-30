import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import ToastNotification from "@/components/ui/ToastNotification";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) {
    notFound();
  }

  return product;
}

export default async function EditProductsPage({params}: {params: { id: string }}) {
  const product = await getProductById(+params.id);

  return (
    <>
      <Heading>Edit Product: {product.name}</Heading>
      <ToastNotification/>
      <GoBackButton />

      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}
