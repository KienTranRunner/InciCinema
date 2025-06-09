"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Room } from "@/types/room";

export default function EditRoomPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/room/${id}`
        );
        if (!res.ok) throw new Error("Không thể tải phòng chiếu.");
        const data = await res.json();
        setRoom(data);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Lỗi không xác định!"
        );
      }
    };

    fetchRoom();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const updatedRoom = {
    roomName: formData.get("roomName") as string,
    seatCount:  Number(formData.get("seatCount")),
    roomType: formData.get("roomType") as string,

    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/room/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRoom),
        }
      );

      if (!res.ok) throw new Error("Cập nhật phòng thất bại!");
      toast.success("Cập nhật phòng thành công!");
      router.push("/dashboard/room");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Lỗi không xác định!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  if (!room) {
    return <p className="text-center py-10">Đang tải dữ liệu phòng chiếu...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Card className="bg-white dark:bg-slate-900 shadow-lg border border-gray-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Cập nhật phòng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="roomName">Tên phòng</Label>
              <Input
                name="roomName"
                id="roomName"
                defaultValue={room.roomName}
                required
              />
            </div>

            <div>
              <Label htmlFor="roomType">Loại phòng</Label>
              <Textarea
                name="roomType"
                id="roomType"
                defaultValue={room.roomType}
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="duration">Tổng số ghế</Label>
                <Input
                  type="number"
                  name="seatCount"
                  id="seatCount"
                  defaultValue={room.seatCount}
                  required
                />
              </div>
              
            </div>


            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Đang cập nhật..." : "Cập nhật phòng"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
