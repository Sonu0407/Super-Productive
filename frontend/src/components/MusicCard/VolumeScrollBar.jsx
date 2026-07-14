import React from "react";

const VolumeScrollBar = ({ volume, setVolume }) => {
  return (
    <input
      type="range"
      min="0"
      max="100"
      value={volume}
      onChange={(e) => setVolume(e.target.value)}
      className="w-full"
    />
  );
};

export default VolumeScrollBar;
