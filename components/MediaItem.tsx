"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import React from "react";

interface MediaItemProps {
  onClick?: (id: string) => void;
  data: Song;
}

const MediaItem: React.FC<MediaItemProps> = ({ onClick, data }) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      onClick(data.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/60 p-2 rounded-md w-full transition"
    >
      <div className="relative rounded-md min-w-10 min-h-10 overflow-hidden">
        <Image
          alt="sidebar-img"
          src={imageUrl || "/images/liked.png"}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="truncate">{data.title}</p>
        <p className="truncate text-neutral-500 text-sm">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
