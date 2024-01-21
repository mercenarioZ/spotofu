"use client";

import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Handle logout here
  };

  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-green-700 p-6",
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 p-1 transition"
          >
            <RxCaretLeft size={32} />
          </button>

          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 p-1 transition"
          >
            <RxCaretRight size={32} />
          </button>
        </div>

        {/* For mobile view */}
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome
              className="text-black"
              size={22}
            />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch
              className="text-black"
              size={22}
            />
          </button>
        </div>

        <div className="flex justify-between items-center gap-x-4">
          <>
            <Button
              onClick={() => {}}
              className="font-medium"
            >
              Sign up
            </Button>

            <Button
              onClick={() => {}}
              className="font-medium bg-white text-neutral-700 rounded-full"
            >
              Log in
            </Button>
          </>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
