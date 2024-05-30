import Heading from "@/components/ui/Heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Handcrafted Haven",
  description: "SEO Title",
  keywords: ["Admin Page"],
};

export default function OrdersPage() {
  return (
    <Heading>
      Manage Orders
    </Heading>
  )
}
