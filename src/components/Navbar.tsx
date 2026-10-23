"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Doska" },
  { href: "/team", label: "Jamoa" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2 border-b border-gray-200 bg-white px-6 py-3 dark:border-gray-700 dark:bg-gray-900">
      <span className="mr-4 text-lg font-bold text-gray-900 dark:text-gray-100">
        📋 TaskFlow
      </span>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            pathname === link.href
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          }`}
        >
          {link.label}
        </Link>
      ))}
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </nav>
  );
}
