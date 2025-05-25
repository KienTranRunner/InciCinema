import Link from "next/link";
import { Input } from "../ui/input";
import { ModeToggle } from "../ui/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 shadow-sm transition-colors">
      <div className="h-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 " />

      <div className="flex items-center justify-between px-6 h-20 border-b">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent"
          >
            InciCinema
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative w-[420px]">
            <Input
              type="text"
              placeholder="Tìm kiếm phim..."
              className=" max-w-sm pl-10 pr-4 py-2 rounded-full border-2 border-gray-300 focus:border-purple-500 transition duration-300"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-9 h-9 p-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full cursor-pointer">
                <div className="bg-background rounded-full w-full h-full flex items-center justify-center overflow-hidden">
                  <AvatarImage src="/avatar.jpg" alt="Avatar" />
                  <AvatarFallback>IC</AvatarFallback>
                </div>
              </Avatar>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </div>

     

      <nav className="flex justify-center items-center gap-6 px-6 py-3 uppercase font-medium">
        {[
          { href: "/", label: "Trang chủ" },
          { href: "/phim", label: "Phim" },
          { href: "/lich-chieu", label: "Lịch chiếu" },
          { href: "/gia-ve", label: "Giá vé" },
          { href: "/thanh-vien", label: "Thành viên" },
          { href: "/gioi-thieu", label: "Giới thiệu" },
          { href: "/dich-vu", label: "Dịch vụ" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group relative text-base md:text-lg text-foreground px-2 py-1 font-semibold transition-all duration-300 hover:text-pink-500 dark:hover:text-yellow-400"
          >
            <span className="relative z-10">{link.label}</span>
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-yellow-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
          </Link>
        ))}
      </nav>

    </header>
  );
}
