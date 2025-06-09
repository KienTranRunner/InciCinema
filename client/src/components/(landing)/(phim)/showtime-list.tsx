"use client";

import { useEffect, useState } from "react";
import { Showtime } from "@/types/showtime";
import { format, isToday } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";

interface ShowtimeListProps {
  movieId: string;
}

interface GroupedShowtimes {
  [date: string]: Showtime[];
}

export const ShowtimeList: React.FC<ShowtimeListProps> = ({ movieId }) => {
  const [groupedShowtimes, setGroupedShowtimes] = useState<GroupedShowtimes>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/showtime/movie/${movieId}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Không thể tải lịch chiếu");

        const data: Showtime[] = await res.json();

        const groups: GroupedShowtimes = {};
        for (const s of data) {
          const dateKey = format(new Date(s.startTime), "yyyy-MM-dd");
          if (!groups[dateKey]) groups[dateKey] = [];
          groups[dateKey].push(s);
        }

        for (const date in groups) {
          groups[date].sort(
            (a, b) =>
              new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
          );
        }

        setGroupedShowtimes(groups);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Đã xảy ra lỗi không xác định");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, [movieId]);

  if (loading)
    return <p className="mt-6 text-gray-500">Đang tải lịch chiếu...</p>;
  if (error) return <p className="mt-6 text-red-500">❌ {error}</p>;
  if (Object.keys(groupedShowtimes).length === 0) {
    return <p className="mt-6 text-gray-500 italic">Chưa có lịch chiếu.</p>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-orange-500 border-b-2 border-orange-500 inline-block pb-1 mb-4">
        🎬 Lịch chiếu
      </h2>

      <div className="space-y-6">
        {Object.entries(groupedShowtimes).map(([dateKey, showtimes]) => {
          const dateObj = new Date(dateKey);
          const dateLabel = isToday(dateObj)
            ? `Hôm nay, ngày ${format(dateObj, "d/M", { locale: vi })}`
            : `${format(dateObj, "EEEE, 'ngày' d/M", { locale: vi })}`;

          return (
            <div key={dateKey}>
              <div className="relative inline-block mb-3">
                <div className="bg-purple-700 text-white text-lg font-semibold px-5 py-2 rounded-lg relative z-10">
                  {dateLabel}
                </div>
                <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-4 h-4 bg-purple-700 rotate-45 z-0" />
              </div>

              <div className="flex flex-wrap gap-3">
                {showtimes.map((s) => {
                  const time = format(new Date(s.startTime), "HH:mm");

                  const isTodayShow = isToday(new Date(s.startTime));
                  const btnClass = isTodayShow
                    ? "bg-black text-white border border-orange-500 hover:bg-orange-600"
                    : "bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:opacity-90";

                  return (
                    <Link
                      href={`/dat-ve/${s.showTimeId}`}
                      key={s.showTimeId}
                      className={`px-4 py-2 rounded-md font-semibold text-sm shadow-md transition ${btnClass}`}
                    >
                      {time}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
