"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddMoviePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const movieData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      duration: Number(formData.get("duration")),
      director: formData.get("director") as string,
      language: formData.get("language") as string,
      genre: formData.get("genre") as string,
      posterUrl: formData.get("posterUrl") as string,
      trailerUrl: formData.get("trailerUrl") as string,
      rating: formData.get("rating") as string,
      releaseDate: formData.get("releaseDate") as string,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/movie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (!res.ok) throw new Error("Thêm phim thất bại!");
      toast.success("Thêm phim thành công!");
      router.push("/dashboard/movie");

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Lỗi không xác định!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Card className="bg-white dark:bg-slate-900 shadow-lg border border-gray-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Thêm phim mới
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="title">Tên phim</Label>
              <Input name="title" id="title" required />
            </div>

            <div>
              <Label htmlFor="description">Mô tả</Label>
              <Textarea name="description" id="description" required />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="duration">Thời lượng (phút)</Label>
                <Input type="number" name="duration" id="duration" required />
              </div>
              <div className="flex-1">
                <Label htmlFor="releaseDate">Ngày phát hành</Label>
                <Input type="datetime-local" name="releaseDate" id="releaseDate" required />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="director">Đạo diễn</Label>
                <Input name="director" id="director" required />
              </div>
              <div className="flex-1">
                <Label htmlFor="language">Ngôn ngữ</Label>
                <Input name="language" id="language" required />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="genre">Thể loại</Label>
                <Input name="genre" id="genre" required />
              </div>
              <div className="flex-1">
                <Label htmlFor="rating">Đánh giá</Label>
                <Input name="rating" id="rating" placeholder="PG-13, R, G..." required />
              </div>
            </div>

            <div>
              <Label htmlFor="posterUrl">Poster URL</Label>
              <Input name="posterUrl" id="posterUrl" placeholder="https://example.com/poster.jpg" required />
            </div>

            <div>
              <Label htmlFor="trailerUrl">Trailer URL</Label>
              <Input name="trailerUrl" id="trailerUrl" placeholder="https://youtube.com/..." required />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Đang lưu..." : "Lưu phim"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
