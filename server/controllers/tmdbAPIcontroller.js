const MovieAPIRepo = require("../repos/MovieAPIRepo");

// instantiate tmdbAPIrepo
const _movieAPIrepo = new MovieAPIRepo();

exports.GetMoviesByCategory = async function (req, res) {
  let { category, pageNum } = req.params;
  // if not pagenum param assume 1
  pageNum = pageNum ? pageNum : 1;
  const validCategories = ["playing", "trending", "popular", "toprated"];
  if (!validCategories.includes(category)) {
    res.status(404).json({ error: "Resource not found!" });
  }
  console.log(`getting ${category} movies pages ${pageNum} from repo`);
  // getting movies from API
  const movies = await _movieAPIrepo.getMovies(category, pageNum);
  if (movies) {
    res.status(200).json(movies);
  } else {
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.GetMoviesBySearch = async function (req, res) {
  let {
    year,
    genre,
    originalLanguage,
    sortByYear,
    sortByRating,
    sortByPopularity,
    includeAdult,
    page,
    searchPhrase,
  } = req.query || {};
  // convert genre and language to lowerCase
  genre = genre ? genre.toLowerCase() : genre;
  originalLanguage = originalLanguage
    ? originalLanguage.toLowerCase()
    : originalLanguage;
  const movies = await _movieAPIrepo.searchMovies(
    year,
    genre,
    originalLanguage,
    sortByYear,
    sortByRating,
    sortByPopularity,
    includeAdult,
    page,
    searchPhrase
  );
  if (movies) {
    res.status(200).json(movies);
  } else {
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.GetMovieById = async function (req, res) {
  const id = req.params.id;
  console.log(`getting movie ${id} from repo`);
  const movie = await _movieAPIrepo.getById(id);
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).json({ message: "not found", data: {} });
  }
};

exports.GetGenres = async function (req, res) {
  const genres = await _movieAPIrepo.getGenres();
  if (genres) {
    res.status(200).json(genres);
  } else {
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.GetMovieVideos = async (req, res) => {
  const id = req.params.id;
  const movieVideos = await _movieAPIrepo.getVideos(id);
  if (movieVideos) {
    res.status(200).json(movieVideos);
  } else {
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

exports.GetMovieCrew = async function (req, res) {
  const id = req.params.id;
  console.log(`getting movie ${id} from repo`);
  const movie = await _movieAPIrepo.getCrew(id);
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).json({ message: "not found", data: {} });
  }
};
