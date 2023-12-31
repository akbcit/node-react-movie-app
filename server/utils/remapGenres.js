const remapGenres = (genres) => {
    const genreList={};
    for(let i =0; i<genres.length;i++){
        const name = genres[i].name.toLowerCase();
        const id = genres[i].id;
        genreList[name]=id;
    }
    return genreList;
  };
  
  module.exports = remapGenres;