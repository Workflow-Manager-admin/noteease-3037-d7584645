"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  { name: "All Notes", href: "/" },
  { name: "New Note", href: "/new" },
];

export default function Sidebar({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex h-screen bg-[#fff]">
      <nav className="flex flex-col w-60 min-w-[180px] bg-[#f8f9fb] border-r border-gray-100 px-4 pt-8 pb-4 gap-6">
        <div className="text-2xl font-bold mb-8 text-[#1E90FF] tracking-tight">
          NoteEase
        </div>
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              legacyBehavior
              key={item.href}
              href={item.href}
            >
              <a
                className={`px-3 py-2 rounded-lg font-medium text-base transition-colors ${
                  pathname === item.href
                    ? "bg-[#1E90FF] text-white"
                    : "text-[#4B5563] hover:bg-[#F59E42] hover:text-white"
                }`}
              >
                {item.name}
              </a>
            </Link>
          ))}
        </div>
        <div className="flex-1" />
        <div className="text-xs text-[#4B5563] opacity-70">
          Minimal Notes App
        </div>
      </nav>
      <main className="flex-1 h-full overflow-auto bg-white">{children}</main>
    </div>
  );
}
