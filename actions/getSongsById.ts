/**
 * `getSongsById` is used to get songs by id
 *
 * first we check the session to see if the user is logged in
 *
 * this action returns a song array
 */

import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongsById = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies: cookies });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  console.log(sessionData);

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSongsById;
