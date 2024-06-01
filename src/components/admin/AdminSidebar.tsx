"use client";
import Session from "../session/Session";
import AdminRoute from "./AdminRoute";
import { signOut } from "next-auth/react";

const adminNavigation = [
  { url: "/admin/orders", text: "Orders", blank: false },
  { url: "/admin/products", text: "Products", blank: false },
  // { url: "/order/ceramics_and_pottery", text: "See Products", blank: true },
];
const handleLogout = async () => {
  await signOut({ redirect: false });
  window.location.href = "/adminLogin";
};
export default function AdminSidebar() {
  return (
    <>
      <div className="space-y-3 mt-5">
        <Session/>
        <nav className="flex flex-col">
            {adminNavigation.map(link => (
                <AdminRoute
                    key={link.url}
                    link={link}
                />
            ))}
        </nav>
        <button
        onClick={handleLogout}
        className="text-center font-bold text-lg px-3 py-1 rounded text-gray-700 hover:bg-gray-100 cursor-pointer"
      >
        Logout
      </button>

      </div>
    </>
  );
}
