const trimMovieVideoArray = (movieVideos) => {
  if (!movieVideos || movieVideos.length === 0) {
    return undefined;
  }
  if (movieVideos.length === 1) {
    return movieVideos[0];
  }
  return (
    movieVideos.find(
      (video) =>
        video.type === "Official Trailer" ||
        video.type === "International Trailer" ||
        video.type.toLowerCase().includes("trailer")
    ) || movieVideos[0]
  );
};

export default trimMovieVideoArray;
