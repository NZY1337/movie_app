import axios from "axios";
import api from "../config.json";

export async function saveReturn(rental) {
  return axios.post(api.RETURNS_API, rental);
}
