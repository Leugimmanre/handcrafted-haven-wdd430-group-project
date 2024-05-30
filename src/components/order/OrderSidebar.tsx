import { prisma } from "@/lib/prisma";
import CategoryIcon from "../ui/CategoryIcon";
import Session from "../session/Session";

// Bring results from the database
async function getCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSidebar() {
  const categories = await getCategories();

  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <nav className="">
        <p className="ml-2 text-lg p-2">{<Session/>}</p>
        {categories.map((category) => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </nav>
    </aside>
  );
}
