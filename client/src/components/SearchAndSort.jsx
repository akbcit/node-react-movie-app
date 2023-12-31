import React, { useState, useEffect, useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import "../assets/styles/SearchAndSort.css";
import genreOptions from "../utils/genresOptions";
import languageOptions from "../utils/languageOptions";

function SearchAndSort() {
  const [year, setYear] = useState();
  const [genre, setGenre] = useState();
  const [originalLanguage, setOriginalLanguage] = useState();
  const [phrase, setPhrase] = useState();
  const [sortByYear, setSortByYear] = useState();
  const [sortByRating, setSortByRating] = useState();
  const [sortByPopularity, setSortByPopularity] = useState();
  const [includeAdult, setIncludeAdult] = useState();
  const { setSearchString, pageNum, setPageNum } = useContext(MovieContext);

  useEffect(() => {
    let newSearchString = `page=${pageNum}`;
    if (year) {
      newSearchString = newSearchString + `&year=${year}`;
    }
    if (genre) {
      newSearchString = newSearchString + `&genre=${genre}`;
    }
    if (originalLanguage) {
      newSearchString =
        newSearchString + `&originalLanguage=${originalLanguage}`;
    }
    if (sortByYear) {
      newSearchString = newSearchString + `&sortByYear=${sortByYear}`;
    }
    if (sortByRating) {
      newSearchString = newSearchString + `&sortByRating=${sortByRating}`;
    }
    if (sortByPopularity) {
      newSearchString =
        newSearchString + `&sortByPopularity=${sortByPopularity}`;
    }
    if (includeAdult) {
      newSearchString = newSearchString + `&includeAdult=${includeAdult}`;
    }
    if (phrase) {
      newSearchString = newSearchString + `&searchPhrase=${phrase}`;
    }

    setSearchString(newSearchString);
  }, [
    year,
    genre,
    originalLanguage,
    phrase,
    sortByYear,
    sortByRating,
    sortByPopularity,
    includeAdult,
    pageNum,
  ]);

  const handleChange = (event) => {
    const val = event.target.value;
    const id = event.target.id;
    const isChecked = event.target.checked;

    switch (id) {
      case "year":
        setPageNum(1);
        setYear(val);
        break;
      case "genre":
        setPageNum(1);
        setGenre(val);
        break;
      case "language":
        setPageNum(1);
        setOriginalLanguage(val);
        break;
      case "searchPhrase":
        setPageNum(1);
        setPhrase(val);
        break;
      case "sortByYear":
        setPageNum(1);
        setSortByYear((prevIsYearSort) => !prevIsYearSort);
        break;
      case "sortByRating":
        setPageNum(1);
        setSortByRating((prevIsRatingSort) => !prevIsRatingSort);
        break;
      case "sortByPopularity":
        setPageNum(1);
        setSortByPopularity((prevIsPopularitySort) => !prevIsPopularitySort);
        break;
      case "includeAdult":
        setPageNum(1);
        setIncludeAdult((prevIsIncludeAdult) => !prevIsIncludeAdult);
        break;
    }
  };

  return (
    <form className="styled-form">

      <div id="input-group">

        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            min="1900"
            name="year"
            id="year"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <select
            name="genre"
            id="genre"
            className="form-control"
            onChange={handleChange}
          >
            {genreOptions.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="language">Language:</label>
          <select
            name="language"
            id="language"
            className="form-control"
            onChange={handleChange}
          >
            {languageOptions.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="searchPhrase">Search Phrase:</label>
          <input
            type="text"
            name="searchPhrase"
            id="searchPhrase"
            className="form-control"
            onChange={handleChange}
          />
        </div>
      </div>

      <div id="checkboxes">
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            name="sortByYear"
            id="sortByYear"
            className="form-checkbox"
            onChange={handleChange}
          />
          <label htmlFor="sortByYear">Sort By Year</label>
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            name="sortByRating"
            id="sortByRating"
            className="form-checkbox"
            onChange={handleChange}
          />
          <label htmlFor="sortByRating">Sort By Rating</label>
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            name="sortByPopularity"
            id="sortByPopularity"
            className="form-checkbox"
            onChange={handleChange}
          />
          <label htmlFor="sortByPopularity">Sort By Popularity</label>
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            name="includeAdult"
            id="includeAdult"
            className="form-checkbox"
            onChange={handleChange}
          />
          <label htmlFor="includeAdult">Include Adult</label>
        </div>
      </div>
    </form>
  );
}

export default SearchAndSort;
