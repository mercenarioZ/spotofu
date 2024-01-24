"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = React.useState(false);

  React.useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const LikeIcon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLikeClick = async () => {
    // if user is not logged in, show the auth modal
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId)
      
      if (error) {
        toast.error(error.message)
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient
        .from("liked_songs")
        .insert({
          user_id: user.id,
          song_id: songId,
        })
      
      if (error) {
        toast.error(error.message)
      } else {
        // if there is no error, set isLiked to true
        setIsLiked(true);
      }
    }

    // refresh the page to see the changes
    router.refresh();
  }
  
  return (
    <button onClick={handleLikeClick} className="hover:-translate-y-1/4 hover:opacity-70 transition">
      <LikeIcon
        color={isLiked ? "#22c55e" : "white"}
        size={24}
      />
    </button>
  );
};

export default LikeButton;
