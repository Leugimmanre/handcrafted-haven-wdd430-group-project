import RegisterForm from "@/components/auth/RegisterForm";
import { Logo } from "@/components/ui/Logo";
import { MainMenu } from "@/components/ui/MainMenu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Handcrafted Haven",
  description: "SEO Title",
  keywords: ["Register Page"],
};
export default function RegisterPage() {
  return (
    <main className={`flex flex-col items-center p-24`}>
      <Logo />
      <MainMenu />
      <RegisterForm />
    </main>
  );
}
