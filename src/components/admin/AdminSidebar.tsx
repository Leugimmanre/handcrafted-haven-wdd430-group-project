import AdminRoute from "./AdminRoute";

const adminNavigation = [
  { url: "/admin/orders", text: "Orders", blank: false },
  { url: "/admin/products", text: "Products", blank: false },
  { url: "/order/ceramics_and_pottery", text: "See Products", blank: true },
];

export default function AdminSidebar() {
  return (
    <>
      <div className="space-y-3 ">
        <p className="mt-10 uppercase font-bold text-sm text-gray-600 text-center">
          Navigation
        </p>
        <nav className="flex flex-col">
            {adminNavigation.map(link => (
                <AdminRoute
                    key={link.url}
                    link={link}
                />
            ))}
        </nav>
      </div>
    </>
  );
}
