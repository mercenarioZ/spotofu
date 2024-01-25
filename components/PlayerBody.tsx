"use client";

import { Song } from "@/types";
import React, { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import usePlayer from "@/hooks/usePlayer";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import Slider from "./Slider";
import useSound from "use-sound";

interface PlayerBodyProps {
  song: Song;
  songPath: string;
}

const PlayerBody: React.FC<PlayerBodyProps> = ({ song, songPath }) => {
  const iconSize = 32;
  const [isPlaying, setIsPlaying] = useState(false);
  const player = usePlayer();
  const [volume, setVolume] = useState(1);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const [play, { pause, sound }] = useSound(songPath, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentSongIndex = player.ids.findIndex(
      (id) => id === player.activeId
    );
    const previousSong = player.ids[currentSongIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(previousSong);
  };

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentSongIndex = player.ids.findIndex(
      (id) => id === player.activeId
    );
    const nextSong = player.ids[currentSongIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPause = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    setVolume((previousState) => (previousState === 0 ? 1 : 0));
  };

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      {/* song information and like button */}
      <div className="flex w-full justify-start z-10">
        <div className="flex items-center gap-x-3">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      {/* Play button in small device view */}
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white cursor-pointer"
          onClick={() => {}}
        >
          <Icon
            size={28}
            className="text-neutral-900"
          />
        </div>
      </div>

      {/* previous/next/play buttons */}
      <div className="hidden ml-6 px-2 h-full md:flex justify-center items-center w-full max-w-[726px] gap-x-3">
        {/* backward icon */}
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={iconSize}
          className="text-neutral-400 hover:text-white transition cursor-pointer"
        />

        {/* play/pause icon */}
        <div
          className="cursor-pointer text-neutral-400 hover:text-white flex items-center justify-center h-10 w-10"
          onClick={onPlayPause}
        >
          <Icon size={42} />
        </div>

        {/* forward icon */}
        <AiFillStepForward
          onClick={onPlayNext}
          className="text-neutral-400 hover:text-white transition cursor-pointer"
          size={iconSize}
        />
      </div>

      <div className="hidden text-neutral-400 md:flex w-full justify-end pr-2">
        {/* volume icon */}
        <div className="flex items-center w-32 gap-x-3">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={iconSize}
          />

          {/* volume slider */}
          <Slider
            value={volume}
            onChange={(value) => setVolume(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerBody;
