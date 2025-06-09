"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Movie } from "@/types/movie";
import Link from "next/link";

export default function MoviePage() {
  const [nowShowing, setNowShowing] = useState<Movie[]>([]);
  const [comingSoon, setComingSoon] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/movie`
        );
        if (!response.ok) throw new Error("Không thể lấy dữ liệu phim");
        const movies: Movie[] = await response.json();

        const today = new Date();
        const now = movies.filter(
          (movie) => new Date(movie.releaseDate) <= today
        );
        const soon = movies.filter(
          (movie) => new Date(movie.releaseDate) > today
        );

        setNowShowing(now);
        setComingSoon(soon);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Một lỗi bất ngờ đã xảy ra"
        );
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading)
    return <div className="container mx-auto px-4 py-8">Đang tải...</div>;
  if (error)
    return <div className="container mx-auto px-4 py-8">Lỗi: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="uppercase text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-md dark:from-pink-400 dark:via-fuchsia-500 dark:to-indigo-500">
          🎥 Danh sách phim
        </h1>
        <div className="mt-2 h-1 w-full mx-auto bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full shadow-md dark:from-pink-400 dark:via-fuchsia-500 dark:to-indigo-500" />
      </div>

      <Tabs defaultValue="now" className="w-full">
        <TabsList className="mb-6 grid w-full max-w-md mx-auto grid-cols-2 rounded-xl bg-muted p-1 dark:bg-muted/50 shadow-inner">
          <TabsTrigger
            value="now"
            className="rounded-lg uppercase py-2.5 text-sm font-semibold transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white shadow data-[state=active]:shadow-md"
          >
            🎬 Phim đang chiếu
          </TabsTrigger>
          <TabsTrigger
            value="soon"
            className="rounded-lg uppercase py-2.5 text-sm font-semibold transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white shadow data-[state=active]:shadow-md"
          >
            🎞️ Phim sắp chiếu
          </TabsTrigger>
        </TabsList>

        <TabsContent value="now">
          <MovieGrid movies={nowShowing} />
        </TabsContent>
        <TabsContent value="soon">
          <MovieGrid movies={comingSoon} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <Link key={movie.movieId} href={`/phim/${movie.movieId}`}>
          <Card
            key={movie.movieId}
            className="group overflow-hidden border-none shadow-md transition-shadow hover:shadow-xl"
          >
            <CardContent className="p-0">
              <div className="relative aspect-[2/3]">
                <Image
                  src={movie.posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover rounded-t-lg transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">
                  {movie.rating}
                </Badge>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-base font-semibold text-white truncate">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-gray-300">{movie.genre}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
