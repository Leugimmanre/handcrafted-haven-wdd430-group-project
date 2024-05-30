import React from "react";
import UserRoute from "./UserRoute";

export default function UserNavBar() {
  const adminNavigation = [
    { url: "/products", text: "All Products", blank: false },
    { url: "/order/ceramics_and_pottery", text: "Order Products", blank: false },
    { url: "../", text: "Logout", blank: false },
  ];

  return (
    <>
      <div className="mt-2 space-y-3 ">
        <nav className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-4">
          {adminNavigation.map((link) => (
            <UserRoute key={link.url} link={link} />
          ))}
        </nav>
      </div>
    </>
  );
}
