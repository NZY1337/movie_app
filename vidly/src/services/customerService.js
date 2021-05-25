import axios from 'axios'
import api from '../config.json'

export async function saveCustomer(customer, id) {
  if (id) {
    return axios.put(api.CUSTOMERS_API + '/' + id, customer)
  }

  return axios.post(api.CUSTOMERS_API, customer)
}

export async function getCustomers() {
    return axios.get(api.CUSTOMERS_API);
}

export function getCustomer(customerId) {
    return axios.get(api.CUSTOMERS_API + '/' + customerId)
}