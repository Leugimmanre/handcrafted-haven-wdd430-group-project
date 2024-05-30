import { Logo } from "@/components/ui/Logo";
import styles from "./Home.module.css"
import { MainMenu } from "@/components/ui/MainMenu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "SEO Title",
  keywords: ["Home Page"],
};

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center p-24`}
    >
      <Logo/>
      <MainMenu/>
      <div className="relative mt-10  lg:w-1/2 sm:w-full">
      <div className="absolute inset-0 bg-white bg-opacity-40"></div>
        <div className="relative z-10 p-5">
          <p className="text-2xl text-center justify-center">
            The Handcrafted Haven project is a web application designed to serve
            as a virtual marketplace where artisans can display and sell their
            unique handcrafted products. This approach not only helps artisans
            reach a broader audience, but also allows consumers to access
            unique, handmade products, thereby supporting local talent and
            encouraging more sustainable consumption.
          </p>
        </div>
      </div>

    </main>
  );
}
// ${styles.homeBackground}