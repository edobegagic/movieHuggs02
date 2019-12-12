document
  .getElementById('searchButton')
  .addEventListener('click', fetchMovieData);

/*API REQUEST - PICTURE*/
let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = null;
const APIKEY = '056244bd9ebd232273149c409270ea36';
let image;
let posterSize500;
let posterPath;

/*FETCH MOVIE BY NAME*/
/* 1. */
function fetchMovieData() {
  let url = `${baseURL}configuration?api_key=${APIKEY}`;
  fetch(url)
    .then(result => {
      return result.json();
    })
    .then(data => {
      baseImageURL = data.images.secure_base_url;
      posterSize500 = data.images.poster_sizes[4];
      console.log('config:', data);
      console.log('config fetched');
      const userInputValue = document.getElementById('userInput').value;
      runSearchByName(`${userInputValue}`);
      console.log('sve je ok');
    })
    .catch(function(err) {
      alert(err);
    });
}

/* 1.1. */
async function runSearchByName(movieName) {
  try {
    let url = `${baseURL}search/movie?api_key=${APIKEY}&query=${movieName}`;
    let result = await fetch(url);
    let data = await result.json();
    posterPath = data.results[1].poster_path;
    console.log(data.results[1].poster_path);
    console.log(data.results[1]);
    console.log(baseImageURL);
    console.log(posterSize500);
    image = `${baseImageURL}${posterSize500}${posterPath}`;
    document.getElementById('moviePoster').src = `${image}`;
  } catch (err) {
    alert(err);
    console.log(err);
  }
}

/*FETCH MOVIE BY ID*/
/* 1. */
document
  .getElementById('searchButton2')
  .addEventListener('click', fetchMovieData2);

function fetchMovieData2() {
  let url = `${baseURL}configuration?api_key=${APIKEY}`;
  fetch(url)
    .then(result => {
      return result.json();
    })
    .then(data => {
      baseImageURL = data.images.secure_base_url;
      posterSize500 = data.images.poster_sizes[4];
      console.log('config:', data);
      console.log('config fetched');
      const userInputValue = document.getElementById('userInput2').value;
      fetchExternalId(`${userInputValue}`);
      console.log('sve je ok');
    })
    .catch(function(err) {
      alert(err);
    });
}

/*  1.1.
GET /movie/{movie_id}/external_ids
https://developers.themoviedb.org/3/movies/get-movie-external-ids */
async function fetchExternalId(userInput) {
  try {
    let url = `${baseURL}movie/${userInput}/external_ids?api_key=${APIKEY}`;
    let result = await fetch(url);
    let data = await result.json();
    console.log(data);
    const externalId = data.imdb_id;
    findByExternalId(externalId);
  } catch (err) {
    alert(err);
    console.log(err);
  }
}

/* 1.1.1
GET /find/{external_id}
https://developers.themoviedb.org/3/find */
async function findByExternalId(externalId) {
  try {
    let url = `${baseURL}find/${externalId}?api_key=${APIKEY}&external_source=imdb_id`;
    let result = await fetch(url);
    let data = await result.json();
    console.log(data);
    const movieTitle = data.movie_results[0].title;
    console.log(movieTitle);
    const posterPath = data.movie_results[0].poster_path;
    console.log(movieTitle);
    image = `${baseImageURL}${posterSize500}${posterPath}`;
    document.getElementById('moviePoster2').src = `${image}`;
  } catch (err) {
    alert(err);
    console.log(err);
  }
}

/*RANDOM MOVIE GENERATOR*/

document
  .getElementById('searchButton3')
  .addEventListener('click', findByRandomNumber);

/*1. */

/* 1. RAND*/

function findByRandomNumber() {
  let url = `${baseURL}configuration?api_key=${APIKEY}`;
  fetch(url)
    .then(result => {
      return result.json();
    })
    .then(data => {
      baseImageURL = data.images.secure_base_url;
      posterSize500 = data.images.poster_sizes[4];
      console.log('config:', data);
      console.log('config fetched');
      const userInputValue = Math.floor(Math.random() * 100) + 1;
      const userInputString = userInputValue.toString();
      fetchExternalIdRand(userInputString);
      console.log('sve je ok');
    })
    .catch(function(err) {
      alert(err);
    });
}

/*  1.1.
GET RAND */
async function fetchExternalIdRand(userInput) {
  try {
    let url = `${baseURL}movie/${userInput}/external_ids?api_key=${APIKEY}`;
    let result = await fetch(url);
    let data = await result.json();
    const externalId = data.imdb_id;
    findByExternalIdRand(externalId);
  } catch (err) {
    console.log(err);
  }
}

/* 1.1.1 NA RANDOM NE RADI MOVIE TITLE?? ZAŠTO??
GET /find/{external_id} RAND*/
async function findByExternalIdRand(externalId) {
  try {
    let url = `${baseURL}find/${externalId}?api_key=${APIKEY}&external_source=imdb_id`;
    let result = await fetch(url);
    let data = await result.json();
    console.log(data);
    const posterPath = data.movie_results[0].poster_path;
    image = `${baseImageURL}${posterSize500}${posterPath}`;
    document.getElementById('moviePoster3').src = `${image}`;
  } catch (err) {
    console.log(err);
  }
}
