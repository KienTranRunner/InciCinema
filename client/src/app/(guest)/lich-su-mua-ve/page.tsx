"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Ticket = {
  ticketId: number;
  seatId: number;
  seatNumber: string;
  price: number;
  bookingTime: string;
  status: string;
  userId: number;
  title: string;
  roomName: string;
  startTime: string;
};

export default function MyTicketPage() {
  const { data: session, status } = useSession();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchTickets = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/ticket/ticket/${session?.user.id}`
        );
        if (!res.ok) throw new Error("Lỗi khi tải vé");
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [session, status]);

  if (status === "loading") {
    return <p className="text-center mt-10">Đang kiểm tra đăng nhập...</p>;
  }

  if (status !== "authenticated") {
    return <p className="text-center mt-10">Vui lòng đăng nhập để xem vé của bạn.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">🎟️ Vé của tôi</h2>

      {loading ? (
        <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
      ) : tickets.length === 0 ? (
        <p className="text-center text-gray-500">Bạn chưa đặt vé nào.</p>
      ) : (
        <div className="space-y-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.ticketId}
              className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md bg-white dark:bg-gray-900 transition hover:shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Mã vé:{" "}
                    <span className="font-semibold text-black dark:text-white">
                      #{ticket.ticketId}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Trạng thái:{" "}
                    <span className="text-blue-600 font-semibold">{ticket.status}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Giá vé:</p>
                  <p className="text-lg font-bold text-red-500">
                    {ticket.price.toLocaleString()}₫
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                <p>
                  🎬 <span className="font-medium">Phim:</span> {ticket.title}
                </p>
                <p>
                  🛋️ <span className="font-medium">Ghế:</span> {ticket.seatNumber}
                </p>
                <p>
                  🏟️ <span className="font-medium">Phòng chiếu:</span> {ticket.roomName}
                </p>
                <p>
                  🕓 <span className="font-medium">Giờ chiếu:</span>{" "}
                  {new Date(ticket.startTime).toLocaleString("vi-VN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
