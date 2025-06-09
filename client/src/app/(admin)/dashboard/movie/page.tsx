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
import { Movie } from "@/types/movie";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "sonner";

export default function MovieManagementPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pending, setPending] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { theme } = useTheme();


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/movie`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);
        setPending(false);
      })
      .catch((err) => {
        console.error("Lỗi:", err);
        setPending(false);
      });
  }, []);

  useEffect(() => {
    const result = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredMovies(result);
  }, [search, movies]);

  const handleDelete = async () => {
    if (!selectedId) return;
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/movie/${selectedId}`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Xóa thất bại");
      }
  
      setMovies((prev) => prev.filter((p) => p.movieId !== selectedId));
      setFilteredMovies((prev) => prev.filter((p) => p.movieId !== selectedId));
      setSelectedId(null);
      toast.success("Xoá phim thành công")
    } catch (error) {
      console.error("Lỗi xóa:", error);
      toast.error("Lỗi khi xoá phim")
    }
  };
  
  

  const columns = [
    {
      name: "Mã Phim",
      selector: (row: Movie) => row.movieId,
      sortable: true,
    },
    {
      name: "Tên phim",
      selector: (row: Movie) => row.title,
      sortable: true,
    },
    {
        name: "Ngày phát hành",
        selector: (row: Movie) => row.releaseDate,
        sortable: true,
      },
    {
      name: "Thời lượng",
      selector: (row: Movie) => row.duration + " phút",
      sortable: true,
    },
    {
      name: "Ngôn ngữ",
      selector: (row: Movie) => row.language,
      sortable: true,
    },
    {
      name: "Thể loại",
      selector: (row: Movie) => row.genre,
      sortable: true,
    },
    {
      name: "Phân loại",
      selector: (row: Movie) => row.rating,
      sortable: true,
    },

    {
      name: "Chức năng",
      cell: (row: Movie) => (
        <div className="space-x-2">
          <Link href={`/dashboard/movie/update/${row.movieId}`}>
            <Button variant="outline" size="sm">
              Sửa
            </Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setSelectedId(row.movieId)}
              >
                Xóa
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc muốn xóa?</AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này sẽ xóa phim <strong>{row.title}</strong> khỏi
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
                <BreadcrumbPage>Phim</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Quản lý phim</h1>
            <Link href="/dashboard/movie/create">
              <Button>Thêm phim mới</Button>
            </Link>
          </div>

          <input
            type="text"
            placeholder="Tìm kiếm theo tên phim..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2"
          />

          <DataTable
            columns={columns}
            data={filteredMovies}
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
