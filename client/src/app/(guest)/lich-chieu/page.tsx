"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

type Showtime = {
  showTimeId: number;
  startTime: string;
  endTime: string;
  price: number;
  movieId: number;
  movieTitle: string;
  posterUrl: string;
  rating: string;
  director: string;
  duration: number;
  genre: string;
  roomName: string;
};

export default function ShowTimePage() {
  const [data, setData] = useState<Showtime[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = new Date();
  const next7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/showtime`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Lỗi khi fetch showtime:", err);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(
    (item) =>
      new Date(item.startTime).toDateString() === selectedDate.toDateString()
  );

  const moviesGrouped = Object.values(
    filteredData.reduce((acc, showtime) => {
      if (!acc[showtime.movieId]) {
        acc[showtime.movieId] = {
          ...showtime,
          times: [],
        };
      }
      acc[showtime.movieId].times.push(showtime);
      return acc;
    }, {} as Record<number, Showtime & { times: Showtime[] }>)
  );

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">🎟️ Lịch Chiếu Phim</h1>

      <div className="flex space-x-2 ">
        {next7Days.map((date, index) => {
          const isToday = date.toDateString() === today.toDateString();
          const weekdayLabel = isToday
            ? "Hôm nay"
            : format(date, "EEEE", { locale: vi });
          const day = date.getDate();
          const month = date.getMonth() + 1;

          return (
            <Button
              key={index}
              variant={
                selectedDate.toDateString() === date.toDateString()
                  ? "default"
                  : "outline"
              }
              onClick={() => setSelectedDate(date)}
              className="flex flex-col items-center p-2 min-w-[60px] text-center"
            >
              <span className="text-xs font-semibold">{weekdayLabel}</span>
              <span className="text-2xl font-bold leading-none">{day}</span>
              <span className="text-xs">Tháng {month}</span>
            </Button>
          );
        })}
      </div>

      <div className="space-y-6">
        {moviesGrouped.length === 0 ? (
          <p className="text-muted-foreground">
            Không có lịch chiếu cho ngày này.
          </p>
        ) : (
          moviesGrouped.map((movie) => (
            <Card
              key={movie.movieId}
              className="flex flex-col md:flex-row gap-4 p-4"
            >
              <img
                src={movie.posterUrl}
                alt={movie.movieTitle}
                className="w-full md:w-[150px] h-auto rounded-xl object-cover"
              />
              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-bold">{movie.movieTitle}</h2>
                <p className="text-sm text-muted-foreground">
                  🎬 {movie.genre} | ⏱ {movie.duration} phút | 🎬{" "}
                  {movie.director} | 🎯 {movie.rating}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {movie.times.map((time) => (
                    <Button
                      key={time.showTimeId}
                      variant="secondary"
                      className="rounded-full text-sm"
                      onClick={() =>
                        (window.location.href = `/dat-ve/${time.showTimeId}`)
                      }
                    >
                      {format(new Date(time.startTime), "HH:mm")} -{" "}
                      {time.roomName}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
