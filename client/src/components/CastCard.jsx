/* eslint-disable react/prop-types */
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../assets/styles/CastCard.css";

function CastCard({ actor }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const takeToActorPage = (url)=>{
    window.open(url,'_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`actor-card ${!imageLoaded ? "loading" : ""}`}>
      <div className="image-container-actor">
        {!imageLoaded && <Skeleton height={240} width={160} />}
        <img
          className={`actor-image ${!imageLoaded ? "hidden" : ""}`}
          src={actor.imageLink}
          alt={`${actor.name} image`}
          onLoad={() => {
            setImageLoaded(true);
          }}
          onClick={()=>{
            if(actor.profilePage){
                takeToActorPage(actor.profilePage);
            }
          }}
        ></img>
      </div>
      <div id="actor-details">
        <h2 className={`actor-name ${!imageLoaded ? "loading" : ""}`}>
          {!imageLoaded ? <Skeleton width={160} /> : actor.name}
        </h2>
        <p className={`actor-character ${!imageLoaded ? "loading" : ""}`}>
          {!imageLoaded ? <Skeleton width={80} /> : actor.character}
        </p>
      </div>
    </div>
  );
}

export default CastCard;
