"use client";

import useSWR from "swr";
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from "@/types";

export default function OrdersPage() {
  const url = "/admin/orders/api";
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      });

  const { data, error, isValidating } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 300000, // Every 3 seconds,
    revalidateOnFocus: false,
  });

  if (isValidating) return <p>Loading...</p>;
  if (error) return <p>Failed to load orders.</p>;

  return (
    <>
      <Heading>Manage Orders</Heading>
      {data && data.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {data.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center">There are no pending orders</p>
      )}
    </>
  );
}
