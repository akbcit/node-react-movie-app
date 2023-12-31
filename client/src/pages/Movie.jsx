import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import "../assets/styles/Movie.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import placeholderBackdrop from "../assets/images/backdrop_placeholder.png";
import { PulseLoader } from "react-spinners";
import VideoBox from "../components/VideoBox";
import trimMovieVideoArray from "../utils/trimMovieVideoArray";
import GenreChip from "../components/GenreChip";
import RatingCircle from "../components/RatingCircle";
import filterCrew from "../utils/filterCrew";
import CastCard from "../components/CastCard";
import CrewGrid from "../components/CrewGrid";

function Movie() {
  const [movie, setMovie] = useState(false);
  const [movieVideo, setMovieVideo] = useState(false);
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieCrew, setMovieCrew] = useState([]);
  const { movieId } = useParams();

  const getMovie = async () => {
    try {
      const fetchedMovie = await axiosInstance.get(`/movies/movie/${movieId}`);
      const fetchedVideos = await axiosInstance.get(`/movies/movie/${movieId}/videos`);
      const fetchedCrew = await axiosInstance.get(`/movies/movie/${movieId}/crew`);
      setMovieCrew(filterCrew(fetchedCrew.data));
      setMovie(fetchedMovie.data);
      setMovieVideo(trimMovieVideoArray(fetchedVideos.data.results));
    } catch (error) {
      console.error("Error fetching movie data", error);
      // Handle the error appropriately
    }
  };

  useEffect(() => {
    getMovie();
  }, [movieId]);

  useEffect(() => {
    if (movie && movie.genres && movie.genres.length > 0) {
      const genres = movie.genres.map(genre => genre.name);
      setMovieGenres(genres);
    }
  }, [movie]);

  const backDropUrl = movie && movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : placeholderBackdrop;

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const backdrop = new Image();
    backdrop.src = backDropUrl;
    const handleLoad = () => setIsLoaded(true);
    const handleError = () => setHasError(true);

    backdrop.addEventListener("load", handleLoad);
    backdrop.addEventListener("error", handleError);

    return () => {
      backdrop.removeEventListener("load", handleLoad);
      backdrop.removeEventListener("error", handleError);
    };
  }, [backDropUrl]);

  return (
    <>
      {!movie || !isLoaded || hasError ? (
        <PulseLoader color="#36d7b7" size={10} />
      ) : (
        <div id="movie-page" style={{ backgroundImage: `url(${backDropUrl})` }}>
          <div className="overlay">
            <h1 id="moviepage-title">{movie.original_title}</h1>
            <CrewGrid crew = {movieCrew}/>
            <div id="moviepage-main">
              {movieVideo && <VideoBox movieVideo={movieVideo} />}
              <div id="moviepage-overview">{movie.overview}</div>
            </div>
            <div id="moviepage-details">
              <div id="genre-chips">
                {movieGenres.map((genre, index) => {
                  return <GenreChip key={index} genre={genre} />;
                })}
              </div>
              {movie.vote_average && movie.vote_count ? (
                <div id="moviepage-rating">
                  <RatingCircle rating={movie.vote_average * 10} />
                  <div id="moviepage-rating-details">
                    <p>{Math.round(movie.vote_average * 10) / 10}</p>
                    <p>{`(${movie.vote_count} votes)`}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div id="castcards-grid">
              {movieCrew&&movieCrew.actors.length>0&&movieCrew.actors.map((actor,index)=>{
                return <CastCard key={index} actor={actor}/>
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Movie;
