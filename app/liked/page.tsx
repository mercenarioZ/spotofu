import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import Image from "next/image";
import LikedSongsContent from "./components/LikedSongsContent";

export const revalidate = 0;

const LikedPage = async () => {
  const likedSongs = await getLikedSongs();

  return (
    <div className="bg-neutral-900 h-full w-full rounded-lg overflow-hidden overflow-y-auto">
      <Header>
        <div className="mt-16">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative w-32 h-32">
              <Image
                fill
                src="/images/liked.png"
                alt="playlist thumnail"
              />
            </div>

            <div className="flex flex-col gap-y-2 md:mt-0 mt-4">
              <p className="hidden md:block font-semibold">Playlist</p>

              <p className="font-bold text-md sm:text-2xl lg:text-3xl">
                Songs you like
              </p>
            </div>
          </div>
        </div>
      </Header>

      {/* Display liked songs */}
      <LikedSongsContent songs={likedSongs} />
    </div>
  );
};

export default LikedPage;
