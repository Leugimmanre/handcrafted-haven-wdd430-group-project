import Link from "next/link";

export const Logo = () => {
  return (
    <div className={`flex flex-col items-center p-2 mt-10`}>
      <Link href={"/"}>
        <span
          className={`text-5xl border-b-4 border-t-4 border-amber-600 text-center text-gray-800 block sm:text-center p-2`}
        >
          Handcrafted Haven
        </span>
        <p className="text-1xl font-bold mt-4 text-center text-black">Artisans Virtual Marketplace</p>
      </Link>
    </div>
  );
};
