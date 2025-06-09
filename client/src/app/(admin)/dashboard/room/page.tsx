"use client";

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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Room } from "@/types/room";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "sonner";

export default function MovieManagementPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [pending, setPending] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/room`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        setFilteredRooms(data);
        setPending(false);
      })
      .catch((err) => {
        console.error("Lỗi:", err);
        setPending(false);
      });
  }, []);

  useEffect(() => {
    const result = rooms.filter((room) =>
      room.roomName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRooms(result);
  }, [search, rooms]);

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/api/room/${selectedId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Xóa thất bại");
      }

      setRooms((prev) => prev.filter((p) => p.roomId !== selectedId));
      setFilteredRooms((prev) => prev.filter((p) => p.roomId !== selectedId));
      setSelectedId(null);
      toast.success("Xoá phòng thành công");
    } catch (error) {
      console.error("Lỗi xóa:", error);
      toast.error("Lỗi khi xoá phim");
    }
  };

  const columns = [
    {
      name: "Mã phòng",
      selector: (row: Room) => row.roomId,
      sortable: true,
      width: "100px",
    },
    {
      name: "Tên phòng",
      selector: (row: Room) => row.roomName,
      sortable: true,
    },
    {
      name: "Tổng số ghế",
      selector: (row: Room) => row.seatCount,
      sortable: true,
    },
    {
      name: "Loại phòng",
      selector: (row: Room) => row.roomType,
      sortable: true,
    },

    {
      name: "Chức năng",
      cell: (row: Room) => (
        <div className="space-x-2">
            
          <Link href={`/dashboard/room/${row.roomId}`}>
            <Button variant="outline" size="sm">
              Quản lý ghế
            </Button>
          </Link>
          <Link href={`/dashboard/room/update/${row.roomId}`}>
            <Button variant="outline" size="sm">
              Sửa
            </Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setSelectedId(row.roomId)}
              >
                Xóa
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc muốn xóa?</AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này sẽ xóa phim <strong>{row.roomName}</strong> khỏi
                  hệ thống.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Xác nhận xóa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];
  const customStyles = {
    rows: {
      style: {
        backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
        color: theme === "dark" ? "#FFFFFF" : "#000000",
      },
    },
    headCells: {
      style: {
        backgroundColor: theme === "dark" ? "#121212" : "#F5F5F5",
        color: theme === "dark" ? "#FFFFFF" : "#000000",
      },
    },
    cells: {
      style: {
        backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
        color: theme === "dark" ? "#FFFFFF" : "#000000",
      },
    },
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Quản lý rạp chiếu phim</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Phòng chiếu</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Quản lý phòng chiếu</h1>
            <Link href="/dashboard/room/">
              <Button>Thêm phòng mới</Button>
            </Link>
          </div>

          <input
            type="text"
            placeholder="Tìm kiếm theo tên phòng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2"
          />

          <DataTable
            columns={columns}
            data={filteredRooms}
            progressPending={pending}
            pagination
            highlightOnHover
            responsive
            noDataComponent="Không có dữ liệu"
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 20, 50]}
            customStyles={customStyles}
          />
        </div>
      </div>
    </SidebarInset>
  );
}
