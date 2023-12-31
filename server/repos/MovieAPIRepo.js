const axios = require("axios");
const {
  trendingMoviesURL,
  popularMoviesURL,
  nowPlayingMoviesURL,
  topRatedMoviesURL,
  tmdbSearchURL,
  genresURl,
  movieURL,
  movieVideoURL,
  movieCreditsURL,
} = require("../utils/getUrl");
const remapGenres = require("../utils/remapGenres");
const top50Languages = require("../utils/ISO639-1");

class MovieAPIRepo {
  async getMovies(category, pageNum) {
    let urlType;
    switch (category) {
      case "trending":
        urlType = trendingMoviesURL;
        break;
      case "popular":
        urlType = popularMoviesURL;
        break;
      case "playing":
        urlType = nowPlayingMoviesURL;
        break;
      case "toprated":
        urlType = topRatedMoviesURL;
        break;
      default:
        break;
    }
    try {
      console.log(`getting ${category} movies pages ${pageNum} from TMDB`);
      const response = await axios.get(urlType(pageNum));
      return response.data;
    } catch (error) {
      console.error("Error getting trending movies from TMDB", error.message);
      return false;
    }
  }

  async searchMovies(
    year,
    genre,
    originalLanguage,
    sortByYear,
    sortByRating,
    sortByPopularity,
    includeAdult,
    page,
    searchPhrase
  ) {
    // get genreList
    const genreList = await this.getGenres();
    // get genreId
    const genreId = genre ? genreList[genre] : genre;
    //convert language to language code
    const languageCode = originalLanguage
      ? top50Languages[originalLanguage]
      : originalLanguage;
    // create url
    const url = tmdbSearchURL({
      year: year,
      genre: genreId,
      originalLanguage: languageCode,
      sortByYear: sortByYear,
      sortByRating: sortByRating,
      sortByPopularity: sortByPopularity,
      includeAdult: includeAdult,
      page: page,
      searchPhrase,
    });

    console.log(url);
    
    try {
      console.log(`getting searched movies from TMDB`);
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error getting searched movies from TMDB", error.message);
      return false;
    }
  }

  async getById(id){
    try{
      console.log(`getting movie ${id} from TMDB`);
      const response = await axios.get(movieURL(id));
      const movie = response.data;
      return movie;
    }
    catch(error){
      console.error(`Error getting movie: ${id} from TMDB`, error.message);
      return false;
    }
  }

  async getCrew(id){
    try{
      console.log(`getting movie ${id} credits from TMDB`);
      console.log(movieCreditsURL(id));
      const response = await axios.get(movieCreditsURL(id));
      const credits = response.data.credits;
      return credits;
    }
    catch(error){
      console.error(`Error getting movie: ${id} credits from TMDB`, error.message);
      return false;
    }
  }

  async getVideos(id){
    try{
      console.log(`getting movie ${id}'s videos from TMDB`);
      const response = await axios.get(movieVideoURL(id));
      const movieVideos = response.data;
      return movieVideos;
    }
    catch(error){
      console.error(`Error getting movie: ${id}'s videos from TMDB`, error.message);
      return false;
    }
  }

  async getGenres() {
    try {
      const response = await axios.get(genresURl);
      console.log(genresURl);
      const genres = response.data.genres;
      const genresList = remapGenres(genres);
      return genresList;
    } catch (error) {
      console.error("Error getting genres from TMDB", error.message);
      return false;
    }
  }
}

module.exports = MovieAPIRepo;
