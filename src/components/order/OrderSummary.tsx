'use client'

import { useStore } from "@/store"
import ProductDetails from "./ProductDetails";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/utils";
import { createOrder } from "@/actions/create-order-action";

export default function OrderSummary() {
  const order = useStore((state) => state.order);
  const total = useMemo(() =>  order.reduce((total, item) => total + (item.quantity * item.price), 0), [order]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCreateOrder = () => {
    createOrder()
  };


  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">My Order</h1>
      {order.length === 0 ? <p className="text-center my-10">The cart is empty</p> : (
        <div className="mt-5">
          {order.map(item => (
            <ProductDetails
              key={item.id}
              item={item}
            />
          ))}
          <p className="text-2xl mt-20 text-center">
          Total to pay: {''}
          <span className="font-bold">{formatCurrency(total)}</span>
          </p>

          <form
            action={handleCreateOrder}
            className="w-full mt-10 space-y-5"
          >
            <input
              type="submit"
              className="py-2 rouded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
              value="Confirm Order"
            />

          </form>
          {orderPlaced && <p className="text-center text-green-500 mt-5">Order placed successfully!</p>}
        </div>
      )}
    </aside>
  )
}