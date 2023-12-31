/* eslint-disable react/prop-types */
import React from "react";
import "../assets/styles/CrewGrid.css";

function CrewGrid({ crew }) {
  const { directors, directorsOfPhoto, screenplay, writers } = crew;

  const createLinks = (crewList) => {
    return crewList.map((member, index) => (
      <span key={index}>
        <a href={member.profilePage} target="_blank" rel="noopener noreferrer">
          {member.name}
        </a>
        {index < crewList.length - 1 ? ", " : ""}
      </span>
    ));
  };

  return (
    <div id="crew-details">
      {directors.length > 0 && (
        <div id="director-details">
          <p>{directors.length > 1 ? "Directors: " : "Director: "}</p>
          {createLinks(directors)}
        </div>
      )}

      {directorsOfPhoto.length > 0 && (
        <div id="dop-details">
          <p>
            {directorsOfPhoto.length > 1
              ? "Directors of Photography: "
              : "Director of Photography: "}
          </p>
          {createLinks(directorsOfPhoto)}
        </div>
      )}

      {screenplay.length > 0 && (
        <div id="screenplay-details">
          <p>
            {screenplay.length > 1
              ? "Screenplay Writers: "
              : "Screenplay Writer: "}
          </p>
          {createLinks(screenplay)}
        </div>
      )}

      {writers.length > 0 && (
        <div id="writer-details">
          <p>{writers.length > 1 ? "Writers: " : "Writer: "}</p>
          {createLinks(writers)}
        </div>
      )}
    </div>
  );
}

export default CrewGrid;
