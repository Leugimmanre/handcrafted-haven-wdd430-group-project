import LoginForm from "@/components/auth/LoginForm";
import { Logo } from "@/components/ui/Logo";
import { MainMenu } from "@/components/ui/MainMenu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Handcrafted Haven",
  description: "SEO Title",
  keywords: ["Login Page"],
};
export default function LoginPage() {
  return (
    <main className={`flex flex-col items-center p-24`}>
      <Logo />
      <MainMenu />
      <LoginForm />
    </main>
  );
}
