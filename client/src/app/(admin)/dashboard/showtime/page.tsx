"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Trash2, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Movie } from "@/types/movie";
import { Room } from "@/types/room";
import { Showtime } from "@/types/showtime";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function ShowtimeManagementPage() {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);

  const [duplicateInfo, setDuplicateInfo] = useState<{
    movieTitle: string;
    roomName: string;
    startTime: string;
    endTime: string;
  } | null>(null);

  const [form, setForm] = useState<Omit<Showtime, "showTimeId">>({
    movieId: 0,
    startTime: "",
    roomId: 0,
    endTime: "",
    price: 0,
  });
  const [editId, setEditId] = useState<number | null>(null);

  const fetchShowtimes = async () => {
    setLoadingTable(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/showtime`
      );
      if (!res.ok) throw new Error("Failed to fetch showtimes");
      const data = await res.json();
      setShowtimes(data);
    } catch {
      toast.error("Không thể tải danh sách suất chiếu");
    } finally {
      setLoadingTable(false);
    }
  };

  const fetchMovies = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/movie`
      );
      if (!res.ok) throw new Error("Failed to fetch movies");
      const data = await res.json();
      setMovies(data);
    } catch {
      toast.error("Lỗi khi tải danh sách phim");
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/room`
      );
      if (!res.ok) throw new Error("Failed to fetch rooms");
      const data = await res.json();
      setRooms(data);
    } catch {
      toast.error("Lỗi khi tải danh sách phòng");
    }
  };

  useEffect(() => {
    fetchShowtimes();
    fetchMovies();
    fetchRooms();
  }, []);

  const isFormValid = () =>
    form.movieId > 0 && form.roomId > 0 && form.startTime.trim() !== "";

  const handleSubmit = async () => {
    if (!isFormValid()) {
      toast.error("Vui lòng chọn phim, phòng và thời gian bắt đầu hợp lệ");
      return;
    }

    const selectedMovie = movies.find((m) => m.movieId === form.movieId);
    if (!selectedMovie) {
      toast.error("Không tìm thấy thông tin phim");
      return;
    }

    const start = new Date(form.startTime);
    const end = new Date(start.getTime() + selectedMovie.duration * 60000);

    const overlap = showtimes.find((s) => {
      if (editId && s.showTimeId === editId) return false;
      if (s.roomId !== form.roomId) return false;

      const existingStart = new Date(s.startTime).getTime();
      const existingEnd = new Date(s.endTime).getTime();

      return start.getTime() < existingEnd && end.getTime() > existingStart;
    });

    if (overlap) {
      const movieTitle =
        movies.find((m) => m.movieId === overlap.movieId)?.title ||
        "(Không rõ)";
      const roomName =
        rooms.find((r) => r.roomId === overlap.roomId)?.roomName ||
        "(Không rõ)";
      setDuplicateInfo({
        movieTitle,
        roomName,
        startTime: new Date(overlap.startTime).toLocaleString("vi-VN"),
        endTime: new Date(overlap.endTime).toLocaleString("vi-VN"),
      });
      return;
    }

    const fullData = {
      ...form,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
    };

    setLoading(true);
    try {
      const url = editId
        ? `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/showtime/${editId}`
        : `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/showtime`;
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData),
      });

      if (!res.ok) throw new Error();

      toast.success(editId ? "Cập nhật thành công" : "Thêm thành công");
      setForm({
        movieId: 0,
        startTime: "",
        roomId: 0,
        endTime: "",
        price: 0,
      });
      setEditId(null);
      await fetchShowtimes();
    } catch {
      toast.error("Lỗi khi lưu suất chiếu");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xoá suất chiếu này không?")) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/showtime/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error();
      toast.success("Đã xoá suất chiếu");
      await fetchShowtimes();
    } catch {
      toast.error("Xoá thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (s: Showtime) => {
    setEditId(s.showTimeId);
    setForm({
      movieId: s.movieId,
      startTime: new Date(s.startTime).toISOString().slice(0, 16),
      roomId: s.roomId,
      endTime: s.endTime,
      price: s.price,
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Quản lý suất chiếu</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">
          {editId ? "Chỉnh sửa suất chiếu" : "Thêm suất chiếu"}
        </h2>

        <select
          className="w-full border rounded p-2"
          value={form.movieId}
          onChange={(e) =>
            setForm({ ...form, movieId: Number(e.target.value) })
          }
        >
          <option value={0} disabled>
            Chọn phim...
          </option>
          {movies.map((movie) => (
            <option key={movie.movieId} value={movie.movieId}>
              {movie.title}
            </option>
          ))}
        </select>
        <Dialog
          open={!!duplicateInfo}
          onOpenChange={() => setDuplicateInfo(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Trùng suất chiếu</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <p>
                Suất chiếu đã trùng với phim:{" "}
                <strong>{duplicateInfo?.movieTitle}</strong>
              </p>
              <p>
                Phòng chiếu: <strong>{duplicateInfo?.roomName}</strong>
              </p>
              <p>
                Từ: <strong>{duplicateInfo?.startTime}</strong> <br />
                Đến: <strong>{duplicateInfo?.endTime}</strong>
              </p>
            </div>
            <DialogFooter>
              <Button onClick={() => setDuplicateInfo(null)}>Đóng</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex-1">
          <Label htmlFor="startTime">Thời gian bắt đầu</Label>
          <Input
            type="datetime-local"
            name="startTime"
            id="startTime"
            value={form.startTime}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            required
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="price">Giá vé (VNĐ)</Label>
          <Input
            type="number"
            id="price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
            min={0}
          />
        </div>

        <select
          className="w-full border rounded p-2"
          value={form.roomId}
          onChange={(e) => setForm({ ...form, roomId: Number(e.target.value) })}
        >
          <option value={0} disabled>
            Chọn phòng...
          </option>
          {rooms.map((room) => (
            <option key={room.roomId} value={room.roomId}>
              {room.roomName}
            </option>
          ))}
        </select>

        <Button onClick={handleSubmit} disabled={loading}>
          {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
          {editId ? "Cập nhật" : "Thêm mới"}
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Danh sách suất chiếu</h2>

        {loadingTable ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
          </div>
        ) : (
          <div className="overflow-auto">
            <table className="min-w-full table-auto text-sm text-left">
              <thead>
                <tr className="border-b dark:border-gray-600">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Phim</th>
                  <th className="px-4 py-2">Thời gian bắt đầu</th>
                  <th className="px-4 py-2">Thời gian kết thúc</th>
                  <th className="px-4 py-2">Phòng</th>
                  <th className="px-4 py-2">Giá vé</th>
                  <th className="px-4 py-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {showtimes.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-2 text-center text-gray-500"
                    >
                      Không có dữ liệu
                    </td>
                  </tr>
                ) : (
                  showtimes.map((s) => (
                    <tr
                      key={s.showTimeId}
                      className="border-t dark:border-gray-700"
                    >
                      <td className="px-4 py-2">{s.showTimeId}</td>
                      <td className="px-4 py-2">
                        {movies.find((m) => m.movieId === s.movieId)?.title ||
                          "(Không rõ)"}
                      </td>
                      <td className="px-4 py-2">
                        {new Intl.DateTimeFormat("vi-VN", {
                          dateStyle: "short",
                          timeStyle: "short",
                        }).format(new Date(s.startTime))}
                      </td>
                      <td className="px-4 py-2">
                        {new Intl.DateTimeFormat("vi-VN", {
                          dateStyle: "short",
                          timeStyle: "short",
                        }).format(new Date(s.endTime))}
                      </td>
                      <td className="px-4 py-2">
                        {rooms.find((r) => r.roomId === s.roomId)?.roomName ||
                          s.roomId}
                      </td>
                      <td className="px-4 py-2">
                        {s.price.toLocaleString("vi-VN")} ₫
                      </td>

                      <td className="px-4 py-2 flex gap-2">
                        <Button size="sm" onClick={() => handleEdit(s)}>
                          <Pencil className="w-4 h-4 mr-1" /> Sửa
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(s.showTimeId)}
                          disabled={loading}
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> Xoá
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
