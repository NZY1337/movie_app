import axios from 'axios'

import api from '../config.json'

export function getGenresApi() {
  return axios.get(api.GENRES_API)
}
