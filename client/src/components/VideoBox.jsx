/* eslint-disable react/prop-types */
import React from "react";
import YouTubePlayer from "./YouTubePlayer";

function VideoBox({ movieVideo }) {

  return (
    <>
      {movieVideo.site === "YouTube" ? (
        <YouTubePlayer videoId={movieVideo.key} height={390} width={640} />
      ) : (
        <></>
      )}
    </>
  );
}

export default VideoBox;
