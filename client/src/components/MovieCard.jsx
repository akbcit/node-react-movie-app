import React, { useState } from "react";
import "../assets/styles/MovieCard.css";
import convertDateFormat from "../utils/StringToDate";
import truncateText from "../utils/TruncateText";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import placeholderPoster from "../assets/images/poster_placeholder.jpg";

function MovieCard({ movie }) {
  //image loading state
  const [imageLoading, setImageLoading] = useState(true);
  // image url for movie poster
  const posterUrl = movie.poster_path === null ? placeholderPoster : `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  // movie title
  const title = movie.original_title;
  // release data
  const releaseDate = convertDateFormat(movie.release_date);
  // movie ratings
  const ratings = movie.vote_average.toFixed(1);
  // function to open movie page in a new tab and pass state
  const takeToMoviePage = (movie) => {
    // Perform any pre-navigation logic here
    window.open(`/${movie.id}`, '_blank');
  };

  return (
    <div className={`movie-card ${imageLoading ? 'loading' : ''}`}>
      <div className="image-container-movie">
        {(imageLoading) && <Skeleton height={240} width={160} />}
        <img
          src={posterUrl}
          alt={`${title}-poster`}
          className={`movie-poster ${imageLoading ? 'hidden' : ''}`}
          onLoad={() => { setImageLoading(false) }}
          onError={() => { setImageLoading(false) }}
          onClick={() => { takeToMoviePage(movie) }}
        />
      </div>
      <div className="movie-details">
        <h2 className={`movie-title ${imageLoading ? 'loading' : ''}`}>{imageLoading ? <Skeleton width={160} /> : title}</h2>
        <p className={`release-date ${imageLoading ? 'loading' : ''}`}>{imageLoading ? <Skeleton width={80} /> : releaseDate}</p>
        <p className={`rating ${imageLoading ? 'loading' : ''}`}>{imageLoading ? <Skeleton width={40} /> : ratings}</p>
      </div>
    </div>
  );
}

export default MovieCard;