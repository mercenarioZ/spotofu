"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  name: string;
  href: string;
  image: string;
}

const ListItem: React.FC<ListItemProps> = ({ name, href, image }) => {
  const router = useRouter();

  const onClick = () => {
    // Auth before redirect
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/25 transition"
    >
      <div className="relative min-w-[60px] min-h-[60px]">
        <Image
          alt="liked"
          src={image}
          fill
          className="object-cover"
        />
      </div>

      <p className="font-medium text-sm truncate py-4">{name}</p>

      <div className="absolute flex items-center justify-center right-4 rounded-full bg-green-600 p-3 drop-shadow-md group-hover:opacity-100 opacity-0 hover:scale-110 transition">
        <FaPlay />
      </div>
    </button>
  );
};

export default ListItem;
