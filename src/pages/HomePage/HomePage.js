import React, { useState, useCallback, useMemo } from "react";
import { formatTime, generateId } from "./../../utils/Utils";
import { PROXIMITY_THRESHOLD } from "./../../constants/Constants";
import VideoPlayer from "./../../components/VideoPlayer/VideoPlayer";
import MainButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import "./style.css";

const HomePage = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleTimeUpdate = useCallback((time) => {
    setCurrentTime(time);
  }, []);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  const handleAddComment = () => {
    const existingComment = comments.find((comment) => Math.abs(comment.timestamp - currentTime) < PROXIMITY_THRESHOLD);
    if (existingComment) {
      const updatedComments = comments.map((comment) => (Math.abs(comment.timestamp - currentTime) < PROXIMITY_THRESHOLD ? { ...comment, text: newComment } : comment));
      setComments(updatedComments);
    } else {
      setComments((prevComments) => [...prevComments, { id: generateId(), timestamp: currentTime, text: newComment }]);
    }
    setNewComment("");
    setShowInput(false);
  };
  const memoizedVideoPlayer = useMemo(() => <VideoPlayer onTimeUpdate={handleTimeUpdate} comments={comments} />, [handleTimeUpdate, comments]);

  return (
    <div className="homepage-container">
      <div className="form-container">
        <MainButton btnType="fullWidthBtn" clicked={() => setShowInput(!showInput)}>
          Add Comment at {formatTime(currentTime)}
        </MainButton>
        {showInput && (
          <div className="comment-submit-container">
            <CustomInput type="text" placeholder="Enter your comment..." value={newComment} onChange={handleCommentChange} />
            <MainButton btnType="greenBtn" clicked={handleAddComment}>
              Submit Comment
            </MainButton>
          </div>
        )}
      </div>
      <div className="video-player-container">
        <div className="video-box">
          {memoizedVideoPlayer}
          <div className="comment-container">
            {comments
              .filter((comment) => Math.abs(comment.timestamp - currentTime) < PROXIMITY_THRESHOLD)
              .map((comment, index) => (
                <div key={comment.id}>
                  <p>{comment.text}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
