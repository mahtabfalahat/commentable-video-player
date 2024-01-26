import React, { useState, useEffect } from "react";
import videojs from "video.js";
import VideoJS from "./VideoJS/VideoJS";
import example from "./../../assets/example.mp4";

export const VideoPlayer = (props) => {
  console.log(props);
  const [currentTime, setCurrentTime] = useState(0); // State to store the current time

  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: example,
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
      // Update the component's state with the current time
      // setCurrentTime(player.currentTime());
      console.log(player.currentTime());
      // props.onTimeUpdate(player.currentTime());
    });
  };

  return (
    <>
      <div>Rest of app here</div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      {/* <p>{currentTime ? currentTime : ""}</p> */}
      {/* {props.onTimeUpdate && props.onTimeUpdate(currentTime)} */}
    </>
  );
};

export default VideoPlayer;
