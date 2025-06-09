"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { GalleryVerticalEnd } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnimationWrapper from "@/components/animation-wrapper";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            username,
            fullname: fullname,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Đăng ký thất bại");
      } else {
        toast.success("Đăng ký thành công");
        router.push("/auth/login");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Có lỗi không xác định xảy ra khi đăng ký.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimationWrapper>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="relative hidden bg-muted lg:block">
          <Image
            src={`/Movie Night-rafiki.png`}
            alt="Image"
            width={500}
            height={500}
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              Inci Cinema
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <form onSubmit={handleRegister} className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Tạo tài khoản</h1>
                  <p className="text-sm text-muted-foreground">
                    Đăng ký để sử dụng dịch vụ
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Tên tài khoản</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => {
                        const input = e.target.value;

                        const noAccent = input
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "");

                        const sanitized = noAccent.replace(
                          /[^a-zA-Z0-9_]/g,
                          ""
                        );

                        setUsername(sanitized);
                      }}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fullname">Họ và Tên</Label>
                    <Input
                      id="fullname"
                      value={fullname}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="abc@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Đang xử lý..." : "Đăng ký"}
                  </Button>
                  <div className="text-center text-sm">
                    Đã có tài khoản?{" "}
                    <button
                      type="button"
                      onClick={() => router.push("/auth/login")}
                      className="underline underline-offset-4 text-primary hover:opacity-80"
                    >
                      Đăng nhập
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
}
