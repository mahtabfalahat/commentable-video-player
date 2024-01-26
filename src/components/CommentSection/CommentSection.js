import React from "react";
import { formatTime } from "./../../utils/Utils";
import "./style.css";

const VideoDuration = 300;
const CommentSection = ({
  timestamp,
  currentTime,
  text,
  onSeek,
  seekBarWidth,
}) => {
  const isNearby = Math.abs(timestamp - currentTime) < 5;

  const handleHover = () => {
    onSeek((timestamp / VideoDuration) * 100);
  };

  const calculatePosition = () => {
    const percentage = (timestamp / VideoDuration) * 100;
    const leftPosition = `calc(${percentage}% - 10px)`; // Adjust as needed
    return leftPosition;
  };

  return (
    <div
      style={{
        display: "inline-block",
        cursor: "pointer",
        fontWeight: isNearby ? "bold" : "normal",
        position: "absolute",
        bottom: "0",
        left: calculatePosition(),
        transform: "translateX(-50%)",
        whiteSpace: "nowrap",
        maxWidth: "100px", // Adjust as needed
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      title={text}
      onMouseEnter={handleHover}
    >
      <div className="tooltip">
        {formatTime(timestamp)}
        <span className="tooltiptext">{text}</span>
      </div>
    </div>
  );
};

export default CommentSection;
