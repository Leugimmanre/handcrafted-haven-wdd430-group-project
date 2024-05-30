import ContactForm from "@/components/contact/ContactForm";
import { Logo } from "@/components/ui/Logo";
import { MainMenu } from "@/components/ui/MainMenu";

export default function ContactPage() {
  return (
    <main className={`flex flex-col items-center p-24`}>
      <Logo />
      <MainMenu />
      <ContactForm/>
    </main>
  );
}
