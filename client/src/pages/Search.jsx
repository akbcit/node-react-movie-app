import { useContext, useEffect } from "react";
import SearchAndSort from "../components/SearchAndSort";
import { MovieContext } from "../context/MovieContext";
import MovieGrid from "../components/MovieGrid";

function Search() {
  const { setCategory, setPageNum } = useContext(MovieContext);

  // when page loads set default cat to "trending" and page to 1
  useEffect(() => {
    setCategory("search");
    setPageNum(1);
  }, []);

  return (
    <div>
      <SearchAndSort />
      <MovieGrid/>
    </div>
  );
}

export default Search;