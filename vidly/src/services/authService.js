import jwtDecode from 'jwt-decode'
import axios from 'axios'
import api from '../config.json'

const tokenKey = 'token'

export async function login(email, password) {
  const { data: jwt } = await axios.post(api.AUTH_API, { email, password })
  localStorage.setItem(tokenKey, jwt)
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt)
}

export function logout() {
  localStorage.removeItem(tokenKey)
}

export function getUser() {
  try {
    const jwt = localStorage.getItem(tokenKey)
    return jwtDecode(jwt)
  } catch (ex) {
    return null
  }
}

export default {
  login,
  logout,
  getUser,
  loginWithJwt,
}
