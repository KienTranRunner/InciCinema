"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { toast } from "sonner";
import { Seat } from "@/types/seat";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function SeatManagementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const roomId = Number(id);
  const router = useRouter();

  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);

  const generateSeats = () => {
    const seats = [];
    for (let r = 0; r < rows; r++) {
      const rowLabel = String.fromCharCode(65 + r);
      for (let c = 1; c <= cols; c++) {
        seats.push({
          seatNumber: `${rowLabel}${c}`,
          row: rowLabel,
          column: c,
          roomId,
        });
      }
    }
    return seats;
  };

  useEffect(() => {
    async function fetchSeats() {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/seat/room/${roomId}`
        );
        if (!res.ok) throw new Error("Lỗi khi lấy danh sách ghế");
        const data: Seat[] = await res.json();
        setSeats(data);

        if (data.length > 0) {
          const maxRowChar = data.reduce(
            (max, seat) => (seat.row > max ? seat.row : max),
            "A"
          );
          const maxCol = data.reduce(
            (max, seat) => (seat.column > max ? seat.column : max),
            0
          );
          setRows(maxRowChar.charCodeAt(0) - 65 + 1);
          setCols(maxCol);
        }
      } catch (error) {
        console.error(error);
        toast.error("Lấy ghế thất bại");
      } finally {
        setLoading(false);
      }
    }

    if (roomId) {
      fetchSeats();
    }
  }, [roomId]);

  const handleCreateSeats = async () => {
    const newSeats = generateSeats();
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/seat/bulk`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSeats),
        }
      );

      if (!res.ok) throw new Error("Lỗi khi tạo ghế");

      toast.success("Tạo ghế thành công");
      setSeats(newSeats);
      router.push("/dashboard/room");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Đã xảy ra lỗi: " + error.message);
      } else {
        toast.error("Đã xảy ra lỗi không xác định");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelectedSeats = async () => {
    if (selectedSeats.length === 0) return;

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/seat/bulk`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomId,
            seatNumbers: selectedSeats,
          }),
        }
      );

      if (!res.ok) throw new Error("Xoá ghế thất bại");

      toast.success(`Đã xoá ${selectedSeats.length} ghế`);
      setSeats((prev) =>
        prev.filter((s) => !selectedSeats.includes(s.seatNumber))
      );
      setSelectedSeats([]);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi xoá ghế");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 sm:p-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Quản lý sơ đồ ghế - Phòng {roomId}
        </h1>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Hàng:
                </label>
                <Input
                  type="number"
                  value={rows}
                  onChange={(e) => setRows(Number(e.target.value))}
                  className="w-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  min={1}
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Cột:
                </label>
                <Input
                  type="number"
                  value={cols}
                  onChange={(e) => setCols(Number(e.target.value))}
                  className="w-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                  min={1}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                onClick={handleCreateSeats}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {loading ? "Đang tạo..." : "Tạo sơ đồ ghế"}
              </Button>
              {selectedSeats.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Xoá {selectedSeats.length} ghế đã chọn
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Bạn có chắc muốn xóa?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Hành động này sẽ xóa{" "}
                        <strong>{selectedSeats.length}</strong> ghế đã chọn khỏi
                        phòng {roomId}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteSelectedSeats}>
                        Xác nhận xóa
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </div>

        <div
          className="grid gap-2 justify-center mx-auto"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(40px, 48px))`,
            maxWidth: "100%",
          }}
        >
          {Array.from({ length: rows }).map((_, r) => {
            const rowLabel = String.fromCharCode(65 + r);
            return Array.from({ length: cols }).map((_, c) => {
              const columnNumber = c + 1;
              const seat = seats.find(
                (s) => s.row === rowLabel && s.column === columnNumber
              );

              if (seat) {
                const isSelected = selectedSeats.includes(seat.seatNumber);
                return (
                  <div
                    key={seat.seatNumber}
                    className={`relative w-12 h-12 flex items-center justify-center border rounded-lg text-sm font-medium
                      ${isSelected ? "bg-red-400 dark:bg-red-600" : "bg-gray-200 dark:bg-gray-700"}
                      text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600
                      hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer select-none`}
                    onClick={() => {
                      setSelectedSeats((prev) =>
                        prev.includes(seat.seatNumber)
                          ? prev.filter((s) => s !== seat.seatNumber)
                          : [...prev, seat.seatNumber]
                      );
                    }}
                  >
                    {seat.seatNumber}
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 dark:bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                        ×
                      </span>
                    )}
                  </div>
                );
              } else {
                return (
                  <div
                    key={`${rowLabel}${columnNumber}`}
                    className="w-12 h-12 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-transparent"
                  />
                );
              }
            });
          })}
        </div>

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex items-center gap-2 text-white text-lg">
              <Loader2 className="h-6 w-6 animate-spin" />
              Đang xử lý...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}