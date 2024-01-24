import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <button className="bg-green-500 rounded-full p-3 hover:scale-125 transition flex justify-center items-center hover:bg-green-600 opacity-0 group-hover:opacity-100 drop-shadow-lg translate translate-y-1/2 group-hover:translate-y-0">
      <FaPlay />
    </button>
  );
};

export default PlayButton;
