"use client";
import React from "react";
import UserRoute from "./UserRoute";
import { signOut } from "next-auth/react";
import Session from "../session/Session";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStore } from "@/store";
import Link from "next/link";


export default function UserNavBar() {
  const adminNavigation = [
    { url: "/products", text: "All Products", blank: false },
  ];

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/user/login";
  };

  // Retrieve cart data from your custom hook
  const order = useStore((state) => state.order);

  // Calculate total items in the cart
  const totalItemsInCart = order.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex flex-col lg:flex-row mt-2 space-y-3 md:space-y-0 md:flex md:items-center lg:justify-between">
      <nav className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4">
        {adminNavigation.map((link) => (
          <UserRoute key={link.url} link={link} />
        ))}
      </nav>
      {/* Cart Icon Count */}
      <div className="flex items-center">
        <Link
          href={"/cart"}
          className={`font-bold text-lg p-3`}
        >
          <ShoppingCartIcon style={{
            fontSize: 30, marginRight: totalItemsInCart > 0 ? -10 : 10
          }} />
          {totalItemsInCart > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
              {totalItemsInCart}
            </span>
          )}
        </Link>
      </div>
      <Session />
      <button
        onClick={handleLogout}
        className="flex items-center justify-center px-4 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
      >
        Logout
      </button>
    </div>
  );
}