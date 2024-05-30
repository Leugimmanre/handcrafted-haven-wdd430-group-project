import UserNavBar from "@/components/user/UserNavBar";

export default async function ProductLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="">
                <nav className="flex justify-center md:w-full p-5">
                    <UserNavBar />
                </nav>

                <main className="md:h-screen bg-gray-100 p-5">
                    {children}
                </main>
            </div>
        </>
    )
}