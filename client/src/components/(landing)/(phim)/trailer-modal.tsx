"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

function getYoutubeEmbedUrl(url: string): string {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  if (match?.[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return "";
}

export function TrailerModal({ trailerUrl }: { trailerUrl: string }) {
  const [open, setOpen] = useState(false);
  const embedUrl = getYoutubeEmbedUrl(trailerUrl);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="inline-block px-4 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:brightness-110 transition"
        >
          🎥 Xem trailer
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full aspect-video p-0 overflow-hidden">
        <DialogTitle className="sr-only">Trailer phim</DialogTitle>
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="Trailer"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="p-4 text-center text-red-500">Không thể phát trailer.</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
