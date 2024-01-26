import React from "react";
import CommentSection from "./../CommentSection/CommentSection";

const SeekBar = ({ currentTime, comments, onSeek }) => {
  const seekBarRef = React.useRef();
  const calculateSeekPercentage = (e) => {
    const seekBar = seekBarRef.current;
    const rect = seekBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    return percentage;
  };

  return (
    <div
      // style={{ marginTop: "10px", position: "relative", overflow: "hidden" }}
      ref={seekBarRef}
      onClick={(e) => onSeek(calculateSeekPercentage(e))}
    >
      {comments.map((comment, index) => (
        <CommentSection
          key={index}
          timestamp={comment.timestamp}
          currentTime={currentTime}
          text={comment.text}
          onSeek={onSeek}
          seekBarWidth={seekBarRef.current.clientWidth}
        />
      ))}
    </div>
  );
};

export default SeekBar;
