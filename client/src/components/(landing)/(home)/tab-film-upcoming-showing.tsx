"use client";

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

const nowShowing = [
  {
    src: "https://touchcinema.com/storage/slide-web/1920x1080-3-1746948177.jpg",
    title: "Phim 1",
    genre: "Hành động",
    rating: "8.5",
  },
  {
    src: "https://touchcinema.com/storage/slider-app/1920wx1080h-40.jpg",
    title: "Phim 2",
    genre: "Hài",
    rating: "7.8",
  },
  {
    src: "https://touchcinema.com/storage/slider-app/1920x1080-55.jpg",
    title: "Phim 3",
    genre: "Kinh dị",
    rating: "8.0",
  },
  {
    src: "https://touchcinema.com/storage/slider-app/1920x1080-55.jpg",
    title: "Phim 4",
    genre: "Tình cảm",
    rating: "7.5",
  },
  {
    src: "https://touchcinema.com/storage/slider-app/1920x1080-55.jpg",
    title: "Phim 5",
    genre: "Viễn tưởng",
    rating: "8.2",
  },
];

const comingSoon = [
  {
    src: "https://touchcinema.com/storage/slider-app/1920x1080-55.jpg",
    title: "Sắp Chiếu 1",
    genre: "Kinh dị",
    rating: "TBA",
  },
  {
    src: "https://touchcinema.com/storage/slider-app/1920wx1080h-40.jpg",
    title: "Sắp Chiếu 2",
    genre: "Hành động",
    rating: "TBA",
  },
  {
    src: "https://touchcinema.com/storage/slide-web/1920x1080-3-1746948177.jpg",
    title: "Sắp Chiếu 3",
    genre: "Tình cảm",
    rating: "TBA",
  },
  {
    src: "https://touchcinema.com/storage/slide-web/1920x1080-3-1746948177.jpg",
    title: "Sắp Chiếu 4",
    genre: "Hài",
    rating: "TBA",
  },
  {
    src: "https://touchcinema.com/storage/slide-web/1920x1080-3-1746948177.jpg",
    title: "Sắp Chiếu 5",
    genre: "Hài",
    rating: "TBA",
  },
  {
    src: "https://touchcinema.com/storage/slide-web/1920x1080-3-1746948177.jpg",
    title: "Sắp Chiếu 5",
    genre: "Hài",
    rating: "TBA",
  },
  {
    src: "https://touchcinema.com/storage/slide-web/1920x1080-3-1746948177.jpg",
    title: "Sắp Chiếu 5",
    genre: "Hài",
    rating: "TBA",
  },
];

export default function MovieTabsCarousel() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="now" className="w-full ">
        <TabsList className="mb-6 grid w-full max-w-md mx-auto grid-cols-2 rounded-xl bg-muted p-1 dark:bg-muted/50 shadow-inner ">
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
  movies: { src: string; title: string; genre: string; rating: string }[];
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
              <Card className="group overflow-hidden border-none shadow-md transition-shadow hover:shadow-xl">
                <CardContent className="p-0">
                  <div className="relative aspect-[2/3]">
                    <Image
                      src={movie.src}
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
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
