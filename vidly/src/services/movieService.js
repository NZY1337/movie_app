import axios from "axios";
import api from "../config.json";

export function getMoviesApi() {
  return axios.get(api.MOVIES_API);
}

export function getMovie(movieId) {
  return axios.get(api.MOVIES_API + "/" + movieId);
}

export function deleteMovieApi(movieId) {
  return axios.delete(api.MOVIES_API + "/" + movieId);
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return axios.put(api.MOVIES_API + "/" + movie._id, body);
  }

  return axios.post(api.MOVIES_API, movie);
}

export function editMovie(movieId, body) {
  return axios.put(api.MOVIES_API + "/" + movieId, body);
}
