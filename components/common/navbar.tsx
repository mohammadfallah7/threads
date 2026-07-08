"use client";

import clsx from "clsx";
import {
  LucideHeart,
  LucideHome,
  LucidePlus,
  LucideSearch,
  LucideUser,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    id: 1,
    path: "/feed",
    icon: LucideHome,
  },
  {
    id: 2,
    path: "/search",
    icon: LucideSearch,
  },
  {
    id: 3,
    icon: LucidePlus,
  },
  {
    id: 4,
    path: "/favorites",
    icon: LucideHeart,
  },
  {
    id: 5,
    path: "/profile",
    icon: LucideUser,
  },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <ul className="flex md:flex-col items-center justify-around md:justify-center gap-4 w-full">
      {navItems.map((navItem) =>
        navItem.path ? (
          <Link
            key={navItem.id}
            href={navItem.path}
            className={clsx({
              "text-white p-4": pathname.includes(navItem.path),
              "aside-link": !pathname.includes(navItem.path),
            })}
          >
            <navItem.icon className="size-5 md:size-6" />
          </Link>
        ) : (
          <button
            key={navItem.id}
            className="px-6 py-3 md:p-4 rounded-md transition-all duration-300 text-primary bg-surface cursor-pointer hover:scale-105 md:hover:opacity-80 md:hover:scale-100"
          >
            <navItem.icon className="size-5 md:size-6" />
          </button>
        ),
      )}
    </ul>
  );
};
