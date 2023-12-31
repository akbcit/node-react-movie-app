import { NavLink } from "react-router-dom";
import "../assets/styles/NavBar.css";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";

function NavBar() {
  const { isAuthenticated, username, checkAuth,logout } = useContext(AuthContext);
  // check authstatus on reload
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <nav className="main-nav">
      <ul id="nav-list">
        <li className="left-align">
          <NavLink to="/movies">Movies.js</NavLink>
        </li>
        <li className="mid-align">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/discover">Discover</NavLink>
        </li>
        <li className="right-align">
          {isAuthenticated ? (
            <>
              <p>Hi {username}!</p>
              <p onClick={logout}>Logout</p>
            </>
          ) : (
            <>
              <NavLink to="/auth">Login / Register</NavLink>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
