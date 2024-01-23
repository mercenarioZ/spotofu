"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface SongCardProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongCard: React.FC<SongCardProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);

  return (
    <div
      onClick={() => onClick(data.id)}
      className="
        relative
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-400/10
        cursor-pointer
        hover:bg-neutral-400/20
        transition
        p-3
        text-md
      "
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imagePath || ""}
          fill
          alt="img"
        />
      </div>

      <div className="flex flex-col items-start w-full pt-3 gap-y-1">
        <p className="font-semibold truncate w-full mt-1">{data.title}</p>
        <p className="border-t text-sm text-neutral-400 truncate border-neutral-400/30 w-full pt-2">
          by {data.author}
        </p>
      </div>

      <div className="absolute bottom-24 right-5">
        {/* <PlayButton /> */}
      </div>
    </div>
  );
};

export default SongCard;
