import LoginForm from "@/components/auth/LoginForm";
import { Logo } from "@/components/ui/Logo";

export default function LoginPage() {
  return (
    <main className={`flex flex-col items-center p-24`}>
      <Logo />
      <LoginForm />
    </main>
  );
}
