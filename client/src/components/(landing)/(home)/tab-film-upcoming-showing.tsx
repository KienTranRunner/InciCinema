"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CarouselMovie, Movie } from "@/types/movie";
import Link from "next/link";





export default function MovieTabsCarousel() {
  const [nowShowing, setNowShowing] = useState<Movie[]>([]);
  const [comingSoon, setComingSoon] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/movie`);
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu phim");
        }
        const movies: Movie[] = await response.json();

        const today = new Date();
        const nowShowingMovies = movies.filter(
          (movie: Movie) => new Date(movie.releaseDate) <= today
        );
        const comingSoonMovies = movies.filter(
          (movie: Movie) => new Date(movie.releaseDate) > today
        );

        const formatMovies = (movies: Movie[]): CarouselMovie[] =>
          movies.map((movie: Movie) => ({
            movieId: movie.movieId,
            title: movie.title,
            description: movie.description,
            duration: movie.duration,
            director: movie.director,
            language: movie.language,
            genre: movie.genre,
            posterUrl: movie.posterUrl,
            trailerUrl: movie.trailerUrl,
            rating: movie.rating,
            releaseDate: movie.releaseDate,
          }));
        

        setNowShowing(formatMovies(nowShowingMovies));
        setComingSoon(formatMovies(comingSoonMovies));
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Một lỗi bất ngờ đã xảy ra");
        }
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Đang tải...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        Lỗi: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
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

        <TabsContent value="now" className="mt-0">
          <MovieCarousel movies={nowShowing} />
        </TabsContent>
        <TabsContent value="soon" className="mt-0">
          <MovieCarousel movies={comingSoon} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MovieCarousel({
  movies,
}: {
  movies: CarouselMovie[];
}) {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 pr-2">
        {movies.map((movie, index) => (
          <CarouselItem
            key={index}
            className="pl-2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <div className="p-2">
            <Link key={movie.movieId} href={`/phim/${movie.movieId}`}>

              <Card className="group overflow-hidden border-none shadow-md transition-shadow hover:shadow-xl">
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
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
