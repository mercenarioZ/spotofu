"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

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
    <button className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/25 transition px-2">
      <div className="relative min-w-[60px] min-h-[60px]">
        <Image />
      </div>
    </button>
  );
};

export default ListItem;
