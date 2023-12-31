const getPersonDetails = (person) => {
  const baseURL = "https://www.themoviedb.org/person/";
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";
  const placeholderImageURL = "/src/assets/images/actor_placeholder.png";

  return {
    name: person.name,
    profilePage: baseURL + person.id,
    imageLink: person.profile_path
      ? imageBaseURL + person.profile_path
      : placeholderImageURL,
  };
};

const getActorDetails = (actor) => {
  const personDetails = getPersonDetails(actor);
  return {
    ...personDetails,
    character: actor.character,
  };
};

const filterCrew = (credits) => {
  const crew = credits.crew;

  // directors, directors of photography, screenplay folks, and writers
  const directors = crew
    .filter((item) => item.job === "Director")
    .map(getPersonDetails);
  const directorsOfPhoto = crew
    .filter((item) => item.job === "Director of Photography")
    .map(getPersonDetails);
  const screenplayFolks = crew
    .filter((item) => item.job === "Screenplay")
    .map(getPersonDetails);
  const writers = crew
    .filter((item) => item.job === "Writer")
    .map(getPersonDetails);

  // top three actors
  const actors = getTopThreeActors(credits);

  return {
    actors,
    directors,
    directorsOfPhoto,
    screenplay: screenplayFolks,
    writers,
  };
};

const getTopThreeActors = (credits) => {
  return credits.cast.slice(0, 3).map(getActorDetails);
};

export default filterCrew;
