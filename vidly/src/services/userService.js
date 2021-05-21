import axios from 'axios'
import api from '../config.json'

export function register(user) {
  return axios.post(api.USERS_API, {
    email: user.username,
    password: user.password,
    name: user.name,
  })
}
