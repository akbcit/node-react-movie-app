import React, { useContext, useState } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "./MovieCard";
import Paginate from "./Paginate";
import "../assets/styles/MovieGrid.css";
import { PulseLoader } from "react-spinners";

function MovieGrid() {
  const { movies, isFetching } = useContext(MovieContext);

  return (
    <div id="movie-grid">
      {isFetching ? (
        <PulseLoader color="#36d7b7" size={10} />
      ) : (
        <>
          <div id="movie-grid-movies">
            {movies &&
              movies.map((item, index) => (
                <MovieCard key={index} movie={item} />
              ))}
          </div>
          <Paginate />
        </>
      )}
    </div>
  );
}

export default MovieGrid;
