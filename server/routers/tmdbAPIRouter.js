const express = require("express");
// setup router
const tmdbAPIRouter = express.Router();
// get controller methods
const {GetMoviesByCategory,GetGenres,GetMoviesBySearch,GetMovieById,GetMovieVideos,GetMovieCrew} = require("../controllers/tmdbAPIcontroller");

// create routes
// Routes for a specific movie videos
tmdbAPIRouter.get("/movie/:id/videos", GetMovieVideos);

// Routes for a specific movie crew
tmdbAPIRouter.get("/movie/:id/crew", GetMovieCrew);

// Routes for a specific movie
tmdbAPIRouter.get("/movie/:id", GetMovieById);

// Route to get genres
tmdbAPIRouter.get("/genres", GetGenres);

// Route to search movies
tmdbAPIRouter.get("/search", GetMoviesBySearch);

// Routes for categories
tmdbAPIRouter.get("/:category", GetMoviesByCategory);
tmdbAPIRouter.get("/:category/:pageNum", GetMoviesByCategory);

module.exports= tmdbAPIRouter;