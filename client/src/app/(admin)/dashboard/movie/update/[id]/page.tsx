"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Movie } from "@/types/movie";

export default function EditMoviePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/movie/${id}`
        );
        if (!res.ok) throw new Error("Không thể tải phim.");
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Lỗi không xác định!"
        );
      }
    };

    fetchMovie();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const updatedMovie = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      duration: Number(formData.get("duration")),
      director: formData.get("director") as string,
      language: formData.get("language") as string,
      genre: formData.get("genre") as string,
      posterUrl: formData.get("posterUrl") as string,
      trailerUrl: formData.get("trailerUrl") as string,
      rating: formData.get("rating") as string,
      releaseDate: new Date(formData.get("releaseDate") as string).toISOString(),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/movie/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMovie),
        }
      );

      if (!res.ok) throw new Error("Cập nhật phim thất bại!");
      toast.success("Cập nhật phim thành công!");
      router.push("/dashboard/movie");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Lỗi không xác định!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); 
  };

  if (!movie) {
    return <p className="text-center py-10">Đang tải dữ liệu phim...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Card className="bg-white dark:bg-slate-900 shadow-lg border border-gray-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Cập nhật phim
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="title">Tên phim</Label>
              <Input
                name="title"
                id="title"
                defaultValue={movie.title}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                name="description"
                id="description"
                defaultValue={movie.description}
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="duration">Thời lượng (phút)</Label>
                <Input
                  type="number"
                  name="duration"
                  id="duration"
                  defaultValue={movie.duration}
                  required
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="releaseDate">Ngày phát hành</Label>
                <Input
                  type="datetime-local"
                  name="releaseDate"
                  id="releaseDate"
                  defaultValue={formatDateForInput(movie.releaseDate)}
                  required
                />{" "}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="director">Đạo diễn</Label>
                <Input
                  name="director"
                  id="director"
                  defaultValue={movie.director}
                  required
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="language">Ngôn ngữ</Label>
                <Input
                  name="language"
                  id="language"
                  defaultValue={movie.language}
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="genre">Thể loại</Label>
                <Input
                  name="genre"
                  id="genre"
                  defaultValue={movie.genre}
                  required
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="rating">Đánh giá</Label>
                <Input
                  name="rating"
                  id="rating"
                  defaultValue={movie.rating}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="posterUrl">Poster URL</Label>
              <Input
                name="posterUrl"
                id="posterUrl"
                defaultValue={movie.posterUrl}
                required
              />
            </div>

            <div>
              <Label htmlFor="trailerUrl">Trailer URL</Label>
              <Input
                name="trailerUrl"
                id="trailerUrl"
                defaultValue={movie.trailerUrl}
                required
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Đang cập nhật..." : "Cập nhật phim"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
