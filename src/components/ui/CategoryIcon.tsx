"use client";

import { Category } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";

// Types
type CategoryIconProps = {
  category: Category;
};
// Left menu links
export default function CategoryIcon({ category }: CategoryIconProps) {
  const params = useParams<{ category: string }>();
  return (
    <div
      className={`${
        // Indicate which page you are on
        category.slug === params.category ? "bg-amber-400" : ""
      } flex items-center gap-4 w-full border-t border-gray-100 p-3 last-of-type:border-b`}
    >
      <Link
        className="text-xl font-bold"
        href={`/order/${category.slug}`}
      >
        {category.name}
      </Link>
    </div>
  );
}
