"use client";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

const Library = () => {
  const authModal = useAuthModal();
  const { user } = useUser();
  const uploadModal = useUploadModal();

  const onClick = () => {
    // If the user is not logged in, show the auth modal
    if (!user) {
      return authModal.onOpen();
    }

    // Todo: Check for subscription
    
    uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="flex items-center gap-x-2">
          <TbPlaylist
            className="text-neutral-400"
            size={24}
          />
          <p className="text-neutral-400 font-medium text-md">Your songs</p>
        </div>

        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      {/* List of songs */}
      <div className="flex flex-col gap-y-2 mt-4 px-3">List of songs</div>
    </div>
  );
};

export default Library;
