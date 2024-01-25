"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongPath from "@/hooks/useLoadSongPath";
import usePlayer from "@/hooks/usePlayer";
import PlayerBody from "./PlayerBody";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  // reading the song_path from the song object
  const songPath = useLoadSongPath(song!);

  // if there is no song path, song or activeId, return null to not render the player UI
  if (!songPath || !song || !player.activeId) return null;

  return (
    <div className="fixed bottom-0 my-2 bg-black w-full h-[80px] px-4 py-2">
      <PlayerBody
        key={songPath}
        song={song}
        songPath={songPath}
      />
    </div>
  );
};

export default Player;
