import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";
import UserNavBar from "../../components/user/UserNavBar";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="flex md:w-full p-5 justify-center">
        <UserNavBar />
      </nav>
      <div className="md:flex">
        <main className="md:flex-1 p-5">
          {children}
        </main>
      </div>
      <ToastNotification />
    </>
  );
}
