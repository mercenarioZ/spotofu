"use client";

import SongCard from "@/components/SongCard";
import { Song } from "@/types";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  if (songs.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">There are no songs here yet.</div>
    );
  }
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {songs.map((song) => (
        <SongCard
          key={song.id}
          onClick={() => {}}
          data={song}
        />
      ))}
    </div>
  );
};

export default PageContent;
