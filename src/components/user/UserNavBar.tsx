"use client";
import React from "react";
import UserRoute from "./UserRoute";
import { signOut } from "next-auth/react";

export default function UserNavBar() {
  const adminNavigation = [
    { url: "/products", text: "All Products", blank: false },
    { url: "/order/ceramics_and_pottery", text: "Order Products", blank: false },
  ];

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/user/login";
  };

  return (
    <div className="flex flex-col lg:flex-row mt-2 space-y-3 md:space-y-0 md:flex md:items-center lg:justify-between">
      <nav className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4">
        {adminNavigation.map((link) => (
          <UserRoute key={link.url} link={link} />
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="text-center font-bold text-xl px-6 py-3 rounded text-gray-700 hover:bg-gray-100 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
