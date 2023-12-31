import React from "react";
import "../assets/styles/RatingCircle.css";

function RatingCircle({ rating }) {
  const circleStyle = {
    background: `conic-gradient(
      ${getColor(rating)} 0% ${rating}%,
      ${getUnfilledColor(getColor(rating))} ${rating}% 100%
    )`,
  };

  return (
    <div className="circle-container" style={circleStyle}>
      <div className="percentage-text"></div>
    </div>
  );
}

function getColor(percentage) {
  if (percentage < 50) return '#ff0000';
  if (percentage < 75) return '#ffa500';
  return '#008000'; 
}

function getUnfilledColor(color) {
  const opacity = '33';
  return color + opacity;
}

export default RatingCircle;