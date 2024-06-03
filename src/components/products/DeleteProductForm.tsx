"use client";

import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { deleteProduct } from "@/actions/delete-product-action";

export default function DeleteProductForm() {
  const router = useRouter();
  const params = useParams();
  const productId = +params.id!;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    const { success } = await deleteProduct(productId);

    if (success) {
      toast.success("Product deleted successfully");
      router.push("/admin/products");
    } else {
      toast.error(`Failed to delete product`);
    }
  };

  return (
    <div className="mt-10 px-5 py-10 text-center">
      <button
        onClick={handleDelete}
        className="bg-red-600 hover:bg-red-800 text-white w-full p-3 uppercase font-bold cursor-pointer"
      >
        Delete Product
      </button>
    </div>
  );
}
