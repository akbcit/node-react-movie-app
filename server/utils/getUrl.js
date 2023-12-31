require("dotenv").config();
// get api key
const apiKey = process.env.TMDB_API_Key;

// trending movies url
exports.trendingMoviesURL = (pageNum) =>
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${pageNum}&include_video=true`;
exports.topRatedMoviesURL = (pageNum) =>
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${pageNum}&include_video=true`;
// popular movies url
exports.popularMoviesURL = (pageNum) =>
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${pageNum}&include_video=true`;
// now playing movies url
exports.nowPlayingMoviesURL = (pageNum) =>
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pageNum}&include_video=true`;
// get genres
exports.genresURl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
// get search url
exports.tmdbSearchURL = ({
  year = '',
  genre = '',
  originalLanguage = '',
  sortByYear = false,
  sortByRating = false,
  sortByPopularity = false,
  includeAdult = false,
  page = 1,
  searchPhrase = '', // New parameter for movie name search
}) => {
  let baseUrl = 'https://api.themoviedb.org/3/';
  let url = searchPhrase ? 
      `${baseUrl}search/movie?api_key=${apiKey}&language=en-US&page=${page}&query=${encodeURIComponent(searchPhrase)}` :
      `${baseUrl}discover/movie?api_key=${apiKey}&language=en-US&page=${page}&include_video=true`;

  if (year) {
    url += `&primary_release_year=${year}`;
  }

  if (genre) {
    url += `&with_genres=${genre}`;
  }

  if (originalLanguage) {
    url += `&with_original_language=${originalLanguage}`;
  }

  if (sortByYear) {
    url += `&sort_by=primary_release_date.asc`;
  }

  if (sortByRating) {
    url += `&sort_by=vote_average.desc`;
  }

  if (sortByPopularity) {
    url += `&sort_by=popularity.desc`;
  }

  if (includeAdult) {
    url += `&include_adult=true`;
  } else {
    url += `&include_adult=false`;
  }

  return url;
};
// url for a specific movie
exports.movieURL = (movieId) => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&include_video=true`;
// url for a specific movie's videos
exports.movieVideoURL = (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
// url for a specific movie's credits
exports.movieCreditsURL = (movieId) => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&include_video=true&append_to_response=credits`;



