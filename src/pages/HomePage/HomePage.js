import React, { useState } from "react";
import { formatTime } from "./../../utils/Utils";
import {
  PROXIMITY_THRESHOLD,
  VIDEO_DURATION,
} from "./../../constants/Constants";
import VideoPlayer from "./../../components/VideoPlayer/VideoPlayer";
import SeekBar from "./../../components/SeekBar/SeekBar";
import MainButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import "./style.css";

const CommentableVideoPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    const existingComment = comments.find(
      (comment) =>
        Math.abs(comment.timestamp - currentTime) < PROXIMITY_THRESHOLD
    );

    if (existingComment) {
      const updatedComments = comments.map((comment) =>
        Math.abs(comment.timestamp - currentTime) < PROXIMITY_THRESHOLD
          ? { ...comment, text: newComment }
          : comment
      );
      setComments(updatedComments);
    } else {
      setComments([...comments, { timestamp: currentTime, text: newComment }]);
    }

    setNewComment("");
    setShowInput(false);
  };

  const handleSeek = (percentage) => {
    const newTime = (percentage / 100) * VIDEO_DURATION;
    setCurrentTime(newTime);
  };

  return (
    <div className="homepage-container">
      <div className="form-container">
        <MainButton
          btnType="fullWidthBtn"
          clicked={() => setShowInput(!showInput)}
        >
          Add Comment at {formatTime(currentTime)}
        </MainButton>

        {showInput && (
          <div className="comment-submit-container">
            <CustomInput
              type="text"
              placeholder="Enter your comment..."
              value={newComment}
              onChange={handleCommentChange}
            />
            <MainButton btnType="greenBtn" clicked={handleAddComment}>
              Submit Comment
            </MainButton>
          </div>
        )}
      </div>
      <div className="video-player-container">
        <VideoPlayer onTimeUpdate={handleTimeUpdate} />
        <SeekBar
          currentTime={currentTime}
          comments={comments}
          onSeek={handleSeek}
        />
        <div className="comment-container">
          {comments.map((comment, index) => (
            <div className="comment-box" key={index}>
              <p className="comment-text-style">{comment.text}</p>
              <p>on</p>
              <p className="comment-time-text-style">
                {formatTime(comment.timestamp)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentableVideoPlayer;
