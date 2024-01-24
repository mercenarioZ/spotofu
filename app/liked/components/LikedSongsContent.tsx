"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedSongsContentProps {
  songs: Song[];
}

const LikedSongsContent: React.FC<LikedSongsContentProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  // redirect to login page if user is not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, router, user]);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <p className="text-neutral-400 font-medium text-md">
          You have not liked any songs yet.
        </p>
      </div>
    );
  }

  return (
    <div className="px-3 mt-4">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center w-full gap-x-4">
          <MediaItem
            onClick={() => {}}
            data={song}
          />
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedSongsContent;
