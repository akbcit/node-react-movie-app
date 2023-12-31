import React from "react";
import YouTube from "react-youtube";

function YouTubePlayer({ videoId,height,width }) {
  const opts = {
    height: height,
    width: width,
    playerVars: {
      autoplay: 0,
      origin: 'https://www.youtube-nocookie.com',
    },
  };

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onReady} />;
}

export default YouTubePlayer;
