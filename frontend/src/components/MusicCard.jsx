import { useState, useRef, useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { X } from "lucide-react";

import VolumeScrollBar from "./MusicCard/VolumeScrollBar";

const songs = [
  "Brown Noise",
  "Pink Noise",
  "Rain Sounds",
  "Deep Focus",
  "Cafe",
  "Ocean Waves",
];

const MusicCard = ({ setSelectedSong, volume, setVolume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        fixed
        left-0
        top-1/2
        -translate-y-1/2
        z-50
        transition-all
        duration-300
      `}
    >
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="
            w-12
            h-56
            rounded-r-xl
            bg-white
            dark:bg-[#262626]
            flex
            items-center
            justify-center
            shadow-lg
          "
        >
          <FaChevronRight size={22} className="text-black dark:text-white" />
        </button>
      ) : (
        <div
          className="
            w-72
            h-[500px]
            bg-white
            dark:bg-[#262626]
            rounded-r-2xl
            shadow-2xl
            border
            border-gray-200
            dark:border-[#444]
            p-4
          "
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg dark:text-white">Focus Music</h2>

            <button onClick={() => setIsOpen(false)}>
              <X size={20} className="text-gray-500 dark:text-white" />
            </button>
          </div>

          {/* Songs */}
          <div className="space-y-3">
            {songs.map((song, index) => (
              <button
                onClick={() => setSelectedSong(index)}
                key={index}
                className="
                  w-full
                  text-left
                  px-4
                  py-3
                  rounded-xl
                  bg-gray-100
                  dark:bg-[#333]
                  dark:text-white
                  hover:bg-gray-200
                  dark:hover:bg-[#444]
                  transition
                "
              >
                🎵 {song}
              </button>
            ))}
          </div>

          {/* Volume */}
          <div className="h-[90px] flex justify-start items-center">
            <div className="w-full flex justify-between px-2 py-2 gap-2">
              <FaVolumeUp color="white" size={35} />
              <VolumeScrollBar volume={volume} setVolume={setVolume} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicCard;
