import type { Metadata } from "next";

import AdminLoginForm from "@/components/auth/AdminLoginForm";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Admin | Handcrafted Haven",
  description: "SEO Title",
  keywords: ["Admin Page"],
};
export default function AdminLoginPage() {
  return (
    <main className={`flex flex-col items-center p-24`}>
      <Logo />
      <AdminLoginForm />
    </main>
  );
}
