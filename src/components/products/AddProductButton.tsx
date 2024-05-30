'use client'

import { Product } from "@prisma/client";
import { useStore } from '@/store';

type AddProductButtonProps = {
    product: Product
}
export default function AddProductButton({product}: AddProductButtonProps) {
    const addToOrder = useStore((state) => state.addToOrder)
  return (
    <button
      type="button"
      className="w-full mt-5 p-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 uppercase"
      onClick={() => addToOrder(product)}
    >
      Add to cart
    </button>
  );
}
