"use client";

import { notFound } from "next/navigation";
import { Showtime } from "@/types/showtime";
import { useEffect, useState, use } from "react";
import { Calendar } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Params {
  params: Promise<{ id: string }>;
}

export default function DatVePage({ params }: Params) {
  const { id } = use(params);
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const [showtime, setShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleBooking = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (!showtime) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/ticket/bulk`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            showTimeId: showtime.showTimeId,
            seatIds: selectedSeats,
            userId: session?.user?.id,
            price: showtime.price,
            bookingTime: new Date().toISOString(),
            status: "Booked",
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Booking failed");
      }

      const data = await res.json();
      alert(`✅ Đặt vé thành công (${data.length} vé)!`);
      setSelectedSeats([]);
      const newRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/showtime/${id}/details`,
        { cache: "no-store" }
      );
      const newData: Showtime = await newRes.json();
      setShowtime(newData);
    } catch (err) {
      alert("❌ Đặt vé thất bại. Vui lòng thử lại!");
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/showtime/${id}/details`,
        { cache: "no-store" }
      );
      if (!res.ok) return notFound();
      const data: Showtime = await res.json();
      setShowtime(data);
    };
    fetchData();
  }, [id]);

  if (!showtime) return null;

  const rows = Array.from(new Set(showtime.seats?.map((seat) => seat.row))).sort();
  const cols = Math.max(...(showtime.seats?.map((s) => s.column) ?? [0]));

  const toggleSeat = (seatId: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const totalPrice = selectedSeats.length * showtime.price;

  function formatShowtime(startTime: string | Date, roomName?: string): string {
    const date = new Date(startTime);
    const formatter = new Intl.DateTimeFormat("vi-VN", {
      weekday: "long",
      day: "numeric",
      month: "numeric",
    });
    const time = date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formatter.format(date)} ${time} - ${roomName?.toUpperCase()}`;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-8 transition-colors">
      <div className="container mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent mb-6 flex items-center gap-2">
          {showtime.movieTitle}
        </h1>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-200">
            <p className="flex items-center gap-2 text-base font-medium text-muted-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-foreground">
                {formatShowtime(showtime.startTime, showtime.roomName)}
              </span>
            </p>

            <p className="flex items-center gap-2">
              💰 Giá vé: <strong>{showtime.price.toLocaleString()} VND</strong>
            </p>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">🎟️ Sơ đồ ghế</h2>

          <div className="flex justify-center mb-2">
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: `40px repeat(${cols}, 56px)` }}
            >
              <div />
              {Array.from({ length: cols }).map((_, i) => (
                <div
                  key={i}
                  className="text-center text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: `40px repeat(${cols}, 56px)` }}
            >
              {rows.map((rowLabel) => (
                <div key={rowLabel + "-row"} className="contents">
                  <div className="flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300">
                    {rowLabel}
                  </div>
                  {Array.from({ length: cols }).map((_, colIndex) => {
                    const columnNumber = colIndex + 1;
                    const seat = showtime.seats?.find(
                      (s) => s.row === rowLabel && s.column === columnNumber
                    );

                    if (seat) {
                      const isBooked = showtime.tickets?.some(
                        (t) =>
                          t.seatId === seat.seatId &&
                          (t.status === "Đã đặt" || t.status === "Booked")
                      );
                      const isSelected = selectedSeats.includes(seat.seatId);

                      return (
                        <button
                          key={seat.seatId}
                          disabled={isBooked}
                          onClick={() => toggleSeat(seat.seatId)}
                          className={`w-14 h-14 flex items-center justify-center text-sm font-bold rounded-lg transition-all duration-200 select-none
                            ${
                              isBooked
                                ? "bg-red-600 text-white cursor-not-allowed"
                                : isSelected
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-green-200 dark:bg-green-700 text-gray-900 dark:text-white hover:bg-green-300 dark:hover:bg-green-600"
                            }`}
                          title={`${seat.row}${seat.column} - ${
                            isBooked ? "Đã đặt" : "Còn trống"
                          }`}
                        >
                          {seat.row}
                          {seat.column}
                        </button>
                      );
                    } else {
                      return (
                        <div
                          key={`${rowLabel}${columnNumber}`}
                          className="w-14 h-14 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-transparent"
                        />
                      );
                    }
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-200 dark:bg-green-700 rounded" />{" "}
              Còn trống
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded" /> Đang chọn
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-600 rounded" /> Đã đặt
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border-2 border-dashed border-gray-400 dark:border-gray-500 rounded" />{" "}
              Không có ghế
            </div>
          </div>

          {selectedSeats.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                🎫 Đã chọn: {selectedSeats.length} ghế - Tổng:{" "}
                <span className="text-orange-600 dark:text-yellow-400">
                  {totalPrice.toLocaleString()} VND
                </span>
              </p>
              <button
                className="mt-4 px-6 py-2 rounded-md bg-orange-600 hover:bg-orange-700 text-white font-medium transition-colors"
                onClick={handleBooking}
              >
                Đặt vé ngay
              </button>
              <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>⚠️ Bạn cần đăng nhập</DialogTitle>
                    <DialogDescription>
                      Vui lòng đăng nhập để thực hiện đặt vé.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
