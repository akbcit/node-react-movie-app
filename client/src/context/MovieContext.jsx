import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

// Create movie context
export const MovieContext = createContext();

// Movie context provider component
export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("trending");
  const [searchString, setSearchString] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const [isFetching, setIsFetching] = useState(true);
  const [genres, setGenres] = useState();
  
  // Function that gets genres
  const getGenres = async () => {
    const response = await axiosInstance.get("/movies/genres");
    setGenres(response.data);
  };

  // useEffect for genres
  useEffect(() => {
    getGenres();
  }, []);

  // useEffect for movies
  useEffect(() => {
    const fetchMovies = async () => {
      let url = "";

      if (category !== "search") {
        url = `/movies/${category}/${pageNum}`;
      } else {
        url = `/movies/search/?query=${searchString}`;
      }

      try {
        setIsFetching(true);
        const response = await axiosInstance.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error("error fetching data from server", error.message);
        setMovies([]);
      } finally {
        setIsFetching(false);
      }
    };

    fetchMovies();
  }, [category, searchString, pageNum]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        category,
        searchString,
        pageNum,
        isFetching,
        setCategory,
        setSearchString,
        setPageNum,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}