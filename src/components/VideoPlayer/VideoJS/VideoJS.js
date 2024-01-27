import React, {memo, useRef, useEffect} from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./style.css";

export const VideoJS = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady, comments } = props;

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);
      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player, player.currentTime());

        player.controlBar.progressControl.seekBar.el().style.backgroundColor = "orange";
        player.width(640);
        player.height(360);
        player.controlBar.addChild("Component", {
          text: "Custom Text",
          style: {
            color: "red",
          },
        });
        player.el().style.backgroundColor = "lightgray";
        player.bigPlayButton.el().style.backgroundColor = "purple";
        player.controlBar.fullscreenToggle.el().style.backgroundColor = "purple";
        player.controlBar.addChild("Component", {
          text: "Custom Time",
          style: {
            color: "orange",
          },
        });
      }));
    } else {
      const player = playerRef.current;
      const times = comments.map((item) => {
        return item.timestamp
      });
      addSeekBarMarkers(player, times);
    }
  }, [options, videoRef, onReady, comments]);

  const addSeekBarMarkers = (player, times) => {
    const seekBar = player.controlBar.progressControl.seekBar;
    const progressBar = seekBar.el();
    const existingMarkers = progressBar.querySelectorAll('.custom-seekbar-marker');
    existingMarkers.forEach(marker => marker.remove());
    times.forEach((time) => {
      const marker = document.createElement("div");
      marker.classList.add("custom-seekbar-marker");
      marker.style.left = `${(time / player.duration()) * 100}%`;
      progressBar.appendChild(marker);
    });
  };

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default memo(VideoJS);