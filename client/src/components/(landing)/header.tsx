"use client";

import Link from "next/link";
import { Input } from "../ui/input";
import { ModeToggle } from "../ui/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LayoutDashboard, LogIn, Search, User, UserPlus, History } from "lucide-react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;

  console.log(user?.id);

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 shadow-sm transition-colors">
      <div className="h-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500" />

      <div className="flex items-center justify-between px-6 h-20 border-b">
        <Link
          href="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"
        >
          InciCinema
        </Link>

        <div className="relative w-[420px] hidden md:block">
          <Input
            type="text"
            placeholder="Tìm kiếm phim..."
            className="pl-10 pr-4 py-2 rounded-full border-2 border-gray-300 focus:border-purple-500 transition duration-300"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-full border hover:bg-gray-100 transition">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="avatar"
                    width={30}
                    height={30}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-48 rounded-xl shadow-xl p-2 border bg-white dark:bg-zinc-800"
            >
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-600 dark:text-gray-200">
                    Xin chào, {user.name}
                  </div>
                  <div className="px-3 py-1 text-sm text-gray-500 dark:text-gray-400">
                    Vai trò: {user.role}
                  </div>

                  {(user.role === "Admin" ||
                    user.role === "Staff" ||
                    user.role === "Manager") && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700 w-full"
                      >
                        <LayoutDashboard className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem asChild>
                    <Link
                      href = "/lich-su-mua-ve"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700 w-full text-left"               >
                      <History className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">Lịch sử mua vé</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700 w-full text-left"
                    >
                      <LogIn className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">Đăng xuất</span>
                    </button>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/auth/login"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700"
                    >
                      <LogIn className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">Đăng nhập</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/auth/register"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700"
                    >
                      <UserPlus className="w-4 h-4 text-gray-600" />
                      <span className="text-sm">Đăng ký</span>
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <nav className="flex justify-center items-center gap-6 px-6 py-3 uppercase font-medium ">
        {[
          { href: "/", label: "Trang chủ" },
          { href: "/phim", label: "Phim" },
          { href: "/lich-chieu", label: "Lịch chiếu" },
          { href: "/gia-ve", label: "Giá vé" },
          { href: "/thanh-vien", label: "Thành viên" },
          { href: "/gioi-thieu", label: "Giới thiệu" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group relative text-base md:text-lg text-foreground px-2 py-1 font-semibold transition-all duration-300 hover:text-pink-500 dark:hover:text-yellow-400"
          >
            <span className="relative z-10 ">{link.label}</span>
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-yellow-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
          </Link>
        ))} 
      </nav>
    </header>
  );
}
