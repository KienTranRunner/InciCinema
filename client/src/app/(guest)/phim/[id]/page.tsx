import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Movie } from "@/types/movie";
import { TrailerModal } from "@/components/(landing)/(phim)/trailer-modal";
import { ShowtimeList } from "@/components/(landing)/(phim)/showtime-list";

interface PageProps {
  params: { id: string };
}

export default async function MovieDetailPage(props: PageProps) {
  const { id } = await props.params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/movie/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Có lỗi xảy ra khi lấy thông tin phim");
  }

  const movie: Movie = await res.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden shadow-xl rounded-2xl border-none">
        <CardContent className="p-0 md:flex ">
          <div className="w-full md:w-1/3">
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              width={400}
              height={600}
              className="w-full h-auto rounded-t-xl md:rounded-l-xl object-cover"
              priority
            />
          </div>

          <div className="p-6 md:w-2/3 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gradient bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
              {movie.title}
            </h1>

            <div className="mt-2 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span>🎬 Đạo diễn: {movie.director}</span>
            </div>
            <div className="mt-2 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span>🕒 Thời lượng: {movie.duration} phút</span>
            </div>
            <div className="mt-2 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span>🗣️ Ngôn ngữ: {movie.language}</span>
            </div>

            <div className="mt-2">
              <Badge className="bg-yellow-500 text-black font-semibold">
                Phân loại: {movie.rating}
              </Badge>
            </div>

            <p className="mt-4 text-gray-700 dark:text-gray-200 leading-relaxed">
              {movie.description}
            </p>

            <div className="mt-4 text-sm italic text-gray-500 dark:text-gray-400">
              Thể loại: <span className="font-semibold">{movie.genre}</span>
            </div>

            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Ngày khởi chiếu:{" "}
              <span className="font-medium text-black dark:text-white">
                {new Date(movie.releaseDate).toLocaleDateString("vi-VN")}
              </span>
            </div>

            {movie.trailerUrl && (
              <div className="mt-6">
                    <TrailerModal trailerUrl={movie.trailerUrl} />

              </div>
            )}
          </div>
        </CardContent>


      </Card>

      <ShowtimeList movieId={id} />

    </div>
  );
}
