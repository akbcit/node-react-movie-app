import React from "react";
import { useState } from "react";
import "./App.css";
import { MovieProvider } from "./context/MovieContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Movie from "./pages/Movie";
import Discover from "./pages/Discover";
import NavBar from "./components/NavBar";
import Auth from "./pages/Auth";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/search" exact element={<Search />} />
            <Route path="/:movieId" exact element={<Movie />} />
            <Route path="/auth" exact element={<Auth />} />
            <Route path="/discover" exact element={<Discover />} />
          </Routes>
        </BrowserRouter>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
