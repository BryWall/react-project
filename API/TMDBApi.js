const API_TOKEN = "05af7d943e2d2d286e4fcbeeefa6f0d5";

export function getFilmsFromApiWithSearchedText (text, page){
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export function getFilmDetailFromApi (id) {
    return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }

export function getImageFromApi( name ){
    return "https://image.tmdb.org/t/p/w300" + name;
}