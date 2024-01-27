import React, { memo } from "react";
import videojs from "video.js";
import VideoJS from "./VideoJS/VideoJS";
import learnVideo from "./../../assets/Media/learnVideo.mp4";

export const VideoPlayer = ({ comments, onTimeUpdate }) => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: learnVideo,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });
    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
    player.on("timeupdate", () => {
      onTimeUpdate(player.currentTime());
    });
  };

  return <VideoJS options={videoJsOptions} comments={comments ? comments : []} onReady={handlePlayerReady} />;
};

export default memo(VideoPlayer);
