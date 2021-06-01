import axios from "axios";
import api from "../config.json";

export async function saveRental(rental, id) {
  if (id === "new") {
    return axios.post(api.RENTALS_API, rental);
  }
}

export async function getRentals() {
  return axios.get(api.RENTALS_API);
}

export async function getRental(id) {
  return axios.get(api.RENTALS_API + "/" + id);
}

export async function deleteRental(id) {
  return axios.delete(api.RENTALS_API + "/" + id);
}
