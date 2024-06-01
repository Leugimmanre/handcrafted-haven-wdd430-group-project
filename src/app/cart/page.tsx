"use client";

import { useStore } from "@/store";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/schema";
import { toast } from 'react-toastify'
import ProductDetails from "@/components/order/ProductDetails";


export default function CartPage() {
    const order = useStore((state) => state.order);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const total = useMemo(
        () => order.reduce((total, item) => total + item.quantity * item.price, 0),
        [order]
    );

    const handleCreateOrder = async (formData: FormData) => {
        const data = {
            name: formData.get("name"),
            total,
            order,
        };
        const result = OrderSchema.safeParse(data);
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message);
            });
            return;
        }

        const response = await createOrder(data);
        if (response?.errors) {
            response.errors.forEach((issue) => {
                toast.error(issue.message);
            });
        }

        toast.success("Order Placed Correctly");
    };

    return (
        <div className="flex justify-center items-start h-screen">
            <aside className="w-full md:w-3/4 lg:w-1/2 p-5">
                <h1 className="text-4xl text-center font-black">My Order</h1>
                {order.length === 0 ? (
                    <p className="text-center my-10">The cart is empty</p>
                ) : (
                    <div className="mt-5">
                        {order.map((item) => (
                            <ProductDetails key={item.id} item={item} />
                        ))}
                        <p className="text-2xl mt-20 text-center">
                            Total to pay: {""}
                            <span className="font-bold">{formatCurrency(total)}</span>
                        </p>

                        <form action={handleCreateOrder} className="w-full mt-10 space-y-5">
                            <input
                                type="text"
                                placeholder="Write your full name"
                                className="bg-white border border-gray-100 py-3 px-4 w-full"
                                name="name"
                            />
                            <input
                                type="submit"
                                className="w-full mt-5 p-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 uppercase"
                                value="Confirm Order"
                            />
                        </form>
                        {orderPlaced && (
                            <p className="text-center text-green-500 mt-5">
                                Order placed successfully!
                            </p>
                        )}
                    </div>
                )}
            </aside>
        </div>
    );
}