"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRpouteProps = {
    link: {
        url: string;
        text: string;
        blank: boolean;
    }
}
export default function UserRoute({link}: AdminRpouteProps) {
    const pathname = usePathname();
    const isActive = pathname.startsWith(link.url);
  return (
    <Link
        href={link.url}
        className={`${isActive ? 'bg-amber-400' : ''} font-bold text-lg p-3`}
        target={link.blank ? '_blank' : ''}
    >
      {link.text}
    </Link>
  )
}
